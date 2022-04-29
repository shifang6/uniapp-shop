<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio">
      <radio
        color="#C00000"
        :checked="SelectPay.selectFlag"
        @click="handleSelectAll"
      />
      <text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:
      <text class="amount">￥{{ SelectPay.selectTotal }}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="handleSettlement"
      >结算({{ ready_goods_select_count }})</view
    >
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import {
  createdOrderApi,
  PrePaymentApi,
  CheckPaymentStatus,
  PayMentList,
} from "@/api/payment.js";
export default {
  name: "my-settle",
  computed: {
    ...mapState("m_cate", ["SelectPay", "address", "cart", "token"]),
    ...mapGetters("m_cate", ["ready_goods_select_count", "shop_total"]),
  },
  data() {
    return {
      timer: null,
      seconed: 3,
    };
  },
  created() {
    this.RELOADSELECTALL();
  },
  methods: {
    ...mapMutations("m_cate", [
      "CHECKED_BY_ALL",
      "RELOADSELECTALL",
      "SET_SWITCHBAR",
    ]),
    handleSelectAll() {
      this.CHECKED_BY_ALL();
    },
    // 结算按钮
    handleSettlement() {
      // 检查是否勾选商品
      if (!this.checkedGoods()) {
        uni.showToast({
          title: "请选择商品后结算！",
        });
      }
      const address_info = this.$store.getters["m_add/info_address"];
      if (address_info.indexOf("undefined") != -1) {
        uni.showToast({
          title: "请选择收货地址后计算!",
        });
      }
      this.DelayRedirect();
      this.ActionPayPrcess();
    },
    DelayRedirect() {
      this.seconed = 3;
      if (!this.token) {
        this.timer = setInterval(() => {
          this.seconed--;
          this.showTips(this.seconed);
          if (this.seconed <= 0) {
            clearInterval(this.timer);
            // 跳转到 my 页面
            uni.switchTab({
              url: "/pages/my/my",
              // 页面跳转成功之后的回调函数
              success: () => {
                // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                this.SET_SWITCHBAR({
                  // 跳转的方式
                  openType: "switchTab",
                  // 从哪个页面跳转过去的
                  from: "/pages/cart/cart",
                });
              },
            });
          }
          return;
        }, 1500);
      }
    },
    async ActionPayPrcess() {
      const ActionChangeBack = {
        order_price: this.SelectPay.selectTotal,
        consignee_addr: this.$store.getters["m_add/info_address"],
        goods: this.cart
          .filter((x) => x.goods_checked)
          .map((x) => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price,
          })),
      };
    //   将订单信息发给后台，给订单编号
      const { message: res, meta: code } = await createdOrderApi(
        ActionChangeBack
      );
      //   console.log(res, code);
    //   预支付接口
      if (code.status == 200) {
        await PrePaymentApi(res.order_number).then(async (res2) => {
          //   console.log(res2.message.pay);
          if (res2.meta.status == 200) {
            //   调用微信支付
            const [err, succ] = await uni
              .requestPayment(res2.message.pay)
              .catch((err) => err);
            console.log(err, succ);
            // if (err) return uni.$showMsg("订单未支付！");
          }
        });
      }
    //   检查是否支付成功
      //   console.log(res.order_number)
      await CheckPaymentStatus(res.order_number).then((res3) => {
        console.log(res3);
        if (res3.meta.status != 200) {
          uni.showToast({ title: "订单支付失败" });
        } else {
          uni.showToast({ title: "订单支付成功" });
        }
      });
    },
    // 展示倒计时的提示消息
    showTips(n) {
      // 调用 uni.showToast() 方法，展示提示消息
      uni.showToast({
        // 不展示任何图标
        icon: "none",
        // 提示的消息
        title: "请登录后再结算！" + n + " 秒后自动跳转到登录页",
        // 为页面添加透明遮罩，防止点击穿透
        mask: true,
        // 1.5 秒后自动消失
        duration: 1500,
      });
    },
    checkedGoods() {
      let checkeds = false;
      this.cart.forEach((item) => {
        if (item.goods_checked) checkeds = true;
      });
      return checkeds;
    },
  },
};
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  z-index: 999;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>

<template>
  <view class="cart">
    <view class="cart_address" v-if="address.provinceName">
      <view class="cart_address_top">
        <text>收货人：{{ address.userName }}</text>
        <view class="cart_address_top_right" @click="handleClickChooseAddress"
          >电话：{{ address.telNumber }}
          <uni-icons type="right" size="18"></uni-icons>
        </view>
      </view>
      <view class="cart_address_bottom"> 收货地址：{{ info_address }} </view>
    </view>
    <view class="cart_tab" v-else>
      <view class="cart_tab_btn" @click="handleClickChooseAddress"
        >请选择收获地址 +</view
      >
    </view>
    <image class="cart_border" src="/static/cart_border@2x.png" />
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "my-address",
  data() {
    return {};
  },
  computed: {
    ...mapState("m_add", ["address"]),
    ...mapGetters("m_add", ["info_address"]),
  },
  methods: {
    ...mapMutations("m_add", ["CLICK_CHOOSE_ADDRESS"]),
    async handleClickChooseAddress() {
      const [err, succ] = await uni.chooseAddress().catch((err) => err);
      if (err === null && succ.errMsg === "chooseAddress:ok") {
        this.CLICK_CHOOSE_ADDRESS(succ);
      }
      if (
        err &&
        (err.errMsg === "chooseAddress:fail auth deny" ||
          err.errMsg === "chooseAddress:fail authorize no response")
      ) {
        this.checkAuth();
      }
    },
    async checkAuth() {
      const [err, confirmResult] = await uni
        .showModal({
          title: "检测到您没打开地址权限，是否去设置打开？",
          confirmText: "确认",
          cancelText: "取消",
        })
        .catch((err) => err);
      if (err2) return;

      if (confirmResult.cancel) return uni.$showMsg("您取消了地址授权！");
      if (confirmResult.confirm)
        return uni.openSetting({
          success: (settingResult) => {
            if (settingResult.authSetting["scope.address"])
              return uni.$showMsg("授权成功！请选择地址");
            if (!settingResult.authSetting["scope.address"])
              return uni.$showMsg("您取消了地址授权！");
          },
        });
    },
  },
};
</script>

<style lang="scss">
.cart {
  &_tab {
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    &_btn {
      width: 170px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background-color: #1aad19;
      color: white;
      border-radius: 6px;
    }
  }
  &_border {
    width: 100%;
    height: 6px;
  }
  &_address {
    height: 112px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &_right {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    &_bottom {
      display: flex;
      align-items: center;
    }
  }
}
</style>

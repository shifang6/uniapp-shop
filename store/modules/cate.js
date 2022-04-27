export default {
    // 为当前模块开启命名空间
    namespaced: true,

    // 模块的 state 数据
    state: () => ({
        // 购物车的数组，用来存储购物车中每个商品的信息对象
        // 每个商品的信息对象，都包含如下 6 个属性：
        // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
        cart: uni.getStorageSync("cate") ?
            JSON.parse(uni.getStorageSync("cate")) : [],
        SelectPay: uni.getStorageSync("SelectPay") ?
            JSON.parse(uni.getStorageSync("SelectPay")) : {
                selectFlag: false,
                selectTotal: 0,
            },
    }),

    // 模块的 mutations 方法
    mutations: {
        // 全选方法
        CHECKED_BY_ALL(state) {
            state.SelectPay.selectFlag = !state.SelectPay.selectFlag;
            // 全选渲染
            state.cart.forEach((item) => {
                item.goods_checked = state.SelectPay.selectFlag;
            });
            this.commit("m_cate/COUNTER_ALL_GOODS");
        },
        RELOADSELECTALL(state) {
            // 全选渲染
            state.cart.forEach((item) => {
                item.goods_checked = state.SelectPay.selectFlag;
            });
            this.commit("m_cate/COUNTER_ALL_GOODS");
        },
        // 计算已经选择的总价
        COUNTER_ALL_GOODS(state, singleCount = false) {
            // 计算总价格
            let godds_checked_counts = 0;
            if (state.SelectPay.selectFlag) {
                state.cart.forEach((item) => {
                    godds_checked_counts += item.goods_counts * item.goods_price;
                });
            } else if (!state.SelectPay.selectFlag) {
                godds_checked_counts = 0;
            }
            if (singleCount) {
                state.cart.forEach((item) => {
                    if (item.goods_checked) {
                        state.cart.forEach((item) => {
                            godds_checked_counts += item.goods_counts * item.goods_price;
                        });
                    }
                });
                state.SelectPay.selectTotal = godds_checked_counts;
            }
            state.SelectPay.selectTotal = godds_checked_counts;
            this.commit("m_cate/STORAGE_GOODS");
        },
        // 单击选中的商品而计算总价
        SINGLE_CLICK_COUNTS(state) {
            this.commit("m_cate/COUNTER_ALL_GOODS", true);
            this.commit("m_cate/STORAGE_GOODS");
        },
        // 持续存储
        STORAGE_GOODS(state) {
            uni.setStorageSync("SelectPay", JSON.stringify(state.SelectPay));
        },
        ADDSHOPCARD(state, goods) {
            const findRes = state.cart.find(
                (item) => item.goods_id == goods.goods_id
            );
            if (!findRes) {
                state.cart.push(goods);
            } else {
                findRes.goods_counts++;
            }
            console.log(state.cart);
            this.commit("m_cate/SET_STORAGE_SHOP");
        },
        CHANGE_GOODS_STATUS(state, goods) {
            const findRes = state.cart.find(
                (item) => item.goods_id === goods.goods_id
            );
            if (findRes) {
                findRes.goods_checked = !findRes.goods_checked;
            }
            this.commit("m_cate/SET_STORAGE_SHOP");
        },
        CHANGE_GOODS_NUMBOX(state, goods) {
            const findRes = state.cart.find(
                (item) => item.goods_id == goods.goods_id
            );
            if (findRes) {
                findRes.goods_counts = goods.goods_counts;
            }
            this.commit("m_cate/SET_STORAGE_SHOP");
        },
        // 长久存储
        SET_STORAGE_SHOP(state) {
            uni.setStorageSync("cate", JSON.stringify(state.cart));
        },
    },

    // 模块的 getters 属性
    getters: {
        shop_total(state) {
            let c = 0;
            // 循环统计商品的数量，累加到变量 c 中
            state.cart.forEach((goods) => (c += goods.goods_counts));
            return c;
        },
        // 当前已经选中的要结算的总数
        ready_goods_select_count(state) {
            let counts = 0;
            state.cart.forEach((goods) => (counts += goods.goods_checked ? 1 : 0));
            return counts;
        },
    },
};
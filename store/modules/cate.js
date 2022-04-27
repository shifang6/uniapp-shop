export default {
    // 为当前模块开启命名空间
    namespaced: true,

    // 模块的 state 数据
    state: () => ({
        // 购物车的数组，用来存储购物车中每个商品的信息对象
        // 每个商品的信息对象，都包含如下 6 个属性：
        // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
        cart: uni.getStorageSync("cate") ? JSON.parse(uni.getStorageSync("cate")) : [],
    }),

    // 模块的 mutations 方法
    mutations: {
        ADDSHOPCARD(state, goods) {
            const findRes = state.cart.find(
                (item) => item.goods_id == goods.goods_id
            );
            if (!findRes) {
                state.cart.push(goods);
            } else {
                findRes.goods_counts++;
            }
            this.commit("m_cate/SET_STORAGE_SHOP");
            console.log(state.cart);
        },
        CHANGE_GOODS_STATUS(state, goods) {
            const findRes = state.cart.find(
                (item) => item.goods_id == goods.goods_id
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
    },
};

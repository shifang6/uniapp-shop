import {
    GetTokenAPi
} from '@/api/login.js';
export default {
    // 为当前模块开启命名空间
    namespaced: true,

    // 模块的 state 数据
    state: () => ({
        cart: uni.getStorageSync("cate") ?
            JSON.parse(uni.getStorageSync("cate")) : [],
        SelectPay: uni.getStorageSync("SelectPay") ?
            JSON.parse(uni.getStorageSync("SelectPay")) : {
                selectFlag: false,
                selectTotal: 0,
            },
        // 用户数据
        userInfo: JSON.parse(uni.getStorageSync("userInfo") || "{}"),
        token: uni.getStorageSync("token")?JSON.parse(uni.getStorageSync("token")) || "":"",
        switchBar: null
    }),

    // 模块的 mutations 方法
    mutations: {
        // 设置重定向路径
        SET_SWITCHBAR(state, redirectUrl) {
            state.switchBar = redirectUrl;
        },
        // 存入用户详细信息数据
        SAVE_STORAGE_USERINFO(state, userInfo) {
            state.userInfo = userInfo;
            this.commit("m_cate/SAVE_STORAGE_BY_SYNC");
        },
        // 存入用户登录token
        SET_TOKEN(state, token) {
            state.token = token;
            uni.setStorageSync("token", JSON.stringify(state.token))
        },
        // 用户信息存入
        SAVE_STORAGE_BY_SYNC(state) {
            uni.setStorageSync("userInfo", JSON.stringify(state.userInfo));
        },
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
    actions: {
        GET_SET_TOKENS({
            dispatch,
            commit,
            state
        }) {
            return new Promise(async(succ, err) => {
                console.log(state.userInfo);
                const {
                    code,
                    iv,
                    rawData,
                    signature,
                    encryptedData
                } = state.userInfo;
                await GetTokenAPi({
                    code,
                    iv,
                    rawData,
                    signature,
                    encryptedData
                }).then(res => {
                    console.log(res, '获取tokens');
                    commit("SET_TOKEN", res.message.token)
                })
            })
        }
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
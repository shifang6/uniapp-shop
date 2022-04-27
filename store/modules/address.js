export default {
    // 为当前模块开启命名空间
    namespaced: true,

    // 模块的 state 数据
    state: () => ({
        address: uni.getStorageSync("address") ?
            JSON.parse(uni.getStorageSync("address")) : {},
    }),

    // 模块的 mutations 方法
    mutations: {
        CLICK_CHOOSE_ADDRESS(state, address) {
            console.log(address);
            state.address = address;
            this.commit("m_add/SET_STORAGE_ADDRESS");
        },
        // 持久化存储
        SET_STORAGE_ADDRESS(state) {
            uni.setStorageSync("address", JSON.stringify(state.address));
        },
    },

    // 模块的 getters 属性
    getters: {
        info_address(state) {
            console.log(state);
            return `${state.address.provinceName}-${state.address.cityName}-${state.address.countyName}-${state.address.detailInfo}`;
        },
    },
};
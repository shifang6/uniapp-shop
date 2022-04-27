import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    data() {},
    onShow() {
        this.SetBarCount();
    },
    computed: {
        ...mapGetters("m_cate", ["shop_total"]),
    },
    watch: {
        shop_total: {
            handler(newValues) {
                uni.setTabBarBadge({
                    index: 2,
                    text: newValues + "",
                });
            },
            immediate: true,
        },
    },
    methods: {
        SetBarCount() {
            uni.setTabBarBadge({
                index: 2,
                text: this.shop_total + "",
            });
        },
    },
};
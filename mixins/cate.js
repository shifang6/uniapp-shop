import {
    mapState,
    mapMutations,
    mapGetters
} from 'vuex';
export default {
    data() {},
    onShow(){
        this.SetBarCount();
    },
    computed: {
        ...mapGetters('m_cate', ['shop_total'])
    },
    methods: {
        SetBarCount() {
            uni.setTabBarBadge({
                index: 2,
                text: this.shop_total + ''
            });
        }
    }
}

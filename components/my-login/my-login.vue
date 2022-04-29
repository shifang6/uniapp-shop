<template>
    <view class="login-container">
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
        <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
        <text class="tips-text">登录后尽享更多权益</text>
    </view>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
    name: 'my-login',
    data() {
        return {};
    },
    computed: {
        ...mapState('m_cate', ['token', 'switchBar'])
    },
    methods: {
        ...mapMutations('m_cate', ['SAVE_STORAGE_USERINFO']),
        ...mapActions('m_cate', ['GET_SET_TOKENS']),
        async getUserInfo(e) {
            // 判断是否获取用户信息成功
            if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！');
            const [err, succ] = await uni.login().catch(err => err);
            if (err)
                return uni.showToast({
                    title: '用户授权码获取失败！'
                });
            e.detail.code = succ.code;
            console.log(e.detail);
            this.SAVE_STORAGE_USERINFO(e.detail);
            this.GET_SET_TOKENS();
            if (this.$store.state.m_cate) {
                uni.switchTab({
                    url: '/pages/cart/cart'
                });
            }
        }
    }
};
</script>

<style lang="scss">
.login-container {
    height: 750rpx;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::after {
        content: ' ';
        display: block;
        width: 100%;
        height: 40px;
        background-color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 100%;
        transform: translateY(50%);
    }

    .btn-login {
        width: 90%;
        border-radius: 100px;
        margin: 15px 0;
        background-color: #c00000;
    }

    .tips-text {
        font-size: 12px;
        color: gray;
    }
}
</style>

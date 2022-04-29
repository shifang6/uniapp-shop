<template>
  <view>
    <my-info v-if="getTokens()"></my-info>
    <my-login v-else></my-login>
  </view>
</template>

<script>
import CateMixins from "@/mixins/cate.js";
export default {
  mixins: [CateMixins],
  data() {
    return {};
  },
  components: {},
  methods:{
      getTokens(){
          return this.$store.state.m_cate.token
      }
  }
};
</script>

<style lang="scss"></style>

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  background-color: #f0f2f5;
  padding: 24px;
  overflow: hidden;
}
</style>

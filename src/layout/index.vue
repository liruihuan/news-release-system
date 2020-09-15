<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar />
    <div class="main-container">
      <div>
        <navbar />
 <tags-view />
      </div>

      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, Navbar,TagsView } from "./components";
import { mapState } from "vuex";
const { body } = document;
const WIDTH = 1200;
export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar, //左侧菜单
    TagsView
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },

  computed: {
    ...mapState({
      sidebar: state => state.sidebar.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened
      };
    }
  },
  created() {},
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width;
    },
    $_resizeHandler() {
      const _this = this;
      if (!document.hidden) {
        const isMobile = _this.$_isMobile();
        if (isMobile < WIDTH) {
          _this.$store.dispatch("sidebar/autoSideBar", false);
        } else {
          _this.$store.dispatch("sidebar/autoSideBar", true);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>

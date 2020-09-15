<template>
  <div class="sidebar-container">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/images/LOGO.png">>
      </router-link>
    </div>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in constantRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { constantRoutes} from '@/router'
import SidebarItem from "./item";
import variables from "@/styles/variables.scss";

export default {
  data() {
    return {
      };
  },
  components: {
    SidebarItem
  },
  computed: {
    constantRoutes(){
      return constantRoutes
    },
    ...mapGetters(["sidebar"]),
     
    isCollapse() {
      return !this.sidebar.opened;
    },
     variables() {
      return variables
    },
     activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      return path;
    },
  },
  mounted() {

    
  },
  created(){
    
  },
 
 
};
</script>
<style lang="scss" scoped>
</style>


<template>
  <el-aside class="aside" width="250px">
    <el-menu :default-active="$route.path" exact class="el-menu-vertical-demo" router>
      <NavItem v-for="v in menuList" :key="v.path" :item="v" :basePath="v.path" />
    </el-menu>
  </el-aside>
</template>

<script>
import NavItem from "./SidebarItem";
export default {
  components: { NavItem },
  props: ["menuList"],
  data() {
    return {
      id: 0,
      // menuList: []
    };
  },
};
</script>

<style></style>

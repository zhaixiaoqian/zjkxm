<template>
  <!--collapse 是否水平折叠收起菜单-->
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.label"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-button
      plain
      icon="el-icon-menu"
      size="mini"
      @click="collapseMenu"
    ></el-button>
  </el-menu>
</template>

<script>
export default {
  //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      // 这里的数据就是从vuex取得
      return this.$store.state.tab.isCollapse;
    },
  },
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/sys",
          name: "NPSS_SYS",
          label: "基础信息管理",
          icon: "s-home",
          children:[
            {
              path: "/sys/system",
              name: "NPSS_SYS_01",
              label: "系统管理",
            },
            {
              path: "/sys/role-manag",
              name: "NPSS_SYS_02",
              label: "人员管理",
            },
          ]
        },
        {
          path: "/bigdata",
          name: "NPSS_DATA",
          label: "平台大数据分析中心",
          icon: "s-home",
          children: [
            {
              path: "/bigdata/statistics",
              name: "NPSS_DATA_01",
              label: "医废数据统计报表",
            },
            {
              path: "/bigdata/adverse",
              name: "NPSS_DATA_02",
              label: "医废不良事件报表",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //控制左侧菜单是否折叠
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    //跳转路由 根据名称跳转
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
      this.$router.push({ name: item.name });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

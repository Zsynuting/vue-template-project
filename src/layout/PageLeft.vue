<template>
  <el-container class="container">
    <el-header height="84px">
      <div class="sys-name">{{ currentModule.name }}</div>
    </el-header>
    <el-main class="menu">
      <el-scrollbar class="vertical scrollbar">
        <el-menu
          :default-active="currentMenuIndex"
          :default-openeds="openingMenuIndexes"
          background-color="transparent"
          text-color="#fff"
          class="menu"
        >
          <el-submenu
            v-for="(menu, index) in nestedMenus"
            :index="menu.id.toString()"
            :key="index"
            :collapse="false"
          >
            <div slot="title" v-if="menu.children" class="menu-title">
              <i v-if="menu.icon" :class="['iconfont menu-icon', menu.icon]"></i>
              <span>{{ menu.name }}</span>
            </div>
            <el-menu-item-group v-if="menu.children">
              <el-menu-item
                v-for="(subMenu, subIndex) in menu.children"
                :index="subMenu.id.toString()"
                :key="subIndex"
                @click="selectMenu(subMenu)"
                class="menu-title"
              >{{ subMenu.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            v-for="(menu, index) in singleMenus"
            :index="menu.id.toString()"
            :key="index"
            :collapse="false"
            class="menu-title"
          >{{ menu.name }}</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageLeft",
  data() {
    return { currentModuleId: null };
  },
  computed: {
    ...mapGetters({
      allMenus: "getMenus"
    }),
    menus() {
      let menus = [];
      if (this.currentModule) {
        let module = this.allMenus.find(m => m.id === this.currentModule.id);
        if (module) {
          menus = module.children;
        }
      }
      return menus;
    },
    nestedMenus() {
      return this.menus.filter(m => m.children);
    },
    singleMenus() {
      return this.menus.filter(m => !m.children);
    },
    openingMenuIndexes() {
      return this.nestedMenus.map(m => m.id.toString());
    },
    currentMenuIndex() {
      let menuIndex = "";
      this.allMenus.some(menu => {
        if (
          menu.children.some(menu1 => {
            return menu1.children.some(menu2 => {
              if (menu2.url === this.$route.path) {
                menuIndex = menu2.id.toString();
                return true;
              }
            });
          })
        ) {
          this.currentModuleId = menu.id;
          return true;
        }
      });
      return menuIndex;
    },
    currentModule() {
      let module = {};
      if (this.currentModuleId) {
        module = this.allMenus.find(menu => menu.id === this.currentModuleId);
      }
      return module;
    }
  },
  methods: {
    selectMenu(menu) {
      this.$router.push(menu.url);
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}
.menu {
  border: 0;
  overflow: hidden;
  height: 100%;
}
.menu-title {
  font-size: 18px;
}
.menu-icon {
  font-size: 24px;
  color: #fff;
}
.sys-name {
  height: 64px;
  line-height: 64px;
  margin: 10px 10px;
  color: #fff;
  background: url("/static/system-name-pod.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
}
</style>
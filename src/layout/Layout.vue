<template>
  <el-container class="container">
    <el-aside class="aside">
      <page-left/>
    </el-aside>
    <el-container class="container">
      <el-header height="84px" class="header">
        <page-header/>
      </el-header>
      <el-main class="body">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import PageLeft from "./PageLeft";
import PageHeader from "./PageHeader";
export default {
  name: "Layout",
  components: { PageLeft, PageHeader },
  mounted() {
    Promise.all([
      this.$api.module.getAll(),
      this.$api.menu.getAll(),
      this.$api.dictionary.getAll()
    ]).then(([moduleResponse, menuResponse, dictionaryResponse]) => {
      this.$store.commit("setModules", moduleResponse.data);
      this.$store.commit("setMenus", menuResponse.data);
      this.$store.commit("setDictionary", dictionaryResponse.data);
    });
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
.aside {
  background-color: #615f99;
}
.header {
  padding: 0;
}
.body {
  background-color: #eaeced;
  padding: 0;
  height: calc(100% - 84px);
}
</style>
<template>
  <router-view/>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.title = "[修改系统名称]";
  }
};
</script>

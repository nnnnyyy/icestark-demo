<template>
  <div id="app">
    <div>
      <layout />
    </div>
    <div class="content" v-loading="loading">
      <div id="container"></div>
      <router-view v-if="!microAppsActive" />
    </div>
  </div>
</template>

<script>
import { registerMicroApps, start } from "@ice/stark";
import Layout from "./layouts/BasicLayout";

export default {
  data() {
    return {
      loading: false,
      microAppsActive: false,
    };
  },
  name: "App",
  components: {
    Layout,
  },
  mounted() {
    const container = document.getElementById("container");
    registerMicroApps([
      {
        name: "waiter",
        activePath: "/waiter",
        title: "小二平台",
        sandbox: true,
        hashType: true,
        entry: "http://192.168.50.228:8081",
        container,
      },
    ]);

    start({
      onLoadingApp: () => {
        this.loading = true;
      },
      onFinishLoading: () => {
        this.loading = false;
      },
      onRouteChange: (_, pathname) => {
        // 处理微应用间跳转无法触发 Vue Router 响应
        this.$router.push(pathname).catch(() => {});
      },
      onActiveApps: (activeApps) => {
        this.microAppsActive = (activeApps || []).length;
      },
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;

  display: flex;
}
body {
  margin: 0;
  padding: 0;
}
.content {
  flex: 1;
  margin: 40px;
}

.el-rwo {
  height: 100%;
}
</style>

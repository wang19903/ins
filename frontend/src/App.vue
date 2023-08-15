<template>
  <template v-if="$route.name !== 'login'">
    <header class="header">
      <NavBar />
    </header>
    <TheLayout>
      <router-view />
    </TheLayout>
  </template>
  <template v-else>
    <router-view />
  </template>
  <footer class="footer" :class="{ inside: $route.name === 'login' }">
    &copy;demo
  </footer>
</template>

<script setup lang="ts">
import TheLayout from "./components/TheLayout.vue";
import NavBar from "./components/NavBar.vue";
import "./assets/base.css";
</script>
<style scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

.footer {
  text-align: center;
  padding: 38px 0;
  color: #828282;
}

.footer.inside {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>


<!-- 內容展示共同設定 -->
<template>
  <div class="content">
    <slot />
  </div>
</template>
<script setup lang="ts" />
<style scoped>
.content {
  width: 80vw;
  max-width: 1124px;
  margin: 0 auto;
  margin-top: 88px;
}
</style>

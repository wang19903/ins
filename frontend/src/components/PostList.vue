<template>
  <div class="postList">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.postList {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
}

@media screen and (max-width: 700px) {
  .postList {
    grid-template-columns: 1fr;
  }
}
</style>

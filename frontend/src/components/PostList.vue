<template>
  <div class="postList">
    <slot/>
  </div>
</template>
<scrip setup lang="ts" />
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

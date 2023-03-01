<!-- 彈跳視窗模組 -->
<template>
  <Teleport to="body">
    <div class="modal">
      <div class="backdrop"></div>
      <div class="modalContent">
        <button class="closeBtn" @click="$emit('close')">
          <TheIcon icon="close" />
        </button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import TheIcon from "./TheIcon.vue";
defineEmits(["close"]);
</script>
<style scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
}

.backdrop {
  background: rgba(0, 0, 0, 0.56);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.modalContent {
  position: relative;
  background: white;
  border-radius: 52px;
  overflow: hidden;
}

.closeBtn {
  position: absolute;
  background: none;
  border: none;
  right: 14px;
  top: 10px;
}

.closeBtn svg {
  width: 54px;
  height: 54px;
}
</style>

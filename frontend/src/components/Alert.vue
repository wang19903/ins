<template>
  <div class="message-alert" v-if="store.state.general.messages">
    <div>{{ store.state.general.messages }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key } from '../store'
import { computed } from "vue";
const store = useStore(key);
</script>
<style scope>
.message-alert {
  position: fixed;
  min-width: content;
  top: 56px;
  right: 20px;
  z-index: 9;
  background: pink;
  padding: 1rem;
  font-weight: bold;
  border-radius: 10px;
}
</style>
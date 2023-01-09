<!-- 動態取得svg標籤 -->
<template>
  <svg>
    <use :href="`${sprite}#icon-${icon}`"></use>
  </svg>
</template>
<script setup>
import sprite from "../assets/icons/sprite.svg"

defineProps({
    icon:String
})
</script>
<template>
  <div>
    <h2 class="title">搜尋結果：{{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post" />
    </PostList>
  </div>
</template>
<script setup lang="ts">
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore()
const searchResult = computed(() => store.state.post.searchResult);

const route = useRoute();
const term = computed<string>(() => route.query.term as string);

</script>
<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>

<template>
  <div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post.id" />
    </PostList>
    <PostDetails v-if="showPostDetails" />
    <PostUpload v-if="showPostUpload" />
  </div>
</template>
<script setup lang="ts">
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostUpload from "../components/PostUpload.vue";
import PostDetails from "../components/PostDetails.vue";
import { useStore } from "vuex";
import { key } from '../store'
import { computed, onMounted } from "vue";

const store = useStore(key);
const showPostUpload = computed(() => store.state.general.showPostUpload);
const showPostDetails = computed(() => store.state.general.showPostDetails);
const posts = computed(() => store.state.post.list.reverse());

onMounted(() => {
  store.dispatch("loadAllPosts");
});
</script>
<style scoped></style>

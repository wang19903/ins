<template>
  <TheModal @close="store.commit('changeShowPostUpload', false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
        <TheIcon v-else icon="upload-image" />
        <input
          type="file"
          accept="image/*"
          class="fileChooser"
          @change="handleImageUpload"
        />
      </label>
      <div class="postContent">
        <textarea
          placeholder="寫些內容...."
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="pubBtn" @click="publishPost">發佈</TheButton>
      </div>
    </div>
  </TheModal>
</template>
<script setup>
import TheModal from "./TheModal.vue";
import TheIcon from "./TheIcon.vue";
import TheButton from "./TheButton.vue";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const imageObjUrl = ref("");

const image = ref(null);
const description = ref("");

async function handleImageUpload(e) {
  //  accept="image/*"圖片檔。只能上傳一張圖片
  console.log(e.target.files);
  const imageFile = e.target.files[0];
  if (imageFile) {
    // createObjectURL預覽上傳圖片
    imageObjUrl.value = URL.createObjectURL(imageFile);
    console.log(imageObjUrl);
    // 圖片資料
    image.value = imageFile;
    console.log(imageFile);
  }
}
function publishPost() {
  store.dispatch("uploadPost", {
    image: image.value,
    description: description.value,
    likedByMe: 0, //bug..資料讀出來還是true
    // likedByMe: false, //bug..資料讀出來還是true
  });
}
</script>
<style scoped>
.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}
.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}
.upload > svg {
  width: 254px;
  height: 316px;
}

.fileChooser {
  opacity: 0;
  position: absolute;
}

.postContent {
  display: grid;
}
.postContentInput {
  border-bottom: none;
  resize: none;
  padding: 12px 24px;
}

.postContentInput::placeholder {
  color: #757575;
}

.pubBtn {
  align-self: end;
  justify-self: end;
  position: relative;
  right: 24px;
  bottom: 18px;
}
</style>

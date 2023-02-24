<template>
  <div class="loginPage">
    <img src="../assets/phone.png" alt="" class="phoneImage" />
    <div class="loginForm">
      <img src="../assets/logo.svg" alt="" />
      <form @submit.prevent>
        <input type="email" placeholder="信箱" v-model="email" />
        <input v-if="!isLogin" type="text" placeholder="名字" v-model="username" />
        <input type="password" placeholder="密碼" v-model="password" />
        <button type="submit" class="loginButton" @click="isLogin ? login() : register()">
          {{ isLogin? "登入": "註冊" }}
        </button>
        <p @click="isLogin = !isLogin" class="info">
          {{ isLogin? "沒有帳號?點及註冊": "已有帳號?點擊登入" }}
        </p>
        <div v-if="!isLogin" class="agreement">
          <input type="checkbox" v-model="agreementChecked" />勾選表示同意隱私權政策
        </div>
      </form>
      <Alert></Alert>
    </div>
  </div>
</template>
<script setup>
import Alert from "../components/Alert.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from '../store'
import { ActionType } from "../store/actions";
const isLogin = ref(true);

const email = ref("");
const username = ref("");
const password = ref("");
const agreementChecked = ref(false);

const store = useStore(key);
const router = useRouter();

async function register() {
  if (!agreementChecked.value) {
    alert("請先勾選同意隱私權政策");
    return;
  }

  await store.dispatch("registerUser", {
    email: email.value,
    username: username.value,
    password: password.value,
  });
  router.replace("/");
}

async function login() {
  const res = await store.dispatch("loginUser", {
    email: email.value,
    password: password.value,
  });
  console.log(res, "login");
  store.dispatch(ActionType.messageAlert, res);
  router.replace("/");
}
</script>
<style scoped>
.loginPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  /* gap: 5vw; */
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;
  /* padding: 0 10vw; */
}

.phoneImage {
  max-width: 700px;
  position: relative;
  top: 36px;
  justify-self: end;
}

.loginForm {
  justify-self: start;
  box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
  border-radius: 32px;
  background: white;
  padding: 74px 60px;

  display: grid;
  place-items: center;
  row-gap: 52px;
  width: 370px;
}

.loginForm>form {
  display: grid;
  row-gap: 24px;
  width: 100%;
  height: 100%;
}

input {
  background: #fafafa;
  border-radius: 4px;
  border: none;
}

input::placeholder {
  color: #9e9e9e;
}

.loginButton {
  background: linear-gradient(89.93deg, #00c2ff 0.06%, #0047ff 105.68%);
  padding: 12px 0;
  color: white;
  border: none;
}

.info {
  color: #1da0ff;
  text-align: center;
  cursor: pointer;
}

.agreement {
  color: #a1a1a1;
  display: flex;
  align-items: center;
  gap: 6px;
}

@media screen and (max-width: 780px) {
  .loginPage {
    grid-template-columns: 1fr;
    grid-auto-flow: dense;
  }

  .loginPage>.loginForm {
    grid-row-start: 1;
  }

  .phoneImage,
  .loginForm {
    margin: auto;
  }

  .loginPage img {
    max-width: 370px;
  }
}
</style>

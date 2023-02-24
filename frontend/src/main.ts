import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routes";
import { store, key } from "./store";

const app = createApp(App);

app.use(store, key);
app.use(router);

app.mount("#app");

// Placing it here or any other `.ts` file works
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $goto: any;
  }
}

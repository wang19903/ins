//讓 TypeScript 編譯器可以正確地解析 .vue 檔案，並將它們當作 Vue.js 組件來處理。
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

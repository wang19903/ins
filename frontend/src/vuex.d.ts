//元件使用$store不出現紅底
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    count: number;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

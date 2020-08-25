import './css/main.css';
import Test from '~/components/Test.vue';

export default {
  install(Vue) {
    Vue.component("test", Test);
  }
};
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
declare module 'vue-cropperjs' {
    import Vue from 'vue';
    const VueCropper: Vue.Component;
    export default VueCropper;
  }
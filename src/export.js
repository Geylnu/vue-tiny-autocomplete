import BaseAutoComplete from "./components/BaseAutoComplete";
import BaseInput from "./components/BaseInput";

function install(Vue) {
  Vue.component(BaseAutoComplete.name, BaseAutoComplete);
  Vue.component(BaseInput.name, BaseInput);
}

export default {
  install,
  BaseAutoComplete,
  BaseInput,
};

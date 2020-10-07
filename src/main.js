import './css/main.scss';

import BaseButton from '~/components/BaseButton.vue';
import BasePopper from '~/components/BasePopper.vue';
import CheckBox from '~/components/CheckBox.vue';
import Icon from '~/components/Icon.js';
import IconButton from '~/components/IconButton.vue';
import ListItem from '~/components/ListItem.vue';
import PopOver from '~/components/PopOver.js';
import SearchHighlight from '~/components/SearchHighlight.js';
import ToggleSwitch from '~/components/ToggleSwitch.vue';
import Tooltip from '~/components/Tooltip.js';

export default {
  install(Vue) {
    Vue.component("base-button", BaseButton);
    Vue.component("base-popper", BasePopper);
    Vue.component("check-box", CheckBox);
    Vue.component("icon", Icon);
    Vue.component("icon-button", IconButton);
    Vue.component("list-item", ListItem);
    Vue.component("pop-over", PopOver);
    Vue.component("search-highlight", SearchHighlight);
    Vue.component("toggle-switch", ToggleSwitch);
    Vue.component("tooltip", Tooltip);
  }
};
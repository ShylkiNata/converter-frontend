import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faFilePdf, faFileImage, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;
library.add(faTrash, faFilePdf, faFileImage, faArrowRight);

Vue.component('font-awesome-icon', FontAwesomeIcon);;
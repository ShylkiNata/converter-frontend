import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';

import { faTrash, faFilePdf, faFileImage, faArrowRight, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive, faDropbox } from '@fortawesome/fontawesome-free-brands';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;
library.add(faTrash, faFilePdf, faFileImage, faArrowRight, faFileUpload, faGoogleDrive, faDropbox);

Vue.component('font-awesome-icon', FontAwesomeIcon);
'use strict';

import { setCopyYear } from './utils.js';
import SimpleSelect from './simpleSelect.js';

setCopyYear('.js-copy-year');

new SimpleSelect('.js-select', {
    arrow: {
        type: 'svg',
        src: '/images/sprite.svg#arrow',
    }
});
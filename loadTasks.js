import { getAreasOfFocus } from './store.js';
import { addAreaOfFocus } from './utilities.js';

window.addEventListener('load', () => {
    const areasOfFocus = getAreasOfFocus();

    if (areasOfFocus !== []) {
        areasOfFocus.forEach((area) => {
            addAreaOfFocus(area);
        });
        feather.replace();
    }
});
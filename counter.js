import { addAreaOfFocus } from './utilities.js';
import { getAreasOfFocus, setAreasOfFocus } from './store.js';

window.addEventListener('load', () => {
    document.getElementById('add-new-focus').onclick = (event) => {
        const newFocusName = document.getElementById('new-focus').value;
        const areasOfFocus = getAreasOfFocus();


        if (newFocusName !== '' && !areasOfFocus.includes(newFocusName)) {
            const index = areasOfFocus.length;
            const newFocus = { name: newFocusName, count: 0, id: index }
            areasOfFocus.push(newFocus)
            setAreasOfFocus(areasOfFocus);
            addAreaOfFocus(newFocus);

            feather.replace();
        }
    }
})
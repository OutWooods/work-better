import { changeCount, createButton, createElement } from './utilities.js';
import { getAreasOfFocus, setAreasOfFocus } from './store.js';

window.addEventListener('load', () => {
    const setFocus = (index) => {
        const areasOfFocus = getAreasOfFocus();
        focusArea = areasOfFocus[index];
        setAreasOfFocus(areasOfFocus);
        document.getElementById('focus-area').innerHTML = focusArea.name;
        document.getElementById('focus-info').style.display = '';
    }

    document.getElementById('add-new-focus').onclick = (event) => {
        const newFocus = document.getElementById('new-focus').value;
        const areasOfFocus = getAreasOfFocus();

        if (newFocus !== '' && !areasOfFocus.includes(newFocus)) {
            const index = areasOfFocus.length;

            areasOfFocus.push({ name: newFocus, count: 0, id: index })
            setAreasOfFocus(areasOfFocus);

            const focus = document.createElement('div');
            const text = createElement('span', newFocus)

            const plusButton = createButton(() => { changeCount(index) }, { feather: 'plus' })
            const minusButton = createButton(() => { changeCount(index, -1) }, { feather: 'minus' })
            const setAsFocus = createButton(() => { setFocus(index) }, { innerHTML: 'Set as focus' })

            const countName = createElement('span', ' count: ');
            const count = createElement('span', '0');
            count.id = `count-${index}`

            focus.appendChild(text);
            focus.appendChild(countName);
            focus.appendChild(count);
            focus.appendChild(plusButton);
            focus.appendChild(minusButton);
            focus.appendChild(setAsFocus);
            document.getElementById('focus-areas').appendChild(focus);

            document.getElementById('new-focus').value = '';
            feather.replace();
        }
    }
})
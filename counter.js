window.addEventListener('load', () => {
    const setFocus = (index) => {
        focusArea = areasOfFocus[index];
        document.getElementById('focus-area').innerHTML = focusArea.name;
        document.getElementById('focus-info').style.display = '';
    }

    const createButton = (clickEvent, extras = {}) => {
        const { feather, innerHTML } = extras;
        const button = document.createElement('button');
        button.onclick = clickEvent;
        if (feather) {
            featherIcon = document.createElement('i')
            featherIcon.dataset.feather = feather
            button.appendChild(featherIcon);
        } else {
            button.innerHTML = innerHTML;
        }
        return button;
    }

    document.getElementById('add-new-focus').onclick = (event) => {
        const newFocus = document.getElementById('new-focus').value;

        if (newFocus !== '' && !areasOfFocus.includes(newFocus)) {
            const index = areasOfFocus.length;
            areasOfFocus.push({ name: newFocus, count: 0, id: index })
            const focus = document.createElement('div');
            const text = document.createElement('span');
            const countName = document.createElement('span');
            const count = document.createElement('span');
            const plusButton = createButton(() => { changeCount(index) }, { feather: 'plus' })
            const minusButton = createButton(() => { changeCount(index, -1) }, { feather: 'minus' })
            const setAsFocus = createButton(() => { setFocus(index) }, { innerHTML: 'Set as focus' })
            countName.innerHTML = ' count: ';
            count.innerHTML = '0';
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
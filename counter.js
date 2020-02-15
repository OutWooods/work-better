window.addEventListener('load', () => {
    const setFocus = (index) => {
        focusArea = areasOfFocus[index];
        document.getElementById('focus-area').innerHTML = focusArea.name;
        document.getElementById('focus-info').style.display = '';
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
            const plusButton = document.createElement('button');
            const minusButton = document.createElement('button');
            const setAsFocus = document.createElement('button');
            setAsFocus.innerHTML = 'setAsFocus';
            setAsFocus.onclick = () => { setFocus(index) };
            const plus = document.createElement('i');
            plus.dataset.feather = 'plus';
            const minus = document.createElement('i');
            minus.dataset.feather = 'minus';
            plusButton.onclick = () => { changeCount(index) };
            minusButton.onclick = () => { changeCount(index, -1) };
            text.innerHTML = newFocus;
            countName.innerHTML = ' count: ';
            count.innerHTML = '0';
            count.id = `count-${index}`
            plusButton.appendChild(plus);
            minusButton.appendChild(minus);
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
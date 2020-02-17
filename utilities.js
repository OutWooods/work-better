import { getAreasOfFocus, setAreasOfFocus, getCompletedTasks, setCompletedTasks, setFocus } from './store.js';

export const changeCount = (index, amount = 1) => {
    const areasOfFocus = getAreasOfFocus();
    const newCount = areasOfFocus[index].count + amount;

    if (newCount >= 0) {
        areasOfFocus[index].count = newCount
        setAreasOfFocus(areasOfFocus);
        document.getElementById(`count-${index}`).innerHTML = areasOfFocus[index].count;
        return;
    }

    areasOfFocus[index].count = 0;
    setAreasOfFocus(areasOfFocus);
    document.getElementById(`count-${index}`).innerHTML = 0;
}

export const createElement = (type, text) => {
    const element = document.createElement(type);
    element.innerHTML = text;
    return element;
}

export const createButton = (clickEvent, extras = {}) => {
    const { feather, innerHTML } = extras;
    const button = document.createElement('button');
    button.onclick = clickEvent;

    if (feather) {
        const featherIcon = document.createElement('i')
        featherIcon.dataset.feather = feather
        button.appendChild(featherIcon);
    } else {
        button.innerHTML = innerHTML;
    }
    return button;
}

export const formatTime = (time) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const formattedSeconds = seconds + "s ";

    if (hours > 0) {
        return hours + 'h ' + minutes + 'm ' + formattedSeconds;
    }

    if (minutes > 0) {
        return minutes + "m " + formattedSeconds;
    }

    return formattedSeconds;
}

const formatDate = (time) => time.getHours() + ':' + time.getMinutes();

export const completeTask = (start, end, timeTaken, task) => {
    const taskData = {
        start,
        end,
        timeTaken,
        name: task ? task.name : 'Undefined task',
        distractionCount,
    }

    if (task) {
        changeCount(task.id);
    }

    const completedTasks = getCompletedTasks();
    completedTasks.push(taskData);
    setCompletedTasks(completedTasks);

    // TODO dependent on a global
    distractionCount = 0;
    const completedTask = document.createElement('div');

    addCompletedTask(taskData, completedTasks.length)
}

export const addAreaOfFocus = (area) => {
    const focus = document.createElement('div');
    const text = createElement('span', area.name)

    const plusButton = createButton(() => { changeCount(area.id) }, { feather: 'plus' })
    const minusButton = createButton(() => { changeCount(area.id, -1) }, { feather: 'minus' })
    const setAsFocus = createButton(() => { setFocus(area.id) }, { innerHTML: 'Set as focus' })

    const countName = createElement('span', ' count: ');
    const count = createElement('span', '0');
    count.id = `count-${area.id}`

    focus.appendChild(text);
    focus.appendChild(countName);
    focus.appendChild(count);
    focus.appendChild(plusButton);
    focus.appendChild(minusButton);
    focus.appendChild(setAsFocus);
    document.getElementById('focus-areas').appendChild(focus);

    document.getElementById('new-focus').value = '';
}

export const addCompletedTask = (task, position) => {
    const completedTask = document.createElement('div');

    const taskName = createElement('span', `${position}) ${task.name}`);
    const startTime = createElement('span', ' Start: ' + formatDate(new Date(task.start)));
    const formattedEnd = task.end === 'N/A' ? end : formatDate(new Date(task.end));
    const endTime = createElement('span', ' End: ' + formattedEnd);
    const taskLength = createElement('span', ' Length: ' + formatTime(task.timeTaken));
    const distractions = createElement('span', ' Distractions: ' + task.distractionCount);

    completedTask.appendChild(taskName);
    completedTask.appendChild(startTime);
    completedTask.appendChild(endTime);
    completedTask.appendChild(taskLength);
    completedTask.appendChild(distractions);

    document.getElementById('completed-areas-section').style.display = '';
    document.getElementById('completed-areas').appendChild(completedTask);
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == 'visible' && !!countDown) {
        distractionCount += 1;
    }
});
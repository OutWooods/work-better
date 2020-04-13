import { getAreasOfFocus, setAreasOfFocus, getCompletedTasks, setCompletedTasks, setFocus } from './store.js';

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

const formatDay = (date) => {
    if (dateFns.isToday(date)) {
        return '(Today)';
    }

    if (dateFns.isYesterday(date)) {
        return '(Yesterday) ';
    }

    return dateFns.format(date, '(DD/MM/YYYY) ');
}

export const storeTotalTimeWorked = (completedTasks) => {
    if (completedTasks === []) {
        document.getElementById('time-worked').innerHTML = '';
        return;
    }

    let taskTime = 0;
    completedTasks.forEach((task) => {
        taskTime += task.timeTaken;
    });

    document.getElementById('time-worked').innerHTML = 'Total: ' + formatTime(taskTime);

}

export const completeTask = (start, end, timeTaken, task) => {
    const taskData = {
        start,
        end,
        timeTaken,
        name: task ? task.name : 'Undefined task',
        id: task ? task.id : -1,
        distractionCount,
    }

    const completedTasks = getCompletedTasks();
    completedTasks.push(taskData);
    setCompletedTasks(completedTasks);
    storeTotalTimeWorked(completedTasks);

    distractionCount = 0;
    addCompletedTask(taskData, completedTasks.length)
}

export const extendTask = (start, end, timeTaken, task) => {
    const taskData = {
        start,
        end,
        timeTaken,
        name: task ? task.name : 'Undefined task',
        distractionCount,
    }

    const completedTasks = getCompletedTasks();
    completedTasks.pop();
    completedTasks.push(taskData);
    const completedAreas = document.getElementById('completed-areas');
    completedAreas.removeChild(completedAreas.lastChild);
    setCompletedTasks(completedTasks);
    storeTotalTimeWorked(completedTasks);

    // TODO dependent on a global
    distractionCount = 0;
    addCompletedTask(taskData, completedTasks.length)
}

export const addAreaOfFocus = (area) => {
    const focus = document.createElement('div');
    const text = createElement('span', area.name)

    const setAsFocus = createButton(() => { setFocus(area.id) }, { innerHTML: 'Set as focus' })

    const countName = createElement('span', ' count: ');
    const count = createElement('span', '0');
    count.id = `count-${area.id}`
    const timeSpent = createElement('span', ' time: ');
    const time = createElement('span', '0');
    time.id = `time-${area.id}`

    focus.appendChild(text);
    focus.appendChild(countName);
    focus.appendChild(count);
    focus.appendChild(timeSpent);
    focus.appendChild(time);
    focus.appendChild(plusButton);
    focus.appendChild(minusButton);
    focus.appendChild(setAsFocus);
    document.getElementById('focus-areas').appendChild(focus);

    document.getElementById('new-focus').value = '';
}

export const addCompletedTask = (task, position) => {
    const completedTask = document.createElement('div');

    const taskName = createElement('span', `${position}) ${task.name} ${formatDay(task.start)},`);
    const startTime = createElement('span', ' Start: ' + formatDate(new Date(task.start)) + ',');
    const formattedEnd = task.end === 'N/A' ? task.end + ',' : formatDate(new Date(task.end)) + ',';
    const endTime = createElement('span', ' End: ' + formattedEnd + ',');
    const taskLength = createElement('span', ' Length: ' + formatTime(task.timeTaken) + ',');
    const distractions = createElement('span', ' Distractions: ' + task.distractionCount);

    completedTask.appendChild(taskName);
    completedTask.appendChild(startTime);
    completedTask.appendChild(endTime);
    completedTask.appendChild(taskLength);
    completedTask.appendChild(distractions);

    document.getElementById('completed-areas').appendChild(completedTask);
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == 'visible' && !!countDown) {
        distractionCount += 1;
    }
});
export const changeCount = (index, amount = 1) => {
    const newCount = areasOfFocus[index].count + amount;

    if (newCount >= 0) {
        areasOfFocus[index].count = newCount
        document.getElementById(`count-${index}`).innerHTML = areasOfFocus[index].count;
        return;
    }

    areasOfFocus[index].count = 0;
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

export const completeTask = (start, end, timeTaken, task = {}) => {
    const taskData = {
        start,
        end,
        timeTaken,
        name: task.name,
        distractionCount: distractionCount,
    }

    changeCount(task.id);
    // TODO dependent on a global
    completedTasks.push(taskData);
    // TODO dependent on a global
    distractionCount = 0;
    const completedTask = document.createElement('div');

    const taskName = createElement('span', `${completedTasks.length}) ${taskData.name}`);
    const startTime = createElement('span', ' Start: ' + formatDate(start));
    const formattedEnd = end === 'N/A' ? end : formatDate(end);
    const endTime = createElement('span', ' End: ' + formattedEnd);
    const taskLength = createElement('span', ' Length: ' + formatTime(timeTaken));
    const distractions = createElement('span', ' Distractions: ' + taskData.distractionCount);

    completedTask.appendChild(taskName);
    completedTask.appendChild(startTime);
    completedTask.appendChild(endTime);
    completedTask.appendChild(taskLength);
    completedTask.appendChild(distractions);

    document.getElementById('completed-areas').style.display = '';
    document.getElementById('completed-areas').appendChild(completedTask);
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == 'visible' && !!countDown) {
        distractionCount += 1;
    }
});
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

const formatTime = (time) => {
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

const formatDate = (time) => {
    return time.getHours() + ':' + time.getMinutes();
}

export const completeTask = (start, end, task = {}) => {
    const taskData = {
        start,
        end,
        name: task.name,
        distractionCount: distractionCount,
    }

    changeCount(task.id);
    // TODO dependent on a global
    completedTasks.push(taskData);
    // TODO dependent on a global
    distractionCount = 0;
    const completedTask = document.createElement('div');
    const taskName = document.createElement('span');
    taskName.innerHTML = `${completedTasks.length}) ${taskData.name}`;
    const startTime = document.createElement('span');
    startTime.innerHTML = ' Start: ' + formatDate(start);
    const endTime = document.createElement('span');
    endTime.innerHTML = ' End: ' + formatDate(end);
    const taskLength = document.createElement('span');
    taskLength.innerHTML = ' Length: ' + formatTime(end - start);
    const distractions = document.createElement('span');
    taskLength.innerHTML = ' Distractions: ' + taskData.distractionCount;
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
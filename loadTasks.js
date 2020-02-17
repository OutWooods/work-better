import { getAreasOfFocus, getCompletedTasks, setCompletedTasks, setAreasOfFocus } from './store.js';
import { addAreaOfFocus, storeTotalTimeWorked, addCompletedTask } from './utilities.js';

window.addEventListener('load', () => {
    const areasOfFocus = getAreasOfFocus();

    const addCompletedTasks = () => {
        const completedTasks = getCompletedTasks();

        if (completedTasks !== []) {
            storeTotalTimeWorked(completedTasks);
            completedTasks.forEach((task, index) => {
                addCompletedTask(task, index + 1);
            })
        }
    }

    const addAreasOfFocus = () => {
        if (areasOfFocus !== []) {
            areasOfFocus.forEach((area) => {
                addAreaOfFocus(area);
            });
            feather.replace();
        }
    }

    const clearCompletedTasks = () => {
        storeTotalTimeWorked([]);
        setCompletedTasks([]);
        document.getElementById('completed-areas').innerHTML = '';
    }

    const clearTasks = () => {
        setAreasOfFocus([]);
        document.getElementById('focus-areas').style.display = 'none';
        document.getElementById('focus-areas').innerHTML = '';
    }

    document.getElementById('clear-tasks').onclick = () => {
        clearTasks();
        clearCompletedTasks();
    }

    document.getElementById('clear-completed-areas').onclick = clearCompletedTasks;

    addCompletedTasks();
    addAreasOfFocus();
});
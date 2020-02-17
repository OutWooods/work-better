import { getAreasOfFocus, getCompletedTasks } from './store.js';
import { addAreaOfFocus, addCompletedTask } from './utilities.js';

window.addEventListener('load', () => {
    const areasOfFocus = getAreasOfFocus();

    const addCompletedTasks = () => {
        const completedTasks = getCompletedTasks();

        if (completedTasks !== []) {
            completedTasks.forEach((task, index) => {
                addCompletedTask(task, index + 1);
            })
        }
    }

    if (areasOfFocus !== []) {
        areasOfFocus.forEach((area) => {
            addAreaOfFocus(area);
        });
        feather.replace();
    }

    addCompletedTasks();
});
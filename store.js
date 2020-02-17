export const getAreasOfFocus = () => JSON.parse(localStorage.getItem('areasOfFocus')) || [];

export const setAreasOfFocus = (areasOfFocus) => localStorage.setItem('areasOfFocus', JSON.stringify(areasOfFocus))

export const getCompletedTasks = () => JSON.parse(localStorage.getItem('completedTasks')) || [];

export const setCompletedTasks = (completedTasks) => localStorage.setItem('completedTasks', JSON.stringify(completedTasks))

export const setFocus = (index) => {
    const areasOfFocus = getAreasOfFocus();
    focusArea = areasOfFocus[index];
    setAreasOfFocus(areasOfFocus);
    document.getElementById('focus-area').innerHTML = focusArea.name;
    document.getElementById('focus-info').style.display = '';
}
export const getAreasOfFocus = () => JSON.parse(localStorage.getItem('areasOfFocus')) || [];

export const setAreasOfFocus = (areasOfFocus) => localStorage.setItem('areasOfFocus', JSON.stringify(areasOfFocus))
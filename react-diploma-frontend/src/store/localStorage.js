export const load = (key) => {
    const state = localStorage.getItem(key);
    return JSON.parse(state);
};

export const save = (key, state) => {
    localStorage.setItem(key, JSON.stringify(state));
};

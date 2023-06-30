const StoreStorageName = 'mc-store';

export const saveStoreToLocalStorage = (store) => {
  return localStorage.setItem(StoreStorageName, JSON.stringify(store));
};

export const loadStoreFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(StoreStorageName)) ?? {};
};

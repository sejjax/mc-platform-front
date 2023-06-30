export const getAccessSelector = (state) => state.Profile.user.role?.access ?? [];

export const isUserBoughtProjectSelector = (state) => state.Profile.user.investorLevel !== 0;

export const getUserLevelSelector = (state) => state.Profile.user.level;

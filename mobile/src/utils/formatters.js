// src/utils/formatters.js

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

export const formatScore = (score) => {
    return score.toFixed(2);
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
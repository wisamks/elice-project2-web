const calculatePriceRange = (price: number|undefined) => {
    if (price === undefined) {
        return undefined;
    }
    if (price > 50000) {
        return {min: 50000, max: undefined};
    } else if (price > 30000) {
        return {min: 30000, max: 50000}; 
    } else if (price > 10000) {
        return {min: 10000, max: 30000};
    } else if (price > 5000) {
        return {min: 5000, max: 10000};
    } else if (price > 1000) {
        return {min: 1000, max: 5000};
    } else if (price > 0) {
        return {min: 0, max: 1000};
    } else {
        return {min: undefined, max: 0};
    }
}

export default calculatePriceRange;
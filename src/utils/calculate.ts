import { BigNumber } from 'bignumber.js';

export const calculatePercentage = (
    numerator: number | string,
    denominator: number | string
): string => {
    if (denominator == 0) return '0';
    const res = new BigNumber(numerator).div(denominator).multipliedBy(100).toFixed(0);
    return res;
};

export const getRoundingOffBigNumber = (value: string | number, num = 0) => {
    if (value == 0) {
        return value;
    }
    return new BigNumber(value).toFixed(num);
};
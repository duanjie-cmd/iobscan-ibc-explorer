import { BigNumber } from 'bignumber.js';
import { formatBigNumber } from '@/helper/parseStringHelper';
import { IHeatmapTotalInfoItem } from '@/types/interface/overview.interface';
import { BIG_UNIT, DEFAULT_DISPLAY_TEXT } from '@/constants';
import { bigNumberCompared, bigNumberDivide } from '@/utils/calculate';

/**
 * Here is rounding
 * @param dimensionValue data to be formatted
 * @param decimal the number of decimal places to be retained, default 2
 * @returns
 */
export const formatDimension = (
    dimensionValue: string | number,
    decimal = 2,
    isNeedDimension = false
): IHeatmapTotalInfoItem | string => {
    const getReturnData = (
        dimensionValue: string | number,
        isDimension: boolean
    ): IHeatmapTotalInfoItem | string => {
        if (isNeedDimension) {
            return {
                result: String(dimensionValue),
                isDimension: isDimension
            };
        } else {
            return String(dimensionValue);
        }
    };
    if (dimensionValue === DEFAULT_DISPLAY_TEXT) return getReturnData(dimensionValue, false);
    const bigUnitKeys = Object.keys(BIG_UNIT);
    const handleRoundItOffDecimal = (value: string, decimal: number) => {
        let moveLength = 0;
        for (let i = 0; i < bigUnitKeys.length; i++) {
            const key = bigUnitKeys[i];
            const item = BIG_UNIT[key as keyof typeof BIG_UNIT];
            if (bigNumberCompared(value, item.value) !== '-1') {
                moveLength = item.moveLength;
                break;
            }
        }
        const temp = new BigNumber(value).shiftedBy(-moveLength).toFixed(decimal);
        const result = new BigNumber(temp).shiftedBy(moveLength).toString();
        return result;
    };
    const value = handleRoundItOffDecimal(String(dimensionValue), decimal);
    let isDimension = false;
    let result;
    for (let i = 0; i < bigUnitKeys.length; i++) {
        const key = bigUnitKeys[i];
        const item = BIG_UNIT[key as keyof typeof BIG_UNIT];
        if (bigNumberCompared(value, item.value) !== '-1') {
            result = `${formatBigNumber(bigNumberDivide(value, item.value), decimal)}${item.unit}`;
            isDimension = true;
            break;
        }
    }
    if (result === undefined) {
        result = formatBigNumber(value, decimal);
    }
    return getReturnData(result, isDimension);
};

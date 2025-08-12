import { IDataItem, ModeType, TDenom } from './interface';
import { MODES } from './constants';
/**
 * Return data corresponding to different types: single selection returns single value, multiple selection returns array collection
 * @param selectData
 * @param mode
 * @param keygen
 */
export const getValByMode = (selectData: IDataItem[], mode: ModeType) => {
    switch (mode) {
        case MODES.multiple:
            return selectData;
        case MODES.double:
            return selectData;
        default:
            return selectData[0];
    }
};

/**
 * Determine whether to collapse based on type (true)
 * @param selectData
 * @param mode
 */
export const closeByMode = (selectData: IDataItem[], mode: ModeType) => {
    switch (mode) {
        case MODES.multiple:
            return false;
        case MODES.double:
            return selectData.length === 2;
        default:
            return true;
    }
};

/**
 * Input box input operation
 * @param inputVal
 * @param mode
 */
export const inputItemsByMode = (inputVal: string | undefined, mode: ModeType): IDataItem[] => {
    let tokens;
    const res: IDataItem[] = [];

    if (!inputVal || !inputVal.trim()) {
        return res;
    }

    switch (mode) {
        case MODES.multiple:
            tokens = inputVal?.split(',').filter((v) => v);
            break;
        case MODES.double:
            tokens = inputVal?.split(',').filter((v) => v);
            break;
        default:
            tokens = [inputVal];
            break;
    }

    tokens?.forEach((v) => {
        res.push({
            id: v,
            title: v,
            inputFlag: true
        });
    });

    return res;
};

// Remove duplicates || can repeat multiple selections
export const getLastArrs = (data?: IDataItem[]): IDataItem[] => {
    const res: IDataItem[] = [];

    if (!data?.length) {
        return res;
    }

    const ids: TDenom[] = [];

    data.forEach((v) => {
        if (!ids.includes(v.id) || v.doubleTime) {
            res.push(v);
            ids.push(v.id);
        }
    });

    return res;
};

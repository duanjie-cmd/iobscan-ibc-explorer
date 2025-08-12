import { onMounted, ref, watch } from 'vue';
import { IDataItem, TDenom, TData, TUseInit } from './interface';
import { MODES } from './constants';

// Initialize
export const useInit = (props: TUseInit) => {
    const visible = ref(false);
    const selectItems = ref<IDataItem[]>([]);
    const tokenInput = ref<string | undefined>(undefined);
    const flatData = ref<IDataItem[]>([]); // Flattened array

    // Here we didn't write it as computed. Because when data changes, value also needs to change, written in computed, each time value changes, the flatten data operation is executed.
    const resetFlatArr = (data: TData) => {
        // Flatten array processing, collection
        const tempFlats: IDataItem[] = [];

        data?.forEach((v) => {
            if (v.children && v.children.length) {
                tempFlats.push(...v.children);
            }
        });

        flatData.value = tempFlats;
    };

    const resetVal = (val?: TDenom | TDenom[], inputFlag?: boolean) => {
        tokenInput.value = undefined; // Clear input
        selectItems.value = []; // Clear selected

        // All values are processed as array operations, and then when returning, it is determined what value to return
        let values;
        if (props.mode === MODES.double || props.mode === MODES.multiple) {
            if (val && !Array.isArray(val)) {
                throw 'value need array';
            }
            values = val as TDenom[];
        } else {
            // Cannot be null & undefined
            values = (val !== undefined && val !== null ? [val] : []) as TDenom[];
        }

        const inputItems: IDataItem[] = [];
        values.forEach((v) => {
            const temp = flatData.value.find((item) => item.id === v);
            if (temp && (!inputFlag || !v)) {
                selectItems.value.push(temp);
            } else {
                inputItems.push({
                    id: v,
                    title: v
                });
                selectItems.value.push({
                    id: v,
                    title: v,
                    inputFlag: true
                });
            }
        });
        tokenInput.value = inputItems.map((v) => v.id).join(',');
    };

    onMounted(() => {
        resetFlatArr(props.data);
        resetVal(props.value, props.inputFlag);
    });

    watch(
        () => props.value,
        (newVal) => {
            resetVal(newVal, props.inputFlag);
        }
    );

    watch(
        () => props.data,
        (newData) => {
            resetFlatArr(newData);
            resetVal(props.value, props.inputFlag);
        }
    );

    return {
        visible,
        selectItems,
        tokenInput,
        flatData,
        resetVal
    };
};

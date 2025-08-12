<template>
    <div class="chain_wrap">
        <div class="mr-8 ml-8" :class="showInputClass[0]">
            <img
                v-if="!hideIcon && selectItems[0]?.icon?.length"
                width="18"
                height="18"
                class="mr-4"
                :src="selectItems[0]?.icon"
            />
            {{ selectItems[0]?.title || placeholders?.[0] }}
        </div>
        <div>-</div>
        <div class="mr-8 ml-8" :class="showInputClass[1]">
            <img
                v-if="!hideIcon && selectItems[1]?.icon?.length"
                width="18"
                height="18"
                class="mr-4"
                :src="selectItems[1]?.icon"
            />
            {{ selectItems[1]?.title || placeholders?.[1] }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { IDataItem, TDenom } from '../interface';
    interface TProps {
        visible: boolean;
        selectItems: any; // IDataItem[]
        placeholders?: [string, string];
        hideIcon?: boolean;
        selectColorDefaultVal?: string | number | (string | number)[];
    }

    const props = withDefaults(defineProps<TProps>(), {
        selectItems: () => []
    });

    const { visible, placeholders, selectItems, selectColorDefaultVal } = toRefs(props);

    const getClassStr = (selectVal: IDataItem, vals: TDenom[]) => {
        // When no selection: expanded shows selected_color__third, collapsed shows selected_color__default
        // When selected: default values show selected_color__default, non-default values highlight with selected_color

        if (!selectVal) {
            return visible.value ? 'selected_color__third' : 'selected_color__default';
        }

        const includeDefault = vals.includes(selectVal.id);
        return includeDefault ? 'selected_color__default' : 'selected_color';
    };

    const showInputClass = computed(() => {
        const res: string[] = [];
        const vals =
            selectColorDefaultVal?.value !== undefined
                ? Array.isArray(selectColorDefaultVal.value)
                    ? selectColorDefaultVal.value
                    : [selectColorDefaultVal.value]
                : [];

        res[0] = getClassStr(selectItems.value[0], vals);
        res[1] = getClassStr(selectItems.value[1], vals);

        return res;
    });
</script>

<style lang="less" scoped>
    .chain_wrap {
        .flex(row, nowrap, center, center);
        flex: 1;
    }
    .selected_color {
        color: var(--ibc-primary-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 118px;
        &__default {
            color: var(--ibc-text-second);
        }
        &__third {
            color: var(--ibc-text-third);
        }
    }
    .selectedInfo_title {
        max-width: 118px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

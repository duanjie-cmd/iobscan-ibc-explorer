<template>
    <div
        class="flex flex-1 overflow-auto flex-wrap text-center mr-8 ml-8 justify-center items-center"
        :class="showInputClass"
    >
        <div
            v-for="item in selectItems"
            :key="item.id"
            class="flex items-center"
            :class="{ multiple: props.mode === MODES.multiple }"
        >
            <img
                v-if="!hideIcon && item.icon?.length"
                width="18"
                height="18"
                class="mr-4"
                :src="item.icon"
            />
            <span class="selected_info_title" :title="item.title">{{
                !item.inputFlag ? item.title : getRestString(item.title, 4, 4)
            }}</span>
        </div>
        <!-- When nothing is selected, display like placeholder -->
        <div v-if="!selectItems.length">
            <span class="selected_info_title">{{ placeholder }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { getRestString } from '@/helper/parseStringHelper';
    import { IDataItem, ModeType } from '../interface';
    import { MODES } from '../constants';

    /**
     * defineProps using external interface or type will report an error
     */
    interface TProps {
        visible: boolean;
        selectItems: any; // IDataItem[]
        placeholder?: string;
        mode: ModeType;
        hideIcon?: boolean;
        selectColorDefaultVal?: string | number | (string | number)[];
    }

    const props = withDefaults(defineProps<TProps>(), {
        selectItems: () => []
    });

    const { visible, selectItems, placeholder, hideIcon, selectColorDefaultVal } = toRefs(props);

    const showInputClass = computed(() => {
        const vals =
            selectColorDefaultVal?.value !== undefined
                ? Array.isArray(selectColorDefaultVal.value)
                    ? selectColorDefaultVal.value
                    : [selectColorDefaultVal.value]
                : [];
        // When nothing is selected, expand to selected_color__third, close to selected_color__default
        // When selected, if it contains default value, it is selected_color__default, otherwise it is highlighted selected_color
        if (!selectItems.value.length) {
            return visible.value ? 'selected_color__third' : 'selected_color__default';
        }

        const includeDefault = selectItems.value.some((v: IDataItem) => vals.includes(v.id));

        return includeDefault ? 'selected_color__default' : 'selected_color';
    });
</script>

<style lang="less" scoped>
    .multiple {
        border: 1px solid var(--ibc-primary-color);
        margin: 2px;
        padding: 0 10px;
        border-radius: 4px;
    }

    .selected_color {
        color: var(--ibc-primary-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        //max-width: 118px;
        &__default {
            color: var(--ibc-text-second);
        }
        &__third {
            color: var(--ibc-text-third);
        }
    }
    .selected_info_title {
        max-width: 118px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

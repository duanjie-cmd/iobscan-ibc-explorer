<template>
    <div class="value_txs flex">
        <span
            v-for="(item, index) in CHOOSE_BTN_TEXT"
            :key="item"
            class="value_txs__item cursor"
            :class="{ value_txs__active_btn: defaultChooseBtn === index }"
            @click="changeChooseBtn(index)"
        >
            {{ item }}
        </span>
    </div>
</template>

<script setup lang="ts">
    import { CHOOSE_BTN_TEXT } from '@/constants';
    interface IValueTxs {
        defaultChooseBtn?: number; // Default button index
    }
    withDefaults(defineProps<IValueTxs>(), {
        defaultChooseBtn: 0
    });
    const emits = defineEmits<{
        (e: 'changeChooseBtn', index: number): void;
    }>();
    const changeChooseBtn = (index: number) => {
        emits('changeChooseBtn', index);
    };
</script>

<style lang="less" scoped>
    .value_txs {
        background: #ebedff;
        border-radius: var(--ibc-border-radius-normal);
        &__item {
            display: inline-block;
            padding: 3px 0;
            width: 59px;
            font-size: var(--ibc-font-size-normal);
            font-weight: 400;
            color: rgba(61, 80, 255, 0.5);
            line-height: 18px;
            text-align: center;
        }
        &__active_btn {
            color: var(--ibc-primary-color);
            background: #ffffff;
            border: 1px solid rgba(61, 80, 255, 0.2);
            border-radius: var(--ibc-border-radius-normal);
        }
    }
</style>

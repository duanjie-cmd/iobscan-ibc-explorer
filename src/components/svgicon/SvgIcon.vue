<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName" :fill="color" />
    </svg>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    interface IProps {
        iconName: string;
        classDynamic?: string;
        color?: string;
    }
    const props = withDefaults(defineProps<IProps>(), {
        color: '#3d50ff'
    });
    // Icon name in iconfont
    const iconClassName = computed(() => {
        return `#${props.iconName}`;
    });
    // Add class name to the icon
    const svgClass = computed(() => {
        if (props.classDynamic) {
            return `svg-icon ${props.classDynamic}`;
        }
        return 'svg-icon';
    });
</script>

<style scoped>
    .svg-icon {
        width: 21px;
        height: 24px;
        position: relative;
        fill: currentColor;
        vertical-align: -2px;
        outline: 0;
    }
</style>

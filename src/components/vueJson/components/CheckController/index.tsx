import { defineComponent, computed, PropType } from 'vue';
import './styles.less';

export default defineComponent({
    props: {
        checked: {
            type: Boolean,
            default: false
        },
        isMultiple: Boolean,
        onChange: Function as PropType<(state: boolean) => void>
    },
    emits: ['change', 'update:modelValue'],

    setup(props, { emit }) {
        const uiType = computed(() => (props.isMultiple ? 'checkbox' : 'radio'));

        const model = computed({
            get: (): boolean => props.checked,
            set: (val) => emit('update:modelValue', val)
        });

        return {
            uiType,
            model
        };
    },

    render() {
        const { uiType, model, $emit } = this;

        return (
            <label
                class={['vjs-check-controller', model ? 'is-checked' : '']}
                onClick={(e) => e.stopPropagation()}
            >
                <span class={`vjs-check-controller-inner is-${uiType}`} />
                <input
                    checked={model}
                    class={`vjs-check-controller-original is-${uiType}`}
                    type={uiType}
                    onChange={() => $emit('change', model)}
                />
            </label>
        );
    }
});

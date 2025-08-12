import { App, Directive } from 'vue';

export const imgLoadingDirective: Directive = {
    created(el, binding) {
        if (!binding.arg) {
            el.src = binding.value;
        }
    },
    mounted(el, binding) {
        // Listen to whether it enters the visible area
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
            // If it enters the visible area
            if (isIntersecting) {
                // Assign the image address to the src attribute of the image
                el.src = binding.value;
                // Cancel image monitoring
                observer.unobserve(el);
            }
        });
        if (binding.arg) {
            observer.observe(el);
        }
    }
};

export const imgLoadingDirectiveInstall = (app: App<Element>) => {
    app.directive('lazyload', imgLoadingDirective);
};

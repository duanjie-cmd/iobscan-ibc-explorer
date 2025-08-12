export const injectGtag = () => {
    const url = 'https://www.googletagmanager.com/gtag/js?id=';
    const GID = import.meta.env.VITE_GID;
    const src = url + GID;
    // Set up gtag runtime environment
    const gtagScript: HTMLScriptElement = document.createElement('script');
    gtagScript.src = src;
    document.head.appendChild(gtagScript);

    // Mount gtag method
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag() {
        // eslint-disable-next-line prefer-rest-params
        (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', GID);
};

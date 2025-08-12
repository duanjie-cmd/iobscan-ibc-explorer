export const userSystem = (): string => {
    const ua = window.navigator.userAgent.toLowerCase();
    const testUa = (regexp: RegExp) => regexp.test(ua);

    // System
    let system = 'unknow';
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
        system = 'windows'; // Windows system
    } else if (testUa(/macintosh|macintel/g)) {
        system = 'macos'; // macOS system
    } else if (testUa(/x11/g)) {
        system = 'linux'; // Linux system
    } else if (testUa(/android|adr/g)) {
        system = 'android'; // Android system
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
        system = 'ios'; // iOS system
    }
    return system;
};

export const getIsAndroid = (): boolean => {
    return userSystem() === 'android';
};

export const getIsSafari = (): boolean => {
    return /Safari/.test(window.navigator.userAgent) && !/Chrome/.test(window.navigator.userAgent);
};

export const getIos = () => {
    return userSystem() === 'ios';
};

import { MODES } from './constants';

export interface IDataItem {
    id: TDenom;
    title: TDenom;
    icon?: string;
    disabled?: boolean;
    tooltips?: string;
    doubleTime?: boolean;
    metaData?: any;
    inputFlag?: boolean; // Determine whether it is input or selection, needs to be processed when displayed
}

export type TData = {
    groupName?: string;
    icon?: string;
    tooltips?: string;
    children?: IDataItem[];
}[];

export type TDenom = string | number;

export type TProps = {
    data: TData;
    value?: TDenom | TDenom[];
    mode?: MODES.multiple | MODES.double;
    inputFlag?: boolean;
    placeholder?: string;
    hideIcon?: boolean;
    associateId?: string | number; // When double selection, the value displayed when inputting one value
    badges?: [string, string];
    placeholders?: [string, string];
    inputCtn?: {
        title?: string;
        icon?: string;
        toolTip?: string;
        placeholder?: string;
        btnTxt: string;
    };
};

export type ModeType = TProps['mode'];

export type TUseInit = Pick<TProps, 'mode' | 'data' | 'value' | 'inputFlag'>;

/*************** req ***********************/
export interface IRequestPagination {
    use_count?: boolean;
    page_num: number;
    page_size: number;
}

export interface IRequestPagination2 {
    use_count: boolean;
    page_num: number;
    page_size: number;
}

/*************** res *************************/
export interface IResponse<P = {}> {
    code: number;
    message?: string;
    data: P;
    aa: string;
}

export interface IResponsePageInfo {
    page_num: boolean;
    page_size: number;
    total_item: number;
    total_page: number;
}

export interface IIbcchain {
    chain_id: string;
    chain_name: string;
    icon: string;
}

export interface IIbcChains {
    all?: IIbcchain[];
    active?: IIbcchain[];
    inactive?: IIbcchain[];
}

export interface IBaseDenoms {
    chain_id: string;
    create_at: number;
    denom: string;
    icon: string;
    is_main_token: boolean;
    scale: number;
    symbol: string;
    update_at: number;
}

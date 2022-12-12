// import request, { executeCancel, setExecuteCancel } from '@/utils/axios';
import request from '@/utils/axios';
import requestMock from '@/utils/axiosMock';
import { IResponse } from '@/types/interface/index.interface';
import {
    IRequestAddressTxs,
    IResponseAddressBaseInfo,
    IResponseAddressTxsData,
    IResponseTokenData,
    IResponseAccountData
} from '@/types/interface/address.interface';
import { API_URL, urlReplacePlaceholder, urlReplacePlaceholder2 } from '@/constants/apiUrl';

export const getAddrTokenListAPI = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrTokenList.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return request<IResponse<IResponseTokenData>>({
        url,
        method: 'get'
    });
};

export const getAddrTokenListMock = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrTokenList.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return requestMock<IResponse<IResponseTokenData>>({
        url,
        method: 'get'
    });
};

export const getAddrAccountListAPI = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrAccountToken.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return request<IResponse<IResponseAccountData>>({
        url,
        method: 'get'
    });
};

export const getAddrAccountListMock = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrAccountToken.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return requestMock<IResponse<IResponseAccountData>>({
        url,
        method: 'get'
    });
};

export const getAddrBaseInfoAPI = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrBaseInfo.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return requestMock<IResponse<IResponseAddressBaseInfo>>({
        url,
        method: 'get'
    });
};

export const getAddrTxsAPI = async (params: IRequestAddressTxs) => {
    let url = API_URL.ibcAddrTxs.replace(urlReplacePlaceholder, params.chain);
    url = url.replace(urlReplacePlaceholder2, params.address);
    return requestMock<IResponse<IResponseAddressTxsData | number>>({
        url,
        method: 'get',
        params: params
    });
};

/*
// todo shan 待替换为真实请求
export const getAddrBaseInfoAPI = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrBaseInfo.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return request<IResponse<IResponseAddressBaseInfo>>({
        url,
        method: 'get'
    });
};

export const getAddrTxsAPI = async (params: IRequestAddressTxs) => {
    executeCancel(params.use_count);
    let url = API_URL.ibcAddrTxs.replace(urlReplacePlaceholder, params.chain);
    url = url.replace(urlReplacePlaceholder2, params.address);
    return request<IResponse<IResponseAddressTxsData | number>>({
        url,
        method: 'get',
        params: params,
        cancelToken: setExecuteCancel(params.use_count)
    });
};
*/

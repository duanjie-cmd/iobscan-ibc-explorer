import request from '@/utils/axios';
import requestMock from '@/utils/axiosMock';
import { IResponse } from '@/types/interface/index.interface';
import {
    IResponseTokenData,
    IResponseAccountData,
    IResponseAddressBaseInfo
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

export const getAddressBaseInfoAPI = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrBaseInfo.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return requestMock<IResponse<IResponseAddressBaseInfo>>({
        url,
        method: 'get'
    });
};

/* // todo shan 待替换为真实请求
export const getAddressBaseInfoAPI = async (chain: string, address: string) => {
    let url = API_URL.ibcAddrBaseInfo.replace(urlReplacePlaceholder, chain);
    url = url.replace(urlReplacePlaceholder2, address);
    return request<IResponse<IResponseAddress>>({
        url,
        method: 'get'
    });
}; */
import { ref } from 'vue';
import { HttpHelper } from '../helper/httpHelpers.js';

export type TTokenListParams = {
  base_denom?: string
  chain?: string
  token_type?: 'Authed' | 'Other'

}
export type TIbcTokenListParams = {
  chain?: string
  token_type?: 'Authed' | 'Other' | 'Genesis'
}

export type TBaseParams = {
  use_count: boolean,
  page_num: number
  page_size: number
}

export const baseParams: TBaseParams = {
  use_count: false,
  page_num: 1,
  page_size: 1000 
}


const urlPrefix = import.meta.env.VITE_BASE_GO_API

const getTokenListUrl = `${urlPrefix}/ibc/tokenList`
const getIbcTokenListUrl = (base_denom: string) => `${urlPrefix}/ibc/${base_denom.replace('ibc/', '')}/ibcTokenList`

export const useGetTokenList = () => {
  const list = ref([])
  const total = ref(0)

  const getList = async (params: TTokenListParams = {}) => {
    const result = await HttpHelper.get(getTokenListUrl, { params: { ...baseParams, ...params } })

    const { code, data, message } = result

    if (code === 0) {
      const { items } = data
      list.value = items
      if (!params.chain && !params.base_denom && !params.token_type) {
        total.value = items.length
      }
    } else {
      console.error(message)
    }
  }

  return {
    list,
    total,
    getList
  }
}

export const useGetIbcTokenList = (base_denom: string) => {
  const list = ref([])

  const getList = async (params: TIbcTokenListParams = {}) => {
    const result = await HttpHelper.get(getIbcTokenListUrl(base_denom), { params: { ...baseParams, ...params } })

    const { code, data, message } = result
    if (code === 0) {
      const { items } = data
      list.value = items
    } else {
      console.error(message)
    }
  }

  return {
    list,
    getList
  }
}

import request from '@/util/request';

export function GetGoodsListApi(params) {
    return request({
        url: '/api/public/v1/goods/search',
        method: 'GET',
        params
    })
}

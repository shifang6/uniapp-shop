import request from '@/util/request';

export function GetGoodsDeatilsApi(params) {
    return request({
        url: '/api/public/v1/goods/detail',
        method: 'GET',
        params
    })
}

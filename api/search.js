import request from '@/util/request';

export function searchQueryParams(
    query = '',
    pagenum = 1,
    pagesize = 20,
    cid = null
) {
    return request({
        url: '/api/public/v1/goods/search',
        method: 'GET',
        params: {
            query,
            pagenum,
            pagesize,
            cid
        }
    })
}

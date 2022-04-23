import request from '@/util/request';

export function searchQueryParams(
    query = '',
) {
    return request({
        url: '/api/public/v1/goods/qsearch',
        method: 'GET',
        params: {
            query,
        }
    })
}

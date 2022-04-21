import request from '@/util/request';

//轮播图数据接口
export function GetSwiperApi() {
    return request({

        url: `/api/public/v1/home/swiperdata`,
        method: 'GET',

    })
}
// 栏目列表数据
export function GetTopCatelogApi() {
    return request({
        url: '/api/public/v1/home/catitems',
        method: 'GET'
    })
}

// 获取楼层接口
export function GetFloorDateApi() {
    return request({
        url: '/api/public/v1/home/floordata',
        method: 'GET'
    })
}

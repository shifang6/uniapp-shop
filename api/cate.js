import request from '@/util/request';

// 获取商品的sliderbar
export function GetCategoriesDateApi(){
    return request({
        url:'/api/public/v1/categories',
        method:'GET'
    })
}
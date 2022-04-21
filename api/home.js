import request from '@/util/request';

//资产关联属性查询
export function GetSwiperApi (){
 return request({
  url:`/api/public/v1/home/swiperdata`,
  method: 'GET',
 })
}
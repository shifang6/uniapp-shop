import request from "@/util/request";

export function createdOrderApi(params) {
    return new Promise((succ) =>
        succ({
            message: {
                order_id: 45,
                user_id: 12,
                order_number: "GD20180504000000000045",
                order_price: 0.1,
                order_pay: "0",
                is_send: "否",
                trade_no: "",
                order_fapiao_title: "个人",
                order_fapiao_company: "",
                order_fapiao_content: "",
                consignee_addr: "广州市天河区",
                pay_status: "0",
                create_time: 1525408071,
                update_time: 1525408071,
                order_detail: '[{"goods_id":55578,"goods_name":"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣","goods_price":279,"goods_small_logo":"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg","counts":1,"selectStatus":true}]',
                goods: [{
                    id: 64,
                    order_id: 45,
                    goods_id: 5,
                    goods_price: 15,
                    goods_number: 11,
                    goods_total_price: 15,
                }, ],
            },
            meta: { msg: "创建订单成功", status: 200 },
        })
    );
}

export function PrePaymentApi(order_number) {
    return new Promise((succ) =>
        succ({
            message: {
                pay: {
                    timeStamp: "1525681145",
                    nonceStr: "BkPggorBXZwPGXe3",
                    package: "prepay_id=wx071619042918087bb4c1d3d72999385683",
                    signType: "MD5",
                    paySign: "D1642DEEF1663C8012EDEB9297E1D516",
                },
                order_number: "GD20180507000000000110",
            },
            meta: { msg: "预付订单生成成功", status: 200 },
        })
    );
}

export function CheckPaymentStatus(order_number) {
    return new Promise((succ) =>
        succ(
            // 支付成功
            {
                message: "支付成功",
                meta: { msg: "验证成功", status: 200 },
            }
        )
    );
}

export function PayMentList(type) {
    return request({
        url: "/api/public/v1/my/orders/all",
        method: "GET",
        params: {
            type,
        },
    });
}
$(function (){
    // 判断购物车是否有数据
    if (localStorage.getItem('goods')){
        // 本地存储中购物车的数据
        var goodsData = JSON.parse(localStorage.getItem('goods'));

        // 根据商品code获取数据
        $.ajax({
            url: './data/goods.json',
            type: 'get',
            dataType: 'json',
            success: function (json){
                $.each(goodsData,function (index,item){
                    $.each(json,function (i,obj){
                        if (obj.code == item.code){
                            var goodsDom = `
                            <li>
                                <img src="${obj.imgurl}" alt="">
                                <h5>${obj.title}</h5>
                                <p>${obj.price}</p>
                                <span>${item.num}</span>
                                <b code="${obj.code}">删除</b>
                            </li>`;
                            $('.goodslist').append(goodsDom);
                        }
                    })
                })
            }
        });

        // 删除购物车商品
        $('.goodslist').on('click','li b',function (){
            $(this).parent().remove();//删除对应的节点
            // [{"code":"abc1","num":2},{"code":"abc3","num":1},{"code":"abc4","num":1},{"code":"abc7","num":3}]
            var code = $(this).attr('code');// 'abc3'
            // pop unshift splice(x,1)
            $.each(goodsData,function (index,item){
                // console.log(item);
                if (item.code == code) {
                    goodsData.splice(index,1);//删除本地存储中的数据
                    return false;
                }
            })
            if (goodsData.length > 0) {
                // 更新本地存储中的数据
                localStorage.setItem('goods',JSON.stringify(goodsData));
            } else {
                localStorage.clear();
                var noData = '<li style="line-height:80px;text-align:center;">购物车暂无数据</li>';
                $('.goodslist').append(noData);
            }
        })

    } else{
        var noData = '<li style="line-height:80px;text-align:center;">购物车暂无数据</li>';
        $('.goodslist').append(noData);
    }

})
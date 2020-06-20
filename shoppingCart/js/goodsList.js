$(function (){
    // 进入页面加载数据
    $.ajax({
        url: './data/goods.json',
        type: 'get',
        data: 'type=3',
        dataType: 'json',
        success: function (json){
            $.each(json,function (index,item){
                var goodsDom = 
                '<div class="goods">'+
                    '<img src="'+item.imgurl+'" alt="">'+
                    '<p>'+item.price+'</p>'+
                    '<h3>'+item.title+'</h3>'+
                    '<div code="'+item.code+'">加入购物车</div>'+
                '</div>';
                $('.content').append(goodsDom);
            })
        }
    });

    // 点击加入购物车
    $('.content').on('click','.goods div',function (){
        // 把点击的商品编号记录下来
        // localStorage  key  => value
        //              goods => '{code: ['abc1','abc2','abc1']}'
        //              goods => '[{code:'abc1',num:1},{},{}]'
        if (localStorage.getItem('goods')) {
            var goodsArr = JSON.parse( localStorage.getItem('goods') );
        } else {
            var goodsArr = [];
        }
        // 获取当前点击商品的商品编码
        var code = $(this).attr('code');

        // 记录是否加入过购物车
        var hasCode = false;

        // 遍历数组，判断是否已加入过购物车
        $.each(goodsArr,function (index,item){
            if (item.code === code) {
                item.num++;
                hasCode = true;
            }
        })

        if (!hasCode) {
            goodsArr.push({"code":code,"num":1});
        }

        var strArr = JSON.stringify(goodsArr);
        localStorage.setItem('goods',strArr);

        alert('加入购物车成功');
    })




})
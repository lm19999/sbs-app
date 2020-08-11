$(function(){
    /*----------------------------cake---------------------------------*/
    $.ajax({
        url:'http://localhost:8080/',
        type:"post",
        dataType:"json",
        success:function(res){
            var lists = '';
            for(var i=0;i<res.length;i++){
                var recommend = res[i];
                lists+="<div class=\"list\">"
                lists+="<img src=\"/"+recommend.cake.cakeImg+"\"  onclick=\"getCakeId("+recommend.cake.cakeId+")\">"
                lists+="<div class=\"detail\">"
                lists+="<p onclick=\"getCakeId("+recommend.cake.cakeId+")\">"+recommend.cake.cakeTitle+"</p>"
                lists+=" <span>￥"+recommend.cake.cakePrice+"</span>"
                lists+="<span class=\"iconfont icon-xihuan cakeColor "+recommend.cake.cakeId+"\" onclick=\"cancelCake("+recommend.cake.cakeId+")\"></span>"
                lists+="</div>"
                lists+="</div>"
            }
            $(".recommend1").empty();
            $(".recommend1").html(lists);
        }
    });

    /*----------------------------coffee---------------------------------*/
    $.ajax({
        url:'http://localhost:8080/',
        type:"post",
        dataType:"json",
        success:function(res){
            var lists = '';
            for(var i=0;i<res.length;i++){
                var recommend = res[i];
                lists+="<div class=\"list\">"
                lists+="<img src=\"/"+recommend.coffe.coffeImg+"\"  onclick=\"getCoffeId("+recommend.coffe.coffeId+")\">"
                lists+="<div class=\"detail\">"
                lists+="<p onclick=\"getcoffeId("+recommend.coffe.coffeId+")\">"+recommend.coffe.coffeTitle+"</p>"
                lists+=" <span>￥"+recommend.coffe.coffePrice+"</span>"
                lists+="<span class=\"iconfont icon-xihuan coffeColor "+recommend.coffe.coffeId+"\" onclick=\"cancelCoffe("+recommend.coffe.coffeId+")\"></span>"
                lists+="</div>"
                lists+="</div>"
            }
            $(".recommend2").empty();
            $(".recommend2").html(lists);
        }
    });

   
});

function getCakeId(cakeId){
    window.location.href = "/tea/details.html?cakeId="+cakeId;
}
function getCoffeId(coffeId){
    window.location.href = "/tea/details.html?coffeId="+coffeId;
}


/* function cancelCake(cakeId){
    $.ajax({
        url:"/collect/delCollectCake",
        dataType:"json",
        type:"post",
        data:{
            cakeId:cakeId
        },
        success:function(res){
            if(res != null){
                alert("取消收藏");
                $("."+cakeId+"").removeClass("cakeColor");
            }
        }
    })
}
function cancelCoffe(coffeId){
    $.ajax({
        url:"/collect/delCollectCoffe",
        dataType:"json",
        type:"post",
        data:{
            coffeId:coffeId
        },
        success:function(res){
            alert("取消收藏");
            $("."+coffeId+"").removeClass("coffeColor");
        }
    })
} */



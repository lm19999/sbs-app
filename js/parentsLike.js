$(function(){
    /*----------------------------成长记录---------------------------------*/
    $.ajax({
    	url:'http://localhost:8080/api/growthRecord/parGRCollectList',
    	type:'post',
    	dataType:'json',
    	data:{
    		parId:getParents().parId
    	},
    	success:function(data){
    		console.log(data.data)
			var parLike = data.data
			var likeItem = '';
			for(var i=0; i<parLike.length; i++){
				console.log(parLike[i])
				var recommend = parLike[i];
				likeItem += `
					<div class="list">
						<div class="imageson ${recommend.growthRecord.growthRecordId}3">
							
						</div>
					
						<div class="detail">
							<p onclick="getGrowthRecordId()">`+recommend.growthRecord.growthRecordDescribe+`</p>
							<span class="iconfont iconthumbup-fill LikeColor ${recommend.growthRecord.growthRecordId}" onclick="cancelGRLike(${recommend.growthRecord.growthRecordId})"></span>
						</div>
					</div>
				`
			};
			// 图片循环
			var imgList = (recommend.growthRecord.growthRecordUrl).split("&");
			console.log(imgList)
			var img = imgList.filter(function (s) {
			   return s && s.trim();
			});
			console.log(img)
			$("."+recommend.growthRecord.growthRecordId+3+"").empty();
			for (let tu of img) {
				console.log(tu)
				$("."+recommend.growthRecord.growthRecordId+3+"").append(
					`<img src="http://localhost:8080/upload/${tu}" />`
				);
			}
			
			$(".recommend1").empty();
			$(".recommend1").html(likeItem);
    	}
	
    });

    /*----------------------------校园动态---------------------------------*/

});

function getCakeId(cakeId){
    window.location.href = "/tea/details.html?cakeId="+cakeId;
}
function getCoffeId(coffeId){
    window.location.href = "/tea/details.html?coffeId="+coffeId;
}


function cancelGRLike(growthRecordId){
	if($("."+growthRecordId+"").hasClass("LikeColor")){
		$.ajax({
			url:"http://localhost:8080/api/growthRecord/updateParGRState",
			dataType:"json",
			type:"post",
			data:{
				parId: getParents().parId,
				growthRecordId: growthRecordId,
				collectState: 0
			},
			success:function(res){
				console.log(res)
				alert("取消点赞");
				$.ajax({
					url:"http://localhost:8080/api/growthRecord/updateGrowthRecordCollects",
					type: "POST",
					data: {
						growthRecordId: growthRecordId
					},
					dataType: "JSON",
					success:function(result){
						console.log(result);
					},
				});
			}
		})
		$("."+growthRecordId+"").removeClass("LikeColor");
	}else{
		$.ajax({
		    url:"http://localhost:8080/api/growthRecord/updateParGRState",
		    type: "POST",
		    data: {
				parId: getParents().parId,
		        growthRecordId: growthRecordId,
				collectState: 1
		    },
		    dataType: "JSON",
		    success:function(result){
		        console.log(result)
				$.ajax({
				    url:"http://localhost:8080/api/growthRecord/addGrowthRecordCollects",
				    type: "POST",
				    data: {
				        growthRecordId: growthRecordId
				    },
				    dataType: "JSON",
				    success:function(result){
						console.log(result);
					},
				});
				alert("点赞成功");
		    }
		});
		$("."+growthRecordId+"").addClass("LikeColor");
	}
	
	
}
/* function cancelCoffe(coffeId){
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



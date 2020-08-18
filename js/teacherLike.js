$(function(){
    /*----------------------------成长记录---------------------------------*/
    $.ajax({
    	url:'http://localhost:8080/api/growthRecord/teaGRCollectList',
    	type:'post',
    	dataType:'json',
    	data:{
    		teaNo:getTeacher().teaNo
    	},
    	success:function(data){
    		console.log(data.data)
			var teaLike = data.data
			var likeItem = '';
			for(var i=0; i<teaLike.length; i++){
				console.log(teaLike[i])
				var recommend = teaLike[i];
				
				$(".recommend1").append(
					`
						<div class="list">
						
							<div class="sonleft">
								<div class="sonimg">
									<img src="${recommend.parents.parPortrait}">
								</div>
								<div class="jieshao">
									<span>${recommend.parents.parName}</span>
								</div>
							</div>
							
							<div class="describe">
								<p onclick="getGrowthRecordId()">`+recommend.growthRecord.growthRecordDescribe+`</p>
							</div>
						
							<div class="imageson ${recommend.growthRecord.growthRecordId}3"></div>
								
							
							<div class="detail">
								<div class="dizhi">
									<span class="iconfont iconweizhi"></span>
									<span class="dizhifont">${recommend.growthRecord.growthRecordPosition}</span>
								</div>
								<div class="dzpl">
									<span class="iconfont iconthumbup-fill LikeColor ${recommend.growthRecord.growthRecordId}" onclick="cancelGRLike(${recommend.growthRecord.growthRecordId})"></span>
									<span class="iconfont iconpinglun ${recommend.growthRecord.growthRecordId}2" onclick="obtainGrowthReview(${recommend.growthRecord.growthRecordId})"></span>
								</div>
							</div>
						</div>
					`
				);
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
			};
			
    	}
	
    });

    /*----------------------------校园动态---------------------------------*/

});

//进入详情页
function getCakeId(cakeId){
    window.location.href = "/tea/details.html?cakeId="+cakeId;
}
function getCoffeId(coffeId){
    window.location.href = "/tea/details.html?coffeId="+coffeId;
}


function cancelGRLike(growthRecordId){
	//取消点赞
	if($("."+growthRecordId+"").hasClass("LikeColor")){
		$.ajax({
			url:"http://localhost:8080/api/growthRecord/updateTeaGRState",
			dataType:"json",
			type:"post",
			data:{
				teaNo:getTeacher().teaNo,
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
		//点赞
		$.ajax({
		    url:"http://localhost:8080/api/growthRecord/updateTeaGRState",
		    type: "POST",
		    data: {
				teaNo:getTeacher().teaNo,
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


function obtainGrowthReview(growthRecordId){
	window.location.href="forumReview.html?growthRecordId="+growthRecordId;
}
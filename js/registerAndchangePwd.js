//手机号验证
	function isIpone(ipone) {
	　　var reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))[0-9]{8}$/;
	　　if(ipone != "") {
	　　　　if(reg.test(ipone) === false) {
	　　　　　　alert("手机号输入不合法");
	　　　　　　return false;
	　　　　}
	　　}else{
	　　　　alert("手机号不能为空");
	　　　　return false;
	　　}
	　　　　return true;
	}
	
	/**
	* 点击获取验证码后显示倒数时间
	*/
	var wait = 60;// 定义短信发送倒计时时间
	function time(){
	　　document.getElementById('getCode').disabled = false; //让按钮可以点击
	　　if(wait == 0) {
	　　　　document.getElementById('getCode').removeAttribute("disabled"); // 控制按钮可点击
	　　　　document.getElementById('getCode').value = "获取验证码";
	　　　　document.getElementById('getCode').style.color = '#2C8FFF';
	　　　　wait = 60; //还原倒计时
	　　}else{
	　　　　document.getElementById('getCode').setAttribute("disabled", true);//控制按钮不可点击
	　　　　document.getElementById('getCode').value = "重新发送(" + wait + ")";
	　　　　document.getElementById('getCode').style.color = '#C0BBBB';
	　　　　wait--;
	　　　　setTimeout('time()', 1000) //循环调用
	　　}
	};
window.onload = function() {
	var nav = document.getElementById('nav');
	var oNav = nav.getElementsByTagName('li');

	var container = document.getElementById('container');
	var oDiv = container.getElementsByClassName('tab');

	for (var i = 0; i < oNav.length; i++) {
		oNav[i].index = i;
		oNav[i].onclick = function() {
			for (var i = 0; i < oNav.length; i++) {
				oNav[i].className = '';
				oDiv[i].style.display = "none";
			}
			this.className = 'act';
			oDiv[this.index].style.display = "block"
		}
		for (var m = 1; m < oNav.length; m++) {
			oNav[m].className = '';
			oDiv[m].style.display = "none";
		}
	}
};
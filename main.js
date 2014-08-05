$(document).ready(function(){
//初始化
var score = 0,
time,
level=1,
intv,
pause =false,
width = $('body').width()*0.9,
right,
now=[],
over = false,
tmp_time;

//函数定义
var init = function(){
	$('title').html('语无伦次');
	$('.container').height(width);
	$('#game').show();
	$('#cover').hide();
	$('#end').hide();
	$('#mask').hide();
	$('#time').html(60);
	$('#score').html(0);
	if(intv){
		window.clearInterval(intv);
	}
	score = 0;
	time = 60;
	level = 0;
	pause = false;
	count();
	upgrade();
};

var disorder = function(s){
	var ar = s.split(''),
	l =ar.length,
	target = [];
	for(var i=0;i<l;i++){
		var index = parseInt(Math.random()*ar.length);
		target.push(ar[index]);
		ar.splice(index,1);
	}
	return target;
}

var getlang = function(ar){
	var index = parseInt(Math.random()*ar.length);
	return ar[index];
}

var upgrade = function(){
	tmp_time = time;
	now = [];
	score+=level;
	if(level == 11){
		time=1;
		return;
	}
	$('#score').html(score);
	$('.container').empty();
	$('.result').empty();
	right = getlang(lang[level]);
	var ar = disorder(right),
	l  = ar.length,
	n  = Math.sqrt(l),
	h   = width/n;
	for (var i = 0; i < l; i++) {
		var div = $("<div class='son' data-value="+ar[i]+">"+ar[i]+'</div>').css({'width':h,'height':h,'line-height':h+'px'})
		$('.container').append(div);
	}
	level++;
};

var count = function(){
	intv = self.setInterval(function(){
		if(!pause){
			time--;
			$('#time').html(time);
			if(time<=0){
				over  = true;
				$('#game').hide();
				$('#end').show();
				$('#end_score').html(score);

				if(score<20){
					$('title').html('在我语伦无次得了获'+score+'分！大概我的语文是育体老师的吧教');
					$('.hehe').html('大概我的语文是育体老师的吧教');
				}else if(score<40){
					$('title').html('我在语无伦次或得了'+score+'分！我要和周董比说话！');
					$('.hehe').html('我要和周董比说话！');
				}else if(score <60){
					$('title').html('我在语无伦次或得了'+score+'分！我是要成为说话王的男人！');
					$('.hehe').html('我是要成为说话王的男人！');
				}else{
					$('title').html('我在语无伦次或得了'+score+'分！没错，我就是传说中的说话王！');
					$('.hehe').html('没错，我就是传说中的说话王！');
				}
				window.clearInterval(intv);
			}	

		}
	},1000);
};

tappable('#again',function(){
	init();
})

tappable('#reload',function(){
	init();
})


tappable('#go',function(){
	$('#cover').hide();
	$('#game').show();
	init();
})

tappable('#pause',function(){
	pause = true;
	$('#mask').fadeIn('fast');
})

tappable('#goon',function(){
	pause = false;
	$('#mask').fadeOut('fast');
})

tappable('.container .son', function(e,target){
	var _this = $(target),
	value = _this.html(),
	result = $('#result');

	_this.addClass('shadow');

	if(now.indexOf(value) == -1){
		now.push(value);
		var ele = $("<div class='son'>"+value+"</div>");
		result.append(ele);
	}
	if(now.join('') == right){
		//奖励时间逻辑
		var reward = 0;
		if(level <= 4){
			if(tmp_time - time  <= 2){
				reward = 3;
			}
		}else if(level <=7){
			if(tmp_time - time <= 6){
				reward = 10;
			}
		}else{
			if(tmp_time - time <= 10){
				reward = 15;
			}
		}
		if(reward != 0){
			$('#add').html('+'+reward).slideDown();
			time+=reward;
			setTimeout(function(argument) {
				$('#add').slideUp();
			},2000);
		}

		upgrade();
	}else if(now.join('').length == right.length){
		$('#result').addClass('shake');
		setTimeout(function(){
			$('#result').removeClass('shake');
		}, 1000);
	}
});

tappable('.result',function(){
	var last = $('.result div').last();
	if(last.length>0){
		var value = last.html();
		now.pop();
		$(".container .son[data-value='"+value+"']").removeClass('shadow');
		last.remove();
	}
})

tappable('.close',function(){
	var last = $('.result div').last();
	if(last.length>0){
		var value = last.html();
		now.pop();
		$(".container .son[data-value='"+value+"']").removeClass('shadow');
		last.remove();
	}
})

})
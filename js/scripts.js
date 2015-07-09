var scrollController;
var scenes, tweens;
var screenMaxWidth;
var resizeTimeout;
var scrollController;
var initialized = [];
var currentTrigger = -1;
var prevPos = 0;


var init = function(){
	screenMaxWidth = Math.round($(window).height()*1.667);
	$("#phoneBt1").width(screenMaxWidth*0.09);
	$('.trigger').height($(window).height()*0.7);
	$('.triggerHolder').height($('.trigger').length*($(window).height()*0.7));
	$("#hand, #smartphone").width(screenMaxWidth);
	
	
	scenes = [];
	tweens = [];
	
	scrollController = new ScrollMagic.Controller({insertIndicators: true});
	
	// sequência de animações ativadas no scroll
	// cada um dos tweens[i] é ativado pelo "trigger"
	// correspondente no html
	tweens[0] = new TimelineMax();
	tweens[0].insert(TweenMax.to(".contentBlock", 0.1, {autoAlpha:0}),0);
	tweens[0].insert(TweenMax.to("#featureMenu, #featureSwitch, #phoneExtras", 0.1, {autoAlpha:0}), 0);
	tweens[0].insert(TweenMax.to("#scr1", 0.1, {x:0, autoAlpha: 1}),0);
	tweens[0].insert(TweenMax.to("#bgVideo1", 0.5, {scale:1}),0);
					
	tweens[1] = new TimelineMax()
	tweens[1].insert(TweenMax.to(".contentBlock", 0.1, {autoAlpha:0}), 0);
	tweens[1].insert(TweenMax.to("#hand", 0, {autoAlpha:1}),0);
	tweens[1].insert(TweenMax.fromTo("#scr1 #seta", 0.5, {autoAlpha: 1}, {autoAlpha: 0}),0); // vinicius
	tweens[1].insert(TweenMax.fromTo("#scr1 h1", 0.5, {x:0, autoAlpha: 1}, {x:-200, autoAlpha: 0}),0); // vinicius
	tweens[1].insert(TweenMax.fromTo("#scr1 #logo img", 0.5, {x:0, autoAlpha: 1}, {x:+200, autoAlpha: 0}),0); // vinicius
	tweens[1].insert(TweenMax.fromTo("#label-publieditorial", 0.5, {autoAlpha: 1}, {autoAlpha: 0}),0); // vinicius
	tweens[1].insert(TweenMax.fromTo("#phoneBt1", 0.1, {autoAlpha:0}, {autoAlpha:1}),0);
	tweens[1].insert(TweenMax.fromTo("#smartphone img", 1, {height: "2000%"}, {height:"100%", "transform-origin": "50% 50%", ease:Linear.easeNone}),0.3);
	tweens[1].insert(TweenMax.fromTo("#hand img", 1, {height: "2000%"}, {height:"100%", "transform-origin": "50% 50%", ease:Linear.easeNone}),0.3);
	tweens[1].insert(TweenMax.fromTo("#background", 0.3, {width:"100%"}, {width:screenMaxWidth, "transform-origin": "50% 50%", ease:Linear.easeNone}),0);
	tweens[1].insert(TweenMax.fromTo("#bgVideo1", 0.3, {width:"100%"},{width:screenMaxWidth*0.14, "transform-origin": "50% 50%", ease:Linear.easeNone, delay:1}),0);
	tweens[1].insert(TweenMax.fromTo("#bgVideo1", 0.1, {top:"50%", height: "100%"}, {top:"49%", height:"40%", "transform-origin": "50% 50%", ease:Linear.easeNone, delay:1.2}),0);
	tweens[1].insert(TweenMax.to("#scr2, #scr2 p", 1, {autoAlpha:1}), 1);
	
	//tweens[1].insert(TweenMax.to("#featureMenu, #featureSwitch, #phoneExtras", 0.1, {autoAlpha:0}), 0);
	
	tweens[2] = new TimelineMax();
	tweens[2].insert(TweenMax.set("#featureMenu, #featureSwitch, #phoneExtras", {autoAlpha:0}), 0);
	tweens[2].insert(TweenMax.fromTo("#scr1", 0.1, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.fromTo("#bgVideo1", 0.5, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.fromTo("#hand", 1, {autoAlpha:1}, {autoAlpha:0}),0);
	tweens[2].insert(TweenMax.fromTo("#scr2", 0.5, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.fromTo("#phoneBt1", 0.2, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.to(".contentBlock", 0.1, {autoAlpha:0}),0);
	
	
	tweens[3] = new TimelineMax()
		.to(".contentBlock", 0.01, {autoAlpha:0})
		.to("#featureMenu, #featureSwitch, #phoneExtras", 0.1, {autoAlpha:0})
		.fromTo("#phoneParts", 0.2, {width: "4%", autoAlpha:0}, {width: "4%", autoAlpha:1})
		.fromTo("#background", 0.2, {autoAlpha:1}, {autoAlpha:0}, "-=0.2")
		.fromTo("#phoneBack", 1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"}, 
			{scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "16%"})
		.fromTo("#phoneBoard", 1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"}, 
			{scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "15%"}, "-=1")
		.fromTo("#phoneFront", 1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"}, 
			{ scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "14%"}, "-=1")
		.fromTo("#phoneScreen", 1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"}, 
			{scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "14%"}, "-=1")
		.fromTo("#phoneNav1, #phoneNav5", 1, {autoAlpha:0, left: "43%", skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "-2%"}, 
			{autoAlpha:0,scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "14%"}, "-=1")
		.fromTo("#phoneNav2", 1, {autoAlpha:0, left: "43%", scaleY: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "-2%"}, 
			{autoAlpha:0,scaleX: 0.75, scaleY: 0.94, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", left: "42.5%", y:-4, top: "15%"}, "-=1")
		.fromTo("#phoneNav4", 1, {autoAlpha:0, left: "43%", scaleY: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "-2%"}, 
			{autoAlpha:0,scaleX: 0.75, scaleY: 0.83, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", left: "42.7%", y:-4, top: "15%"}, "-=1")
		.fromTo("#phoneSnapdragon", 1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"},
			{scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "15%"}, "-=1")
		.fromTo("#phoneProcessor", 1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"},
			{scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "15%"}, "-=1");
		tweens[3].insert(TweenMax.set("#featureMenu, #featureSwitch, #phoneExtras", {autoAlpha:0}));
		//tweens[3].insert(TweenMax.set(".contentBlock", {autoAlpha:0}));
		
	tweens[4] = new TimelineMax()
		.to(".contentBlock", 0.05, {autoAlpha:0})
		.to("#phoneBack", 1, {top: "25%"}, "-=0.2")
		.to("#phoneBoard", 1, {top: "15%"}, "-=1")
		.to("#phoneFront", 1, {top: "5%", alpha:0.8}, "-=1")
		.to("#phoneScreen", 1, {top: "-5%", alpha:0.65}, "-=1")
		.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 1, {top: "-5%"}, "-=1")
		.to("#phoneSnapdragon", 1, {top: "15%"}, "-=1")
		.to("#phoneProcessor", 1, {top: "15%"}, "-=1")
		.to(".contentBlock", 0.05, {autoAlpha:0});
		//tweens[4].insert(TweenMax.set("#featureMenu, #featureSwitch, #phoneExtras", {autoAlpha:0}), 0);
	
	// como essas partes são meio repetidas usei
	// um loop for para criar as animações
	for(var i=5; i< 12; i++){
		
		tweens[i] = new TimelineMax();

			if(i!=5){
				tweens[i].insert(TweenMax.to("#scr"+(i-3), 0.1, {x:40, autoAlpha: 0}), 0);
			}
			tweens[i].insert(TweenMax.to("#featureMenu, #featureSwitch, #featureSwitch p", 0.1, {autoAlpha:1}),0);
			tweens[i].insert(TweenMax.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5, #phoneExtras div", 0.05, {autoAlpha:0}), 0);
			tweens[i].insert(TweenMax.to("#scr"+(i-2)+", #scr"+(i-2)+" p", 0.1, {autoAlpha: 1}), 0.1);

			tweens[i].insert(TweenMax.to("#phoneExtras", 0.1, {autoAlpha:1}), 0);
			tweens[i].insert(TweenMax.to("#icon"+(i-4), 0.1, {autoAlpha:1}), 0);

			if($("#phoneNav"+(i-4)).length){
				tweens[i].insert(TweenMax.to("#phoneNav"+(i-4), 0.1, {autoAlpha:1}), 0);
			}
			//tweens[i].insert(TweenMax.to(".contentBlock:not(#scr10, #scr11)", 0.1, {autoAlpha:0}),0);
	}
		
	tweens[12] = new TimelineMax();
		tweens[12].insert(TweenMax.to("#featureMenu, #featureSwitch, #phoneExtras", 0.2, {autoAlpha:0}), 0);
		tweens[12].insert(TweenMax.to(".contentBlock:not(#scr10, #scr11)", 0.1, {autoAlpha:0}),0);
		tweens[12].insert(TweenMax.to("#scr9", 0.4, {autoAlpha:0}), 0);
		tweens[12].insert(TweenMax.to("#phoneExtras", 0.2, {autoAlpha:0}), 0);
		tweens[12].insert(TweenMax.fromTo("#phoneBack", 1, {top: "25%"}, {top: "16%"}), 0);
		tweens[12].insert(TweenMax.fromTo("#phoneBoard", 1, {top: "15%"}, {top: "15%"}), 0);
		tweens[12].insert(TweenMax.fromTo("#phoneFront", 1, {top: "5%"}, {top: "14%", alpha:1}), 0);
		tweens[12].insert(TweenMax.fromTo("#phoneScreen", 1, {top: "-5%"}, {top: "14%", alpha:1}), 0);
		tweens[12].insert(TweenMax.fromTo("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 0.1, {top: "-5%"}, {autoAlpha:0, top: "14%"}), 0);
		tweens[12].insert(TweenMax.fromTo("#phoneSnapdragon", 1, {top: "15%"}, {top: "15%"}), 0);
		tweens[12].insert(TweenMax.fromTo("#phoneProcessor", 1, {top: "15%"}, {top: "15%"}), 0);
		tweens[12].insert(TweenMax.fromTo("#scr10 p", 0.2, {autoAlpha: 0}, {autoAlpha: 1}),0);
		tweens[12].insert(TweenMax.to("#scr11, #scr11 p", 0.1, {autoAlpha: 1}), 0);
		tweens[12].insert(TweenMax.fromTo("#scr10", 1, {y:$(window).height()}, {y:0, autoAlpha: 1}), 0);


		tweens[13] = new TimelineMax();
		//tweens[13].insert(TweenMax.to(".contentBlock:not(#scr10, #scr11)", 0.1, {autoAlpha:0}),0);
		tweens[13].insert(TweenMax.set("#featureMenu, #featureSwitch, #phoneExtras", {autoAlpha:0}));
		//tweens[13].insert(TweenMax.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 0.2, {autoAlpha:0}));
		tweens[13].insert(TweenMax.to("#scr11, #scr11 p", 0.1, {autoAlpha: 1}),0);
		//tweens[13].insert(TweenMax.to("#scr10", 1, {autoAlpha:1}),0);
		tweens[13].insert(TweenMax.fromTo("#scr10", 1, {y:0}, {y:-$(window).height()}),0);
		tweens[13].insert(TweenMax.fromTo("#scr11", 1, {y:$(window).height()}, {y:0}),0);
		//
		
		
		tweens[14] = new TimelineMax();
		tweens[14].insert(TweenMax.set("#featureMenu, #featureSwitch, #phoneExtras", {autoAlpha:0}));
		//tweens[14].insert(TweenMax.set(".contentBlock:not(#scr10,#scr11)", {autoAlpha:0}));
		//tweens[14].insert(TweenMax.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 0.2, {autoAlpha:0, delay:0.5}));
		tweens[14].insert(TweenMax.to("#scr11", 0.5, {y:-($(window).height()/2), autoAlpha:1}));
		

	for(var i=0; i< tweens.length; i++){
		var tw = tweens[i];
		var sceneDuration = $("#trigger"+(i+1)).height()-50;

		scenes[i] = new ScrollMagic.Scene({
			triggerElement:"#trigger"+(i+1),
			duration:sceneDuration/*,
			tweenChanges:true*/})
			.setTween(tw);

		scenes[i].addTo(scrollController);
		scenes[i].on("progress", function (e) {
		    //var time = (e.progress * tw.duration());
		   	//tw.pause(time);
		    //console.log(scrollController.scrollPos());//tw.totalProgress());
			
		});
		scenes[i].on("enter", function(){
			var i = scenes.indexOf(this);
			
			if(i >=5 && i<=12){
				$("#featureMenu ul li a").removeClass("selected");
				$("#nav"+(i-4)).addClass("selected");
			}

			
		});
		
	}
	
	initSwitch();
	initNav();
	
	

	TweenMax.set('.contentBlock, .contentBlock p, #phoneExtras, #phoneParts, #featureMenu, #featureSwitch, #featureSwitch p, #phoneBt1', {autoAlpha:0});
	TweenMax.set('#scr1,#scr2,#scr3,#scr4,#scr5,#scr6,#scr7,#scr8,#scr9,#scr10, #scr11', {autoAlpha:0});
	TweenMax.set("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5, #phoneExtras div", {autoAlpha:0});
	TweenMax.set('#scr1', {autoAlpha:1});

	$(".text-g, .extra-g").hide();
	TweenMax.set(".text-s, .extra-s", {autoAlpha:1});
	TweenMax.set(".text-g, .extra-g", {autoAlpha:0});
	
	$("body").show();
	TweenMax.fromTo("body", 1, {autoAlpha:0}, {autoAlpha:1, delay: 1, onStart:function(){
		//initParticles();
		$('body').scrollTop(0); 
		scrollController.scrollPos(0);
		TweenMax.set('.contentBlock, .contentBlock p, #phoneExtras, #phoneParts, #featureMenu, #featureSwitch, #featureSwitch p, #phoneBt1', {autoAlpha:0});
		TweenMax.set("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5, #phoneExtras div", {autoAlpha:0});
		TweenMax.set('#scr1', {autoAlpha:1});
	}, onComplete:function(){
		$('#introMovie').get(0).play();
		scrollController.scrollPos(0);
		TweenMax.set('.contentBlock, .contentBlock p, #phoneExtras, #phoneParts, #featureMenu, #featureSwitch, #featureSwitch p, #phoneBt1', {autoAlpha:0});
		TweenMax.set("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5, #phoneExtras div", {autoAlpha:0});
		TweenMax.set('#scr1', {autoAlpha:1});
		TweenMax.set("#particles", {autoAlpha:0});
	}});
	scrollController.scrollPos(0);
	//$('body').scrollTop(20); 
	//$('#navItem1').trigger('click');
}

var initParticles = function(){
	/*$("#particles").particleground({
		dotColor: "#333333",
		lineColor: "#333333",
		density: 100,
		maxSpeedX: 0.2,
		maxSpeedY: 0.2,
		parallax: false
	});	*/
}

var initNav = function(){

	// change behaviour of controller to animate scroll instead of jump
	scrollController.scrollTo(function (newpos) {
		TweenMax.to(window, 1, {scrollTo: {y: newpos}});
	});
	$(document).on("click", "a[href^='#']", function (e) {
		TweenMax.to(".contentBlock:not(#scr10, #scr11)", 0.1, {autoAlpha:0});
		var id = $(this).attr("href");

		if ($(id).length > 0) {
			e.preventDefault();
			scrollController.scrollTo(id/*, forca*/);
			$("#audio").trigger('pause');
			$("#audio").prop("currentTime",0);
			$("#video-video").get(0).pause();
			$("#video-game").get(0).pause();

			// update the URL
			/*
			if (window.history && window.history.pushState) {
				history.pushState("", document.title, id);
			}*/
		}
	});	

	$(document).on("scroll", function (e) {
		var currPos = $(document).scrollTop();
		if(currPos < $("#trigger1").offset().top+20){
			TweenMax.to(".contentBlock:not(#scr1)", 0.05, {autoAlpha:0});
			TweenMax.to("#scr1", 0.05, {autoAlpha:1});
		}else if(currPos < $("#trigger2").offset().top+20){
			TweenMax.to(".contentBlock:not(#scr1, #scr2)", 0.05, {autoAlpha:0});
			TweenMax.to("#scr2", 0.05, {autoAlpha:1});
		}

		//console.log(currPos);
		for(var i=0; i<$(".trigger").length; i++){
			var tId = $(".trigger").eq(i).prop("id");
			//console.log($(".trigger").eq(i).offset().top);

			if(currPos >= prevPos){// is scrolling down
				if(	i > currentTrigger && 
					( currPos >= $(".trigger").eq(i).offset().top-15 && currPos < $(".trigger").eq(i).offset().top+15) &&
					( i < $(".trigger").length-1 || currPos < $(".trigger").eq(i+1).offset().top+15) ) {
						currentTrigger = i;
						break;
				}
			}else{// is scrolling up
				if(	i < currentTrigger && 
					(currPos >= $(".trigger").eq(i).offset().top-15 && currPos < $(".trigger").eq(i).offset().top+15) &&
					( i < $(".trigger").length-1 || currPos < $(".trigger").eq(i+1).offset().top+15) ) {
						currentTrigger = i;
						break;
				}
			}
		}

		prevPos = currPos;

		//quando parar o scroll
		clearTimeout($.data(this, 'scrollTimer'));
	    $.data(this, 'scrollTimer', setTimeout(function() {
	    	console.log(currentTrigger);
	    	// coloque os trackers do analytics
	        	if(currentTrigger == 0){
					
				} else if(currentTrigger == 1){

				} else if(currentTrigger == 2){
					// tela 'conheça'
					_gaq.push(['_trackEvent', 'troca-tela', '1', '',0,true]);
					
				} else if(currentTrigger == 3){
					
				} else if(currentTrigger == 4){
					
				} else if(currentTrigger == 5){
					
					// tela 'atributos celular explodido'
					_gaq.push(['_trackEvent', 'troca-tela', '2', '',0,true]);
					// atributo
					if($('body').hasClass('generico')) {
						_gaq.push(['_trackEvent', 'conheca', 'conectividade', 'snapdragon']);
					} else {
						_gaq.push(['_trackEvent', 'conheca', 'conectividade', 'outras marcas']);
					}
					
				} else if(currentTrigger == 6){
					
					// atributo
					if($('body').hasClass('generico')) { 
						_gaq.push(['_trackEvent', 'conheca', 'games', 'snapdragon']);
					} else {
						_gaq.push(['_trackEvent', 'conheca', 'games', 'outras marcas']);
					}
				} else if(currentTrigger == 7){
					
					// atributo
					if($('body').hasClass('generico')) { 
						_gaq.push(['_trackEvent', 'conheca', 'apps', 'snapdragon']);
					} else {
						_gaq.push(['_trackEvent', 'conheca', 'apps', 'outras marcas']);
					}
					
				} else if(currentTrigger == 8){
					// atributo
					if($('body').hasClass('generico')) { 
						_gaq.push(['_trackEvent', 'conheca', 'video', 'snapdragon']);
					} else {
						_gaq.push(['_trackEvent', 'conheca', 'video', 'outras marcas']);	
					}
					
				} else if(currentTrigger == 9){
					
					// atributo
					if($('body').hasClass('generico')) { 
						_gaq.push(['_trackEvent', 'conheca', 'fotos', 'snapdragon']);
					} else {
						_gaq.push(['_trackEvent', 'conheca', 'fotos', 'outras marcas']);
					}
					
				} else if(currentTrigger == 10){
					
					// atributo
					if($('body').hasClass('generico')) { 
						_gaq.push(['_trackEvent', 'conheca', 'audio', 'snapdragon']);
					} else {
						_gaq.push(['_trackEvent', 'conheca', 'audio', 'outras marcas']);
					}
					
				} else if(currentTrigger == 11){
					
					// atributo
					if($('body').hasClass('generico')) { 
						_gaq.push(['_trackEvent', 'conheca', 'bateria', 'snapdragon']);
					} else {
						_gaq.push(['_trackEvent', 'conheca', 'bateria', 'outras marcas']);
					}
				} else if(currentTrigger == 12){
					
				} else if(currentTrigger == 13){
					
					// tela 'video 30s'
					_gaq.push(['_trackEvent', 'troca-tela', '3', '',0,true]);
					
				} else if(currentTrigger == 14){
					// tela 'compartilhe'
				    _gaq.push(['_trackEvent', 'troca-tela', '4', '',0,true]);
				}

				if($(window).scrollTop() + $(window).height() == $(document).height()) {
				       // chegou ao final do página
				    _gaq.push(['_trackEvent', 'final', 'final']);
				}



				// toca o video de games no ponto certo
				if(currentTrigger == 7){
					if(!$('body').hasClass('generico')) {
						$("#video-game").get(0).play();
					}else{
						$("#video-game").get(0).pause();
					}

				}else{
					$("#video-game").get(0).pause();
				}

				// toca o video de games no ponto certo
				
				if(currPos >= $("#trigger10").offset().top && currPos < $("#trigger11").offset().top-10){
					if(!$('body').hasClass('generico')) {
						$("#video-video").get(0).play();
					}else{
						$("#video-video").get(0).pause();
					}
				}else{
					$("#video-video").get(0).pause();
				}

				// toca o video no ponto certo
				if(currPos >= $("#trigger11").offset().top-20 && currPos <= $("#trigger12").offset().top+20 ){
					if(!$('body').hasClass('generico')) {
						$("#audio").trigger('play');
					}else{
						$("#audio").trigger('pause');
					$("#audio").prop("currentTime",0);
					}
				}else{
					$("#audio").trigger('pause');
					$("#audio").prop("currentTime",0);
				}
				// esconde feature menus se não estiver no celular explodido
				if(currentTrigger > 5 && currentTrigger < 12 && $(".trigger").eq(currentTrigger).length > 0 && 
						currPos >= $(".trigger").eq(currentTrigger).offset().top-5 &&
						currPos < $(".trigger").eq(currentTrigger).offset().top+5 ){
					
					TweenMax.set("#phoneExtras div", {autoAlpha:0});
					TweenMax.set("#icon"+(currentTrigger-5), {autoAlpha:1});
					TweenMax.set(".contentBlock:not(#scr"+(currentTrigger-3)+")", {autoAlpha:0});
					TweenMax.to("#featureMenu, #featureSwitch", 0.05, {autoAlpha:1});
					TweenMax.set("#scr"+(currentTrigger-3), {autoAlpha:1});

					if($("#phoneNav"+(currentTrigger-4)).length){
						TweenMax.set("#phoneNav"+(currentTrigger-4), {autoAlpha:1});
					}
				}
				/*else if(currPos < $("#trigger1").offset().top+20){
					TweenMax.to(".contentBlock:not(#scr1)", 0.05, {autoAlpha:0});
					TweenMax.to("#scr1", 0.05, {autoAlpha:1});
				}else if(currPos < $("#trigger2").offset().top+20){
					TweenMax.to(".contentBlock:not(#scr1, #scr2)", 0.05, {autoAlpha:0});
					TweenMax.to("#scr2", 0.05, {autoAlpha:1});
				}*/

				// marca as bolinhas de navegação
				
				if(currentTrigger ==0){
					$("#bullets ul li a").removeClass("selected");
					$("#navItem1").addClass("selected");
				}else if(currentTrigger >=1 && currentTrigger < 11){
					$("#bullets ul li a").removeClass("selected");
					$("#navItem2").addClass("selected");
				}else if(currentTrigger >=11&& currentTrigger <= 13){
					$("#bullets ul li a").removeClass("selected");
					$("#navItem3").addClass("selected");
				}else if(currentTrigger > 13){
					$("#bullets ul li a").removeClass("selected");
					$("#navItem4").addClass("selected");
				}
	    }, 350));
		
	});	
}

function changeAttributes() {
	if ($('#seletor:checkbox').is(':checked')) {
		$('body').addClass('generico');
		TweenMax.to(".text-s, .extra-s", 0.2, {autoAlpha:0, ease:Strong.easeOut, onComplete: function(){
			$(".text-s, .extra-s").hide();
			$(".text-g, .extra-g").show();
			TweenMax.to(".text-g, .extra-g", 0.4, {autoAlpha:1});	
		}});
		$("#audio").trigger('pause');
		$("#audio").prop("currentTime",0);
		$("#video-video").get(0).pause();
		$("#video-game").get(0).pause();
	} else {
		$('body').removeClass('generico');
		TweenMax.to(".text-g, .extra-g", 0.2, {autoAlpha:0, ease:Strong.easeOut, onComplete: function(){
			$(".text-g, .extra-g").hide();
			$(".text-s, .extra-s").show();
			TweenMax.to(".text-s, .extra-s", 0.4, {autoAlpha:1});	
		}});
	}
}


var initSwitch = function(){
	$('#seletorWrap a').click(function(e) {
		e.preventDefault();
		if ($(this).data('target') == 'snap') {
			$('#seletor').prop('checked', false);
		} else {
			$('#seletor').prop('checked', true);
			/*$('#video-video').get(0).pause();
			$('#game-video').get(0).pause();
			$("#audio").trigger('pause');
			$("#audio").prop("currentTime",0);*/
		}
		changeAttributes();
	});	
	
	$('#seletor:checkbox').change(function() {
		changeAttributes();
	});
}

var onWindowResize = function(event){
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function(){
		
		window.location = 'index.html';
		
	}, 400);
	
}

/* share vinicius */

var ShareController = function(){
  
  var $this = this;
  var urlToShare = $('meta[property="og:url"]').attr('content');
  
  $('.btFbShare').sharrre({
    share: {
      facebook: true
    },
    enableHover: false,
    enableTracking: true,
    template: '<span>{total}</span>',
    url: urlToShare,
    click: function(api, options){
      //api.simulateClick();
      api.openPopup('facebook');
    }
  });
  $('.btTwitterShare').sharrre({
    share: {
      twitter: true
    },
    enableHover: false,
    enableTracking: true,
    template: '<span>{total}</span>',
    url: urlToShare,
    click: function(api, options){
      api.openPopup('twitter');
    }
  });
}


$(document).ready(function(e) {
	init();
	

	ShareController(); // vinicius
	$(window).bind('resize', onWindowResize);

	
});

$(window).load(function() {
	$('#bullets a').removeClass('selected');
	/*$('#bullets a').click(function() {
		$('#bullets a').removeClass('selected');
		$(this).insertClass('selected');
	});*/
	//$('#introMovie').get(0).play();
});
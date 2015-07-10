var scrollController;
var scenes, tweens;
var screenMaxWidth;
var resizeTimeout;
var scrollController;
var initialized = [];
var currentTrigger = -1;
var prevPos = 0;
var currPos = 0;

var $videogame    = $("#video-game");
var $videovideo   = $("#video-video");
var $audio        = $("#audio");



var init = function(){
	screenMaxWidth = Math.round($(window).height()*1.667);
	$("#phoneBt1").width(screenMaxWidth*0.09);
	$('.trigger').height($(window).height()*0.7);
	$('.triggerHolder').height($('.trigger').length*($(window).height()*0.7));
	$("#hand, #smartphone").width(screenMaxWidth);
	$("#featureMenu, #featureSwitch, #featureSwitch p").hide();
	
	
	scenes = [];
	tweens = [];
	
	scrollController = new ScrollMagic.Controller({insertIndicators: true});
	
	// sequência de animações ativadas no scroll
	// cada um dos tweens[i] é ativado pelo "trigger"
	// correspondente no html
	tweens[0] = new TimelineMax();
	tweens[0].insert(TweenMax.to(".contentBlock", 0.1, {autoAlpha:0}),0);
	// tweens[0].insert(TweenMax.to("#featureMenu, #featureSwitch", 0.01, {autoAlpha:0}), 0);
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
	// tweens[1].insert(TweenMax.to("#scr2, #scr2 p", 1, {autoAlpha:1}), 1);
	
	//tweens[1].insert(TweenMax.to("#featureMenu, #featureSwitch", 0.1, {autoAlpha:0}), 0);
	
	tweens[2] = new TimelineMax();
	tweens[2].insert(TweenMax.set("#phoneParts", {autoAlpha:0}), 0);
	tweens[2].insert(TweenMax.fromTo("#scr1", 0.1, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.fromTo("#scr2", 0.5, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.fromTo("#bgVideo1", 0.5, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.fromTo("#hand", 1, {autoAlpha:1}, {autoAlpha:0}),0);
	tweens[2].insert(TweenMax.fromTo("#phoneBt1", 0.2, {autoAlpha:1}, {autoAlpha:0}),0.3);
	tweens[2].insert(TweenMax.to(".contentBlock", 0.1, {autoAlpha:0}),0);
	

	
	tweens[3] = new TimelineMax()
		.to(".contentBlock", 0.01, {autoAlpha:0})
		// .to("#featureMenu, #featureSwitch", 0.1, {autoAlpha:0})
		//problem with phone not well mounted
		.to("#phoneBack", 0.1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"})
		.to("#phoneBoard", 0.1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"})
		.to("#phoneFront", 0.1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"})
		.to("#phoneScreen", 0.1, {left: "43%", scaleX: 1, skewX:"0deg", skewY:"0deg", transformOrigin: "50% 50%", top: "0%"})

		.fromTo("#background", 0.01, {autoAlpha:1}, {autoAlpha:0}, "-=0.01")
		.fromTo("#phoneParts", 0.01, {width: "4%", autoAlpha:0}, {width: "4%", autoAlpha:1})
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
			{scaleX: 0.9, skewX:"60deg", skewY:"-30deg", transformOrigin: "50% 50%", top: "15%"}, "-=1")
		.to(".contentBlock", 0.01, {autoAlpha:0})
		// tweens[3].insert(TweenMax.set("#featureMenu, #featureSwitch, #phoneExtras", {autoAlpha:0}));
		
	tweens[4] = new TimelineMax()
		.to(".contentBlock", 0.01, {autoAlpha:0})
		.to("#phoneBack", 1, {top: "25%"}, "-=0.2")
		.to("#phoneBoard", 1, {top: "15%"}, "-=1")
		.to("#phoneFront", 1, {top: "5%", alpha:0.8}, "-=1")
		.to("#phoneScreen", 1, {top: "-5%", alpha:0.65}, "-=1")
		.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 1, {top: "-5%"}, "-=1")
		.to("#phoneSnapdragon", 1, {top: "15%"}, "-=1")
		.to("#phoneProcessor", 1, {top: "15%"}, "-=1")
		.to(".contentBlock", 0.01, {autoAlpha:0})
		//tweens[4].insert(TweenMax.set("#featureMenu, #featureSwitch, #phoneExtras", {autoAlpha:0}), 0);
	
	// como essas partes são meio repetidas usei
	// um loop for para criar as animações
	for(var i=5; i< 12; i++){
		
		tweens[i] = new TimelineMax();

			if(i!=5){
				// tweens[i].insert(TweenMax.to("#scr"+(i-3), 0.01, {autoAlpha: 1}), 0.01);
			}
			// tweens[i].insert(TweenMax.to("#featureMenu, #featureSwitch, #featureSwitch p", 0.01, {autoAlpha:1}),0.01);
			// tweens[i].insert(TweenMax.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 0.01, {autoAlpha:0}), 0.01);
			// tweens[i].insert(TweenMax.to("#scr"+(i-2)+", #scr"+(i-2)+" p", 0.01, {autoAlpha: 1}), 0.01);

			// tweens[i].insert(TweenMax.to("#phoneExtras", 0.01, {autoAlpha:1}), 0.01);
			// tweens[i].insert(TweenMax.to("#icon"+(i-4), 0.01, {autoAlpha:1}), 0.01);

			if($("#phoneNav"+(i-4)).length){
				// tweens[i].insert(TweenMax.to("#phoneNav"+(i-4), 0.01, {autoAlpha:1}), 0.01);
			}
	}
		
	tweens[12] = new TimelineMax();
		// tweens[12].insert(TweenMax.to("#featureMenu, #featureSwitch", 0.2, {autoAlpha:0}), 0);
		tweens[12].insert(TweenMax.to(".contentBlock:not(#scr10, #scr11)", 0.1, {autoAlpha:0}),0);
		tweens[12].insert(TweenMax.to("#scr9", 0.4, {autoAlpha:0}), 0);
		// tweens[12].insert(TweenMax.to("#phoneExtras", 0.2, {autoAlpha:0}), 0);
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
		// tweens[13].insert(TweenMax.set("#featureMenu, #featureSwitch", {autoAlpha:0}));
		//tweens[13].insert(TweenMax.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 0.2, {autoAlpha:0}));
		tweens[13].insert(TweenMax.to("#scr11, #scr11 p", 0.1, {autoAlpha: 1}),0);
		//tweens[13].insert(TweenMax.to("#scr10", 1, {autoAlpha:1}),0);
		tweens[13].insert(TweenMax.fromTo("#scr10", 1, {y:0}, {y:-$(window).height()}),0);
		tweens[13].insert(TweenMax.fromTo("#scr11", 1, {y:$(window).height()}, {y:0}),0);
		//
		
		
		tweens[14] = new TimelineMax();
		// tweens[14].insert(TweenMax.set("#featureMenu, #featureSwitch", {autoAlpha:0}));
		//tweens[14].insert(TweenMax.set(".contentBlock:not(#scr10,#scr11)", {autoAlpha:0}));
		//tweens[14].insert(TweenMax.to("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5", 0.2, {autoAlpha:0, delay:0.5}));
		tweens[14].insert(TweenMax.to("#scr11", 0.5, {y:-($(window).height()/2), autoAlpha:1}));
		

	var force_visible = {display: "block", visibility: "visible", opacity: "1"};

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
			
			$(".feature").hide();
			$("#phoneExtras div").hide();
			$("#audio").trigger('pause');
			$(".phonenav").hide();
			$("#video-video, #video-game").get(0).pause();

			if(i >=5 && i<=12){
				$("#featureMenu, #featureSwitch, #featureSwitch p").show();
				$("#featureMenu ul li a").removeClass("selected");
				$("#nav"+(i-4)).addClass("selected");
				//nav problem on exploded view
				$("#scr"+(i-2)).css(force_visible);
				$("#phoneExtras").css(force_visible);
				$("#icon"+(i-4)).css(force_visible);
				$("#phoneNav"+(i-4)).css(force_visible);
				console.log("::", i);
				switch (i) {
					case 5: // conectividade
						break;
					case 6: // games
						$("#video-game").get(0).play();
						break;
					case 7: // apps
						break;
					case 8: // videos
						$("#video-video").get(0).play();
						break;
					case 9: // fotos
						break;
					case 10: //audio
						if (!$('#seletor:checkbox').is(':checked')) {
							$("#audio").prop("currentTime",0);
							$("#audio").trigger('play');
						};
						break;
					case 11: // bateria
						break;
					case 12: // saideira
						$("#featureMenu, #featureSwitch, #featureSwitch p").hide();
						break;
				};
			}

			
		});
		
	}
	
	initSwitch();
	initNav();
	
	

	TweenMax.set('.contentBlock, .contentBlock p, #phoneExtras, #phoneParts, #phoneBt1', {autoAlpha:0});
	TweenMax.set('#scr1,#scr2,#scr3,#scr4,#scr5,#scr6,#scr7,#scr8,#scr9,#scr10, #scr11', {autoAlpha:0});
	TweenMax.set("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5, #phoneExtras div", {autoAlpha:0});
	TweenMax.set('#scr1', {autoAlpha:1});


	$(".text-g, .extra-g").hide();
	TweenMax.set(".text-s, .extra-s", {autoAlpha:1});
	TweenMax.set(".text-g, .extra-g", {autoAlpha:0});
	
	$("body").show();
	TweenMax.fromTo("body", 1, {autoAlpha:0}, {autoAlpha:1, delay: 0.1, onStart:function(){
		//initParticles();
		$('body').scrollTop(0); 
		scrollController.scrollPos(0);
		TweenMax.set('.contentBlock, .contentBlock p, #phoneExtras, #phoneParts, #featureSwitch p, #phoneBt1', {autoAlpha:0});
		TweenMax.set("#phoneNav1, #phoneNav2, #phoneNav4, #phoneNav5, #phoneExtras div", {autoAlpha:0});
		TweenMax.set('#scr1', {autoAlpha:1});
	}, onComplete:function(){
		$('#introMovie').get(0).play();
		scrollController.scrollPos(0);
		TweenMax.set('.contentBlock, .contentBlock p, #phoneExtras, #phoneParts, #phoneBt1', {autoAlpha:0});
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
			// $("#video-video").get(0).pause();
			// $("#video-game").get(0).pause();

			// update the URL
			/*
			if (window.history && window.history.pushState) {
				history.pushState("", document.title, id);
			}*/
		}
	});	

	/**
	 * Cache para todos os seletores usados no scroll
	 * Uso intensivo de seletores em um bind como o scroll
	 * pode diminuir a performance
	 * @type {jQuery}
	 */
	var $document     = $(document);
	var $body         = $("body");
	var $window       = $(window);
	var $trigger      = $(".trigger");
	var $trigger1     = $("#trigger1");
	var $trigger2     = $("#trigger2");
	var $trigger10    = $("#trigger10");
	var $trigger11    = $("#trigger11");
	var $trigger12    = $("#trigger12");
	var $bullets      = $("#bullets ul li a");
	var $nav1         = $("#navItem1");
	var $nav2         = $("#navItem2");
	var $nav3         = $("#navItem3");
	var $nav4         = $("#navItem4");
	var $contentBlock = $(".contentBlock");
	var $videogame    = $("#video-game");
	var $videovideo   = $("#video-video");

	var tIds = [];
	$trigger.each(function(trig, i){
		tIds[i] = $trigger.eq(i).prop("id");
	})
	
	var trigger_tops = [];
	var len_triggers = $trigger.length;
	var tops_ready   = false
	var hidden       = false

	$document.on("scroll", function (e) {
		// caching tops
		if (!tops_ready) {
			for(var i=0; i<len_triggers; i++) {
		  	trigger_tops.push($trigger.eq(i).offset().top);
			};
			tops_ready = true;
		};

		currPos = $document.scrollTop();

		/**
		 * O framework apresenta falha grave no funcionamento
		 * Reparo de última hora
		 */
		if (currPos > 1800 && currPos < 2300) {
			if (!hidden) { // não chamar continuamente o hide() show()
				$contentBlock.hide();
				hidden = true;
			}
		} else {
			if (hidden) {
				$contentBlock.show();
				hidden = false;
			};
		};

		// $audio.trigger('pause');

		//quando parar o scroll
		clearTimeout($.data(this, 'scrollTimer'));
	    $.data(this, 'scrollTimer', setTimeout(function() {

	    	/**
	    	 * Não há necessidade de adquirir o currentTrigger a cada scroll
	    	 * Ele só é usado depois do clearTimeout
	    	 * Podemos adquirir ele aqui
	    	 */
	    	var len_tops  = len_triggers;
	    	var diff = 15;

  			for(var i=0; i<len_tops; i++) {
		    	var trigger_top      = trigger_tops[i];
		    	var trigger_next_top = trigger_tops[i+1];
					if (currPos >= trigger_top && currPos < trigger_next_top) {
						currentTrigger = i;
						break;
					};
				}

				prevPos = currPos;

	    	console.log(currentTrigger);

	    	// default actions
				$bullets.removeClass("selected");

	    	// coloque os trackers do analytics
	    	/*
	    	Usar o switch não o ifelse, pela performance
	    	 */
	    	switch(currentTrigger) {
			    case 0:
			    		// Estas são as bolinhas de navegação
							$nav1.addClass("selected");
			        break;
			    case 1:
    					$nav2.addClass("selected");
			        break;
			    case 2:
    					// tela 'conheça'
							_gaq.push(['_trackEvent', 'troca-tela', '1', '',0,true]);
    					$nav2.addClass("selected");
			        break;
			    case 3:
    					$nav2.addClass("selected");
			        break;
			    case 4:
    					$nav2.addClass("selected");
			        break;
			    case 5:
    					// tela 'atributos celular explodido'
							_gaq.push(['_trackEvent', 'troca-tela', '2', '',0,true]);
							// atributo
							if($body.hasClass('generico')) {
								_gaq.push(['_trackEvent', 'conheca', 'conectividade', 'snapdragon']);
							} else {
								_gaq.push(['_trackEvent', 'conheca', 'conectividade', 'outras marcas']);
							}
    					$nav2.addClass("selected");
			        break;
			    case 6:
    					// atributo
							if($body.hasClass('generico')) { 
								_gaq.push(['_trackEvent', 'conheca', 'games', 'snapdragon']);
							} else {
								_gaq.push(['_trackEvent', 'conheca', 'games', 'outras marcas']);
							}
    					$nav2.addClass("selected");
			        break;
			    case 7:
    					// atributo
							if($body.hasClass('generico')) { 
								_gaq.push(['_trackEvent', 'conheca', 'apps', 'snapdragon']);
							} else {
								_gaq.push(['_trackEvent', 'conheca', 'apps', 'outras marcas']);
							}

    					$nav2.addClass("selected");
			        break;
			    case 8:
	  					// atributo
							if($body.hasClass('generico')) { 
								_gaq.push(['_trackEvent', 'conheca', 'video', 'snapdragon']);
							} else {
								_gaq.push(['_trackEvent', 'conheca', 'video', 'outras marcas']);	
							}
    					$nav2.addClass("selected");
			        break;
			    case 9:
    					// atributo
							if($body.hasClass('generico')) { 
								_gaq.push(['_trackEvent', 'conheca', 'fotos', 'snapdragon']);
							} else {
								_gaq.push(['_trackEvent', 'conheca', 'fotos', 'outras marcas']);
							}
    					$nav2.addClass("selected");
			        break;
			    case 10:
    					// atributo
							if($body.hasClass('generico')) { 
								_gaq.push(['_trackEvent', 'conheca', 'audio', 'snapdragon']);
							} else {
								_gaq.push(['_trackEvent', 'conheca', 'audio', 'outras marcas']);
							}
    					$nav2.addClass("selected");
			        break;
			    case 11:
    					// atributo
							if($body.hasClass('generico')) { 
								_gaq.push(['_trackEvent', 'conheca', 'bateria', 'snapdragon']);
							} else {
								_gaq.push(['_trackEvent', 'conheca', 'bateria', 'outras marcas']);
							}
							$nav3.addClass("selected");
			        break;
			    case 12:
    					$nav3.addClass("selected");
			        break;
			    case 13:
							// tela 'video 30s'
							_gaq.push(['_trackEvent', 'troca-tela', '3', '',0,true]);
							$nav3.addClass("selected");
			        break;
			    case 14:
    					// tela 'compartilhe'
					    _gaq.push(['_trackEvent', 'troca-tela', '4', '',0,true]);
    					$nav4.addClass("selected");
			        break;
			    default:
				    	// é o 15 - final da página
					    _gaq.push(['_trackEvent', 'final', 'final']);
    					$nav4.addClass("selected");
				}



				// toca o video de games no ponto certo
				
				// if(!$body.hasClass('generico')) {
					// if(currPos >= $trigger10.offset().top && currPos < $trigger11.offset().top-10){
					// }
					/** 
					 * Função está duplicada com o item no case 7
					 */
					// toca o video no ponto certo
					// if(currPos >= $trigger10.offset().top+100 && currPos <= $trigger11.offset().top-20 ){
					// }
				// };


				/**
				 * Sem celular disponível para esta versão
				 * Esta parte será suprimida
				 */
				// esconde feature menus se não estiver no celular explodido
				// if(currentTrigger > 5 && currentTrigger < 12 && $trigger.eq(currentTrigger).length > 0 && 
				// 		currPos >= $trigger.eq(currentTrigger).offset().top-5 &&
				// 		currPos < $trigger.eq(currentTrigger).offset().top+5 ){
					
				// 	TweenMax.set("#phoneExtras div", {autoAlpha:0});
				// 	TweenMax.set("#icon"+(currentTrigger-5), {autoAlpha:1});
				// 	TweenMax.set(".contentBlock:not(#scr"+(currentTrigger-3)+")", {autoAlpha:0});
				// 	TweenMax.to("#featureMenu, #featureSwitch", 0.05, {autoAlpha:1});
				// 	TweenMax.set("#scr"+(currentTrigger-3), {autoAlpha:1});

				// 	if($("#phoneNav"+(currentTrigger-4)).length){
				// 		TweenMax.set("#phoneNav"+(currentTrigger-4), {autoAlpha:1});
				// 	}
				// }
				
				/*else if(currPos < $("#trigger1").offset().top+20){
					TweenMax.to(".contentBlock:not(#scr1)", 0.05, {autoAlpha:0});
					TweenMax.to("#scr1", 0.05, {autoAlpha:1});
				}else if(currPos < $("#trigger2").offset().top+20){
					TweenMax.to(".contentBlock:not(#scr1, #scr2)", 0.05, {autoAlpha:0});
					TweenMax.to("#scr2", 0.05, {autoAlpha:1});
				}*/

	    }, 100));
		
	});	
}

function changeAttributes() {
	if ($('#seletor:checkbox').is(':checked')) {
		$('body').addClass('generico');
		TweenMax.to(".text-s, .extra-s", 0.01, {autoAlpha:0, ease:Strong.easeOut, onComplete: function(){
			$(".text-s, .extra-s").hide();
			$(".text-g, .extra-g").show();
			TweenMax.to(".text-g, .extra-g", 0.01, {autoAlpha:1});	
		}});
		$audio.trigger('pause');
		$audio.prop("currentTime",0);
		// $("#video-video").get(0).pause();
		// $("#video-game").get(0).pause();
	} else {
		$('body').removeClass('generico');
		TweenMax.to(".text-g, .extra-g", 0.01, {autoAlpha:0, ease:Strong.easeOut, onComplete: function(){
			$(".text-g, .extra-g").hide();
			$(".text-s, .extra-s").show();
			TweenMax.to(".text-s, .extra-s", 0.01, {autoAlpha:1});	
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

$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});
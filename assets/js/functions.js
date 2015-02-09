// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs
// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }
//
// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);


// remap jQuery to $
(function($){


	site = {

		myScroll:'',
		Dragdealer:'',
		paddingTop: window.innerHeight,
		emails: $('.wrapper>div>div'),

		init: function(){
			site.spreadsheet();
			$('#timeline').hover(function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			})
		},
		probe: function(){
			$('#logo').attr('src','assets/img/logo.svg')
			$('#header h1').css('opacity','1');
			site.resize();
			var position;

			function loaded () {
				site.myScroll = new IScroll('.wrapper', { probeType: 3, mouseWheel: true, momentum: false });

				site.myScroll.on('scroll', function(){
					updatePosition();
					$('#timeline').css('pointerEvents','none');
				});
				site.myScroll.on('scrollEnd', function(){
					updatePosition();
					$('#timeline').css('pointerEvents','inherit');
				});
			}
			loaded();

			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

			site.Dragdealer = new Dragdealer('slider', {
				animationCallback: function(x, y) {
					scrollPoint = (x*($('.wrapper>div').height()-window.innerHeight));
					if($('#timeline').hasClass('hover')){
			    		site.myScroll.scrollTo(0, -scrollPoint);
			    	}
			    	if(x ==0 ){
						$('#header>a').css({
							'top' 				: '50%',
						});
						$('#header>a').css({
							'-webkit-transform' : 'translate(-50%,-50%) scale(1)',
							'-moz-transform'    : 'translate(-50%,-50%) scale(1)',
							'-ms-transform'     : 'translate(-50%,-50%) scale(1)',
							'-o-transform'      : 'translate(-50%,-50%) scale(1)',
							'transform'         : 'translate(-50%,-50%) scale(1)'
						});
						$('#header>a').children('h1').css('opacity','1');
			    	}
			  	}
			});

			function updatePosition () {
				scrollDistance = site.paddingTop/2;
				logoPosition = 50+(site.myScroll.y/scrollDistance)*50;
				logoScale = 1.2+(site.myScroll.y/scrollDistance);
				logoOpacity = .8+(site.myScroll.y/scrollDistance);

				logo = $('#header>a');
				if(logoPosition>=5){
					logo.css({
						'top' 				: logoPosition+'%',
					});
					if(logoScale <= 1){
						logo.css({
							'-webkit-transform' : 'translate(-50%,-50%) scale(' + logoScale + ')',
							'-moz-transform'    : 'translate(-50%,-50%) scale(' + logoScale + ')',
							'-ms-transform'     : 'translate(-50%,-50%) scale(' + logoScale + ')',
							'-o-transform'      : 'translate(-50%,-50%) scale(' + logoScale + ')',
							'transform'         : 'translate(-50%,-50%) scale(' + logoScale + ')'
						});
						logo.children('h1').css('opacity',logoOpacity);
					}

					// $('#timeline').css({
					// 	opacity: 0,
					// 	pointerEvents: 'none',
					// });
				}else{
					logo.css({
						'top' 				: '5%',
					});
					logo.css({
						'-webkit-transform' : 'translate(-50%,-50%) scale(.3)',
						'-moz-transform'    : 'translate(-50%,-50%) scale(.3)',
						'-ms-transform'     : 'translate(-50%,-50%) scale(.3)',
						'-o-transform'      : 'translate(-50%,-50%) scale(.3)',
						'transform'         : 'translate(-50%,-50%) scale(.3)'
					});
					logo.children('h1').css('opacity',logoOpacity);

					$('#timeline').css({
						opacity: 1,
						pointerEvents: 'inherit',
					});
				}
				scrollValue = (-site.myScroll.y/($('.wrapper>div').height()-window.innerHeight));
				console.log(scrollValue);
				site.Dragdealer.setValue(scrollValue, 0);
			}

			
		},
		resize: function(){
			site.paddingTop = window.innerHeight;
			$('.wrapper>div>div:eq(0)').css('padding-top',site.paddingTop);
		},
		spreadsheet: function(){

			  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1ullH-GuUMvywG410oyDghFYKcVtMrcALGngWaW7b57g/pubhtml';

			  function init() {
			    Tabletop.init( { key: public_spreadsheet_url,
			                     callback: showInfo,
			                     debug: true,
			                     simpleSheet: true } )
			  }

			  function showInfo(data, tabletop) {
			    site.buildFeed(data);
				site.probe();
			  }
			  init();
		},
		buildFeed: function(data){
			$.each(data, function( index, value ) {
				if(index <= 10){
				index = JSON.stringify(index);
				content = 	JSON.stringify(value);
			  if(index % 2 === 0){
			  	$('.wrapper>div').append('<div class="left"><h1>'+value.AUTHOR+' // '+value.SUBJECT+'</h1><p>'+value.COPY+'</p></div>');
			  }else{
			  	$('.wrapper>div').append('<div class="right"><h1>'+value.AUTHOR+' // '+value.SUBJECT+'</h1><p>'+value.COPY+'</p></div>');
			  }
			  }
			});
		},
	};

	$(document).ready(function (){
		site.init();
	});
	
	$(window).load(function() {
		
	});
	
	$(window).resize(function() {
		site.resize();
	});

})(window.jQuery);
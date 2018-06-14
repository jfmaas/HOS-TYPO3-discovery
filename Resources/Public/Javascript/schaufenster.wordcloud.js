! function(jQuery) {
		var words=[];
		function getWords(max) {
			var words = [];
			jQuery('.facet-id-Subjects li').each(function(ndx, elem) {
				var that = jQuery(this);
				var label = that.attr('label');
				if (ndx < max && label)    words.push({
					text : that.attr('label'),
					size : that.attr('count')
				});
			});
			return words;
		}
		$(document).ready(function() {
			/* Fancifizierung Schlagworte */
			words=  getWords(69);
			$(".facet-id-Subjects").html('<h1>Schlagworte</h1><a href="javascript:"><div id="wordcloud" height="160" width="100%" /></a>');
			d3.wordcloud().size([280, 160]).selector('#wordcloud').words(words).onwordclick(openBigBubble).start();
			$("#wordcloud").style('-webkit-filter','grayscale(100%)').style('filter','grayscale(100%)');
		
		});
		// https://github.com/wvengen/d3-wordcloud
		function openBigBubble(d, i) {
			var W = ($(window).width() - 300) * 0.95,
			    H = $(window).height() * 0.9;
			$('#wordcloud').webuiPopover({
//				title : "Schlagworte",
				placement : "right",
				type : 'iframe',
				width : W,
				height : H,
				url : '/typo3conf/ext/schaufenster/Resources/Public/Javascript/wordcloud.html?'+ Math.random(),
				animation : 'pop',
				onShow : function(e) {
					$("iframe").each(function() {
						$(this).one("load", function(){
						var $this=  $(this)[0];
setTimeout(function(){     						   $this.contentWindow.start(words,W,H);},2);
					        });
					});
				}
			});
		};

	}(jQuery);

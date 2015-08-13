/*Home js*/

$(function() {
	var $carousel = $('#carousel'),
		$pager = $('#pager');
 
	//	gather the thumbnails
	var $thumb = $( '<div class="thumb" />' );
	$carousel.children().each(function() {
		//var src = $(this).attr( 'src' );
		var src = $(this).data( "smPath" );
		//$thumb.append( '<img src="' + src.split('/large/').join('/small/') + '" />' );
		//$thumb.append( '<img src="' + src + '" class="mini-img" />' );
		$thumb.append( '<img src="' + src + '" />'  );
	});
 
	//	duplicate the thumbnails
	for (var a = 0; a < $carousel.children().length - 1; a++) {
		$pager.append( $thumb.clone() );
	}
 
	//	create large carousel
	$carousel.carouFredSel({
		items: {
			visible: 1,
			width: 550,
			height: 310
		},
		scroll: {
			fx: 'directscroll',
			onBefore: function( data ) {
				/*var oldSrc = data.items.old.attr('src').split('/large/').join('/small/'),
				newSrc = data.items.visible.attr('src').split('/large/').join('/small/'),
				$t = $thumbs.find('img:first-child[src="' + newSrc + '"]').parent();*/
 
			var oldSrc = data.items.old.data( "smPath" ),
			newSrc = data.items.visible.data( "smPath" ),
			$t = $thumbs.find('img:first-child[src="' + newSrc + '"]').parent();

				$t.trigger('slideTo', [$('img[src="' + oldSrc + '"]', $t), 'next']);
			}
		}
	});
 
	//	create thumb carousels
	var $thumbs = $('.thumb');
	$thumbs.each(function( i ) {
		$(this).carouFredSel({
			auto: false,
			scroll: {
				fx: 'directscroll'
			},
			items: {
				start: i+1,
				visible: 1,
				width: 100,
				height: 80
			}
		});
 
		//	click the carousel
		$(this).click(function() {
			//var src = $(this).children().first().attr('src').split('/small/').join('/large/');
			var src = $(this).children().first().data( "lrgPath" ); 
			$carousel.trigger('slideTo', [$('img[src="' + src + '"]', $carousel), 'next']);
		});
	});
});


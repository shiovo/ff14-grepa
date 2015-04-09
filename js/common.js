$(function(){

    /**
     * scroll
     */
    $('a[href^=#]').click(function(){
        var target;
        
        target = $( $(this).attr('href') );
        if (target.length == 0) {
            return;
        }
        $('html, body').animate({scrollTop: target.offset().top}, {duration: "fast"});
        return false;
    });


    /**
     * pageedit-sidefix
     */
    // var tab = $('#main-header'),
    //     offset;
    // if (tab.length) {
    //     offset = tab.offset();
 
    //     $(window).scroll(function () {
    //         if($(window).scrollTop() > offset.top) {
    //             tab.addClass('fixed');
    //         } else {
    //             tab.removeClass('fixed');
    //         }
    //     });
    // }


    /**
     * pageedit-sidefix
     */
    var tab2 = $('#main-t-header'),
        offset2;
    if (tab2.length) {
        offset2 = tab2.offset();
 
        $(window).scroll(function () {
            if($(window).scrollTop() > offset2.top) {
                tab2.addClass('fixed');
            } else {
                tab2.removeClass('fixed');
            }
        });
    }
    
    $.fn.findInputCount = function () {
		return this.data('_inputCounte') || (function ($this) {
			
			var $current = $this;
			
			do {
				if ($current.next('.input-count').length) {
					var $inputCount = $current.next('.input-count');
					$this.data('_inputCount', $inputCount);
					return $inputCount;
				}
				$current = $current.parent();
			}
			while ($current.length);
			
			return $();
			
		})(this);
		
    };
    
    $('body').on('keyup change', '.watch-input-count', function () {
    	var $this = $(this);
    	var $inputCount = $this.findInputCount();
    	
    	var count = $this.val().length;
    	var max   = parseInt($this.attr('maxlength'));
    	var countStr = count;
    	if (!isNaN(max)) {
    		countStr += '/' + max;
    	}
    	$inputCount.toggleClass('is-over', !isNaN(max) && count > max);
    	$inputCount.text(countStr);
    })
    .find('.watch-input-count').trigger('change');



});
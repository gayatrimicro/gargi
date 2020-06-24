/*! http://mths.be/placeholder v1.8.5 by @mathias */
(function(j,i,l){var k="placeholder" in i.createElement("input"),h="placeholder" in i.createElement("textarea");if(k&&h){l.fn.placeholder=function(){return this};l.fn.placeholder.input=l.fn.placeholder.textarea=true}else{l.fn.placeholder=function(){return this.filter((k?"textarea":":input")+"[placeholder]").bind("focus.placeholder",o).bind("blur.placeholder",m).trigger("blur.placeholder").end()};l.fn.placeholder.input=k;l.fn.placeholder.textarea=h;l(function(){l("form").bind("submit.placeholder",function(){var a=l(".placeholder",this).each(o);setTimeout(function(){a.each(m)},10)})});l(j).bind("unload.placeholder",function(){l(".placeholder").val("")})}function n(b){var c={},a=/^jQuery\d+$/;l.each(b.attributes,function(d,e){if(e.specified&&!a.test(e.name)){c[e.name]=e.value}});return c}function o(){var a=l(this);if(a.val()===a.attr("placeholder")&&a.hasClass("placeholder")){if(a.data("placeholder-password")){a.hide().next().show().focus().attr("id",a.removeAttr("id").data("placeholder-id"))}else{a.val("").removeClass("placeholder")}}}function m(){var a,b=l(this),e=b,c=this.id;if(b.val()===""){if(b.is(":password")){if(!b.data("placeholder-textinput")){try{a=b.clone().attr({type:"text"})}catch(d){a=l("<input>").attr(l.extend(n(this),{type:"text"}))}a.removeAttr("name").data("placeholder-password",true).data("placeholder-id",c).bind("focus.placeholder",o);b.data("placeholder-textinput",a).data("placeholder-id",c).before(a)}b=b.removeAttr("id").hide().prev().attr("id",c).show()}b.addClass("placeholder").val(b.attr("placeholder"))}else{b.removeClass("placeholder")}}}(this,document,jQuery));

jQuery(document).ready(function($) {
	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and the placeholder code at the start of this js file if you don't need :) */
	$('input, textarea').placeholder();

	/* RESIZE SLIDESHOW CONTAINER ------------- */
	$(window).on('resize', fullwidth_it);
	fullwidth_it();
	function fullwidth_it(){
		var viewportWidth = $(window).width();
		var viewportHeight = $(window).height();
		$c = $('#slideshow');
        $m = $('#rt-main');
		$c.css({ 'width' : viewportWidth, 'height' : viewportHeight });
        $m.css({ 'width' : viewportWidth })
		return;
	}
	// add the headerfix
	$('.headerFix').css('height',$('.thetop').height()+25);
	
	if($('#slideshow').length) {
		
		//TODO
		// add a centering method in #slideshow's child
        
				// clone footer
		$('.thebottom').clone().appendTo('#slideshow');
        		
		// Scroll effect for thetop & thebottom
		var activeHeader = false;
		$(window).scroll(function(e){ 
			$theTop = $('.thetop'); 
			$theBottom = $('#slideshow .thebottom'); 
			
			$supersizedControlsWrapper = $('#controls-wrapper');
			$supersizedProgressBack = $('#progress-back');
			
			var $slideDown = [ $theBottom, $supersizedControlsWrapper, $supersizedProgressBack ];
			
			if ($(this).scrollTop() > 180){ 
				if (!activeHeader) {
					activeHeader = true;
					$theTop.stop().animate({"top": $('#slideshow').height()}, 700, 'easeOutExpo');
					$.each($slideDown, function() {
						$(this).stop().animate({"marginBottom": "-200px","opacity": "0.01"}, 700, 'easeOutExpo');
					});
					
				}
			} else {
				if (activeHeader) {
					activeHeader = false;
					$theTop.stop().animate({"top": "0"}, 300, 'easeOutExpo');
					$.each($slideDown, function() {
						$(this).stop().animate({"marginBottom": "0","opacity": "1"}, 300, 'easeOutExpo');
					});
				}
			}
		}); // end scroll
	}
	
//////////////////////////////////////////////////////////////////////////	
// ADD ODD CLASS TO ROWS
//////////////////////////////////////////////////////////////////////////	
	
	$(".zebra-style tr:odd, .toggle-style-faq .tgg-trigger:odd").addClass("odd");
	$(".sortablePortfolioItems li:nth-child(4n)").addClass("last");
    
    //////////////////////////////////////////////////////////////////////////	
// TOGGLES - Tutorial by Soh Tanaka - http://www.sohtanaka.com/web-design/easy-toggle-jquery-tutorial/
//////////////////////////////////////////////////////////////////////////	

	//Hide (Collapse) the toggle containers on load
	$(".toggle_container").hide(); 

	//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
	$(".tgg-trigger").click(function(){
		$(this).toggleClass("active").next().slideToggle("slow");
		return false; //Prevent the browser jump to the link anchor
	});
	
//////////////////////////////////////////////////////////////////////////	
// ACCORDION - Tutorial by Soh Tanaka - http://www.sohtanaka.com/web-design/easy-toggle-jquery-tutorial/
//////////////////////////////////////////////////////////////////////////	

$('.acc_container').hide(); //Hide/close all containers

// if you want to show the first div uncomment the line below  <-- read this
//Add "active" class to first trigger, then show/open the immediate next container
//$('.acc_trigger:first').addClass('active').next().show(); 

$('.acc_trigger').click(function(e){
	if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
		$('.acc_trigger').removeClass('active').next().slideUp(); //Remove all "active" state and slide up the immediate next container
		$(this).toggleClass('active').next().slideDown(); //Add "active" state to clicked trigger and slide down the immediate next container
	} else {
		$('.acc_trigger').removeClass('active').next().slideUp(); //Remove all "active" state and slide up the immediate next container
	}
	e.preventDefault(); //Prevent the browser jump to the link anchor
});

//////////////////////////////////////////////////////////////////////////
// INSERT SHADOW UNDER IMAGES HAVING
//////////////////////////////////////////////////////////////////////////
$(window).load(function() {
	$('img.with-shadow-1').each(function() {
    	var $this = $(this);
    	var style = $this.attr('style');
       $this.attr('style','');
		$this.wrap('<div class="block-img-shadow" style="'+style+'" />');
        $('<div class="under-shadow"><img src="http://hogash.com/demo/eos_joomla/templates/rt_gantry/lib/img.php?src=http://hogash.com/demo/eos_joomla/templates/rt_gantry/images/image_shadows/shadow01.png&amp;w='+$(this).width()+'" alt="" /></div>').insertAfter(this);
	});
    
	$('img.with-shadow-2').each(function() {
    	var $this = $(this);
    	var style = $this.attr('style');
		$this.attr('style','');
		$this.wrap('<div class="block-img-shadow" style="'+style+'" />');
		$('<div class="under-shadow"><img src="http://hogash.com/demo/eos_joomla/templates/rt_gantry/lib/img.php?src=http://hogash.com/demo/eos_joomla/templates/rt_gantry/images/image_shadows/shadow02.png&amp;w='+$(this).width()+'" alt="" /></div>').insertAfter(this);
	});
	$('img.with-shadow-3').each(function() {
    	var $this = $(this);
    	var style = $this.attr('style');
		$this.attr('style','');
		$this.wrap('<div class="block-img-shadow" style="'+style+'" />');
		$('<div class="under-shadow"><img src="http://hogash.com/demo/eos_joomla/templates/rt_gantry/lib/img.php?src=http://hogash.com/demo/eos_joomla/templates/rt_gantry/images/image_shadows/shadow03.png&amp;w='+$(this).width()+'" alt="" /></div>').insertAfter(this);
	});
	$('img.with-shadow-4').each(function() {
		var $this = $(this);
    	var style = $this.attr('style');
		$this.attr('style','');
		$this.wrap('<div class="block-img-shadow" style="'+style+'" />');
		$('<div class="under-shadow"><img src="http://hogash.com/demo/eos_joomla/templates/rt_gantry/lib/img.php?src=http://hogash.com/demo/eos_joomla/templates/rt_gantry/images/image_shadows/shadow04.png&amp;w='+$(this).width()+'" alt="" /></div>').insertAfter(this);
	});
	$('img.with-shadow-5').each(function() {
		var $this = $(this);
    	var style = $this.attr('style');
		$this.attr('style','');
		$this.wrap('<div class="block-img-shadow" style="'+style+'" />');
		$('<div class="under-shadow"><img src="http://hogash.com/demo/eos_joomla/templates/rt_gantry/lib/img.php?src=http://hogash.com/demo/eos_joomla/templates/rt_gantry/images/image_shadows/shadow05.png&amp;w='+$(this).width()+'" alt="" /></div>').insertAfter(this);
	});
    $('img.with-shadow-6').each(function() {
		var $this = $(this);
    	var style = $this.attr('style');
		$this.attr('style','');
		$this.wrap('<div class="block-img-shadow" style="'+style+'" />');
		$('<div class="under-shadow"><img src="http://hogash.com/demo/eos_joomla/templates/rt_gantry/lib/img.php?src=http://hogash.com/demo/eos_joomla/templates/rt_gantry/images/image_shadows/shadow06.png&amp;w='+$(this).width()+'" alt="" /></div>').insertAfter(this);
	});
});



});
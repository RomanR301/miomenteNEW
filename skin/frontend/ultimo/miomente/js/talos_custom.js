jQuery(document).ready(function(){
			
	// This is file where you call all others plugins
	
	
	

		jQuery('.menu').talos_submenu({
		mouseHover:true,
		submenuStayOpen:true,
		animation:'0',
		responsive:false,
		menuHeadline:''
	});	
	

	/*
	
	-------------------------------
	
		Advanced Example 1
		
	jQuery('.menu').talos_submenu({
		submenuStayOpen:false,	
		animation:'2'
	});
	
	-------------------------------
	
		Advanced Example 2
		
	jQuery('.menu').talos_submenu({
		mouseHover:false,
		animation:'3',
		menuHeadline:'Nav'
	});
	
	-------------------------------
	
		Advanced Example 3
		
	jQuery('.menu').talos_submenu({
		submenuStayOpen:false,
		animation:'4',
		menuHeadline:'Navigation'
	});
	
	-------------------------------
	
		List of all available options with default values.
		
	jQuery('.menu').talos_submenu({
		mouseHover:true,
		submenuStayOpen:true,
		animation:'1',
		responsive:true,
		menuHeadline:'Menu'
	});
	
		More about available options you can find in help file in "D) JavaScript (jQuery)" section.
	
	*/	
});
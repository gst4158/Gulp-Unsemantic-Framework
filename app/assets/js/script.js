/**
* Adds data attribute of current breakpoint device to body
*/
var old_var = '';
jQuery(window).on('load resize',function() {

    // get device setting
    var core_device = core.device.currentBreakpoint()

    // only do stuff if core_device has changed value
    if ( core_device != old_var ) {
        // update h1 BG color
        switch(core_device) {
            case ('mobile'):
                break;
            case ('tablet'):
                break;
            case ('desktop'):
                break;
            default:
                break;
        };

        // add breakpoint to body class
        jQuery('body').attr('data-device', core.device.currentBreakpoint() );

    }
    // set previous value to test with
    old_var = core_device;
});


// Window Load
//--------------------------------------------//
jQuery(window).on('load', function(){

});

// Document Ready
//--------------------------------------------//
jQuery(document).ready(function() {

    console.log('js loaded');

}); // END document ready
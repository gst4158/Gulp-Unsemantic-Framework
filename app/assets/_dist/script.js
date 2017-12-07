// init core lib
var core = core || {};

/**
* Retrieves the site ID
*/
core.siteInfo = (function () {
  // Settings variable
  var siteMap = {
      // core home
      'gregorythomason.com' : {
        siteID : 'core-main',
        language : 'en',
        countryID : 'US'
      },
  };

  // Retrieves site Obj based off of URL
  getSiteObj = function(url){
    // trim URL, if not passed set to current location
    var url = ( url ? url : '/' /*window.location.toString()*/ );
    var urlTrimmed = typeof url === 'string' && url.length ? url.match(/[^\s\t\n\r]+/)[0] : null;
    if( urlTrimmed === null ){
      return false;
    }

    // split the URL into protocol, hostname, path, params and hash
    var urlSplit = urlTrimmed.match(/^([a-z\:]*\/\/)?(?:([a-z0-9\-\_]+)\.)?([a-z0-9\-\_]+\.[a-z\.]{2,})([^\?\&\#]*)\??([^\#]*)\#?(.*)$/i);
    if( urlSplit === null ) return false;

    for( var i = 0; i < urlSplit.length; i++ ){
        if( typeof urlSplit[i] === 'undefined' ){
            urlSplit[i] = '';
        }
    }

    // pull host name from split url object
    var domainName = urlSplit[3];

    // make sure domainName is valid from site manipulation
    var siteObj = (typeof siteMap[domainName] === 'undefined' ? null : siteMap[domainName]);
    if ( typeof siteObj === 'undefined' || siteObj === null ) return false;

    // return site object following siteMap object
    return siteObj;
  };

  // Sets a list of public functions
  sitePublic = {};

  // site object
  sitePublic.siteObj = function(url) {
    return getSiteObj(url);
  };

  // site ID
  sitePublic.siteID = function(url) {
    var siteObj = getSiteObj(url);
    return siteObj.siteID;
  };

  // site language
  sitePublic.siteLanguage = function(url) {
    var siteObj = getSiteObj(url);
    return siteObj.language;
  };

  // site country code
  sitePublic.siteCountryID = function(url) {
    var siteObj = getSiteObj(url);
    return siteObj.countryID;
  };

  // return public method
  return sitePublic;

}());

/**
* Retrives device information for current user
* core.device.currentBreakpoint() - returns user device by browser size (desktop/tablet/mobile)
* core.device.breakpointStyleMap() - returns an object of CSS breakpoints mimicing what would be called in the CSS
*/
core.device = (function () {
    // core device range
    var mediaQueries = {
      mobile: 767,
      tablet: {min: 768, max: 1199},
      desktop: 1200,
    };
  
    // settings to get passed into options
    var settings = {
      mediaQueries : mediaQueries,
      breakpointStyleMap: {
              mobile: 'screen and (max-width: '+ mediaQueries.mobile +'px)',
              tablet: 'screen and (min-width: '+ mediaQueries.tablet.min +'x) and (max-width: '+ mediaQueries.tablet.max +'px)',
              desktop: 'screen and (min-width: '+ mediaQueries.desktop +'px)'
          }
      };
  
    //Returns a string of the current device based on browser width
    getBreakpoint = function() {
      var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      browserW  = w.innerWidth || e.clientWidth || g.clientWidth,
      browserH  = w.innerHeight|| e.clientHeight|| g.clientHeight,
      device    = null;
  
      // get the device range
      switch(true) {
          case (browserW < mediaQueries.tablet.min):
            device = 'mobile'
            break;
          case (browserW <= mediaQueries.tablet.max && browserW >= mediaQueries.tablet.min):
            device = 'tablet'
            break;
          default:
            device = 'desktop'
      }
      return device;
    };
  
    // Sets a list of public functions
    devicePublic = {};
  
    // static breakpoint
    devicePublic.currentBreakpoint = function() {
      return getBreakpoint();
    };
  
    // breakpoint CSS mapping
    devicePublic.breakpointStyleMap = function(size){
      return typeof size !== 'undefined' ? settings.breakpointStyleMap[size] : settings.breakpointStyleMap ;
    };
  
    // return public method
    return devicePublic;
  
  }());
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
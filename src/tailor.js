/*
 * This is the heart of the Tailor utility. Basically, you should have the following in your web page:
 * window.onresize = tailor;
 */
function tailor() {
  // Only tailor the view if the user is not resizing the window.
  tailor.lastResizing = new Date().getTime();  
  if (!tailor.resizeTimer) {
    tailor.resizeTimer = setTimeout(tailor.attemptReload, tailor.settings.resizeThreshold);
  }  
}

/*
 * This function is used to configure, or initialize, Tailor.js.
 * 
 * This is needed to make some educated choices and conversions in the absence
 * of certain values.
 *
 * Possible option values include:
 * framework: 'bootstrap'
 * version: '4.0.0-alpha', '3.3.5'
 */
tailor.configure = function(options) {
  var config = { layout: { resizeThreshold:tailor.settings.layout.resizeThreshold } };
  
  // Setup the layout details
  if (options.layout) {
    if (options.layout.framework) {
      config.layout.framework = options.layout.framework;
      
      var frameworkKey = config.layout.framework.toLowerCase();
      if (tailor.supported.layout[frameworkKey]) {
        if (options.layout.version) {
          config.layout.version = options.layout.version;
          
          // JavaScript names cannot contain '-' or '.'. For that reason, we replace them with '_'.
          // In addition, names must start with a letter. Since a lot of versions start with numbers, we prepend a 'v'.
          var frameworkVersion = 'v' + config.layout.version.toLowerCase();
          frameworkVersion = frameworkVersion.replace('-', '_');
          frameworkVersion = frameworkVersion.replace('.', '_');
          
          if (tailor.supported.layout[frameworkKey][frameworkVersion]) {
            tailor.breakpoints = tailor.supported.layout[frameworkKey][frameworkVersion].breakpoints;
          } else {
            // If the framework version is not supported, use the default values for the framework.
            tailor.breakpoints = tailor.supported.layout[frameworkKey].defaults.breakpoints;
          }
        } else {
          // If the version was not specified, use the framework defaults.
          tailor.breakpoints = tailor.supported.layout[frameworkKey].defaults.breakpoints;          
        }
      } else {
        // If the framework is not supported, use the default values.
        tailor.breakpoints = tailor.supported.layout.defaults.breakpoints;
      }
    } else {
      // If the framework was not specified, use the default values.
      tailor.breakpoints = tailor.supported.layout.defaults.breakpoints;      
    }    
  }
  
  // Identify if the list of supported layout or cookie name have been specified
  config.layout.supported = (options.layout.supported) ? options.layout.supported : tailor.settings.layout.supported;
  config.layout.tokenName = (options.layout.tokenName) ? options.layout.tokenName : tailor.settings.layout.tokenName;
  
  // Identify if the browser supports gps
  config.abilities = tailor.settings.abilities;
  if (navigator.geolocation) {
      config.abilities.gps.isAvailable = navigator.geolocation;    
      // removed until further testing has occurred.
      // tailor.changedParams.push({key: config.abilities.gps.tokenName, value:true });          
  }
  
  // Identifiy if the current layout has been specified
  if (options.layout.current) {
    config.layout.current = options.layout.current;
  } else {
    document.addEventListener('DOMContentLoaded', function(event) {
      config.layout.current = tailor.getLayout();
    });      
  }
      
  tailor.settings = config;
};

/*
 * This function is used to determine if the page should be reloaded or not.
 */
tailor.attemptReload = function() {  
  var now = new Date().getTime();
  if ((now - tailor.lastResizing) > tailor.settings.layout.resizeThreshold) {
    // Attempt to resize.
    if (tailor.resizeTimer) {
      clearTimeout(tailor.resizeTimer);
      tailor.resizeTimer = null;
    }
    
    // Determine if a new layout is necessary
    var layout = tailor.getLayout();
    if (layout != tailor.settings.layout.current) {
      tailor.changedParams.push({key: tailor.settings.layout.tokenName, value:layout });      
    }    
    
    // If any parameters have been changed, consider reloading the view.
    var cp = tailor.changedParams;    
    if (cp.length > 0) {
      if (navigator.cookieEnabled) {
        for (var i=0; i<cp.length; i++) {
          tailor.setCookie(cp[i].key, cp[i].value);
        }                
        location.reload();
      } else {
        var url = location.href;
        for (var j=0; j<cp.length; j++) {
          url = tailor.setQueryStringValue(url, cp[j].key, cp[j].value);
        }
        location.replace(url);
      }
    }
  } else {
    // Restart the timer
    tailor.resizeTimer = setTimeout(tailor.attemptReload, tailor.settings.layout.resizeThreshold);
  }
};

/*
 * This is a utility method used to get the token value from either the query string
 * or cookie.
 */
tailor.getTokenValue = function(n) {
  var v = null;
  if (navigator.cookieEnabled) {
    var cn = n + '=';
    var cookies = document.cookie.split(';');
    for (var i=0; i<cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0)==' ') {
          cookie = cookie.substring(1);
        } 
        if (cookie.indexOf(cn) === 0) {
          v = cookie.substring(cn.length, cookie.length);
          break;
        } 
    }
  } else {
    // TODO
  }
  return v;
};

/*
 * This is a utility method use to set a cookie value.
 * 'n' is the name of the cookie.
 * 'v' is the value of the cookie.
 */
tailor.setCookie = function(n, v) {
  document.cookie = n + '=' + v;  
};

/* 
 * This is a utility method used to set a value in the query string.
 * 'u' is the url that contains the query string parameter;
 * 'n' is the name of the query string parameter.
 * 'v' is the value of the query string parameter.
 */
tailor.setQueryStringValue = function(u, n, v) {  
  var regex = new RegExp('([?&])' + n + '=.*?(&|$)', 'i');
  if (u.match(regex)) {
    u = u.replace(regex, '$1' + n + '=' + v + '$2');
  } else {
    var d = u.indexOf('?') !== -1 ? '&' : '?';              // d is the param divider like '&'         
    u = u + d + n + '=' + v;
  }
  return u;  
};

/*
 * This is a utility method that helps identify what type of target
 * the screen width is associated with.
 */
tailor.getLayout = function(t) {
  var layout = tailor.settings.layout.supported[tailor.settings.layout.supported.length-1];
  
  var width = document.body.scrollWidth; 
  for (var i=0; i<tailor.breakpoints.length; i++) {
    if (width < tailor.breakpoints[i]) {
      layout = tailor.settings.layout.supported[i];
      break;
    }
  }
  
//  console.log('width: ' + width + '  layout: ' + layout + '  highest: ' + tailor.breakpoints[tailor.breakpoints.length-1]);     
  return layout;
};

// The settings to use 
tailor.settings = {  
  // Capabilities represent the browser's client-side capabilities
  abilities: {
    gps: {
      tokenName: 'gps',                                // This is the name of the cookie or query string value to look at on the server to identify if the user's browser supports Geolocation
      isAvailable: false                               // A flag that signals whether the user's browser supports geolocation.  
    }
  },
  
  // The following are the layout settings used by tailor  
  layout: {
    framework: null,
    version: null,
    resizeThreshold: 200,
    
    current: null,                                    // This is the current layout used in your app. When the page is loaded, it should be set if possible. Think of this as the link between the server-side and the client-side.
    supported: ['mobile', 'portrait', 'landscape'],   // This is the list of layouts supported by your app. This list works with the list of breakpoints you choose/set to identify which layout should be used.
    tokenName: 'layout'                               // This is the name of the cookie or query string value to look at on the server to identify which layout to use
  }  
};

tailor.supported = {  
  layout: {
    // Bootstrap library settings
    bootstrap: {
      // The default values work with the following versions of Bootstrap:
      // 4.0.0-alpha
      // 3.3.5
      defaults : {
        breakpoints: [ 768, 992 ]
      }
    },
  
    // Settings for a custom library
    custom: {
      defaults: {
        breakpoints: []
      }
    },
  
    // Fallback values if nothing else is useful.
    defaults: {
      breakpoints: [ 640, 1024 ]
    }    
  }
};

// lastResizing is an internal variable that should not be accessed outside of this library.
// This variable determines whether the user is in the process or resizing the window or not.
// It helps serve as a lock to prevent unnecessary refreshes.
tailor.lastResizing = null;

// resizeTimer is an internal variable that should not be accessed outside of this library.
// This variable is used as a handle to the timeout determine if the user is still resizing
// the window or not.
tailor.resizeTimer = null;

// breakpoints is an internal variable that should not be accessed outside of this library.
// This variable is used to determine where a screen resizing should occur.
tailor.breakpoints = [];

// changedParams is an internal variable that should not be accessed outside of this library.
// This variable is used to determine which parameters have been changed.
tailor.changedParams = [];
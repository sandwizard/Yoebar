(function (global) {

  
  // Set up a namespace for our utility
  var ajaxUtils = {};
  
  
  // Returns an HTTP request object
  function getRequestObject() {
    if (window.XMLHttpRequest) {
      return (new XMLHttpRequest());
    } 
    else if (window.ActiveXObject) {
      // For very old IE browsers (optional)
      return (new ActiveXObject("Microsoft.XMLHTTP"));
    } 
    else {
      global.alert("Ajax is not supported!");
      return(null); 
    }
  }
  /**
   * 
   * @param {post end point} req 
   * @param {data to be sent} data 
   * @param {callbck function on load} cb 
   * @param {if is json} isJsonResponse 
   */
  ajaxUtils.sendPostRequest = function (req,data,cb,isJsonResponse){
    var request = getRequestObject();
    
    request.onload = ()=>{cb(request)};
    request.open("POST",req);  
    if(isJsonResponse)request.setRequestHeader('content-type','application/json');  
    request.send(data);

  };
  // Makes an Ajax GET request to 'requestUrl'
  ajaxUtils.sendGetRequest = 
    function(requestUrl, responseHandler, isJsonResponse) {
      var request = getRequestObject();
      request.onreadystatechange = 
        function() { 
          handleResponse(request, 
                         responseHandler,
                         isJsonResponse); 
        };
      request.open("GET", requestUrl, true);
      request.send(null); // for POST only
    };
  
  
  // Only calls user provided 'responseHandler'
  // function if response is ready
  // and not an error
  function handleResponse(request,
                          responseHandler,
                          isJsonResponse) {
    if ((request.readyState == 4) &&
       (request.status == 200)) {
  
      // Default to isJsonResponse = true
      if (isJsonResponse == undefined) {
        isJsonResponse = true;
      }
  
      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      }
      else {
        responseHandler(request.responseText);
      }
    }
  }
  
  
  // Expose utility to the global object
  global.$ajaxUtils = ajaxUtils;
  
  
  })(window);
  
  
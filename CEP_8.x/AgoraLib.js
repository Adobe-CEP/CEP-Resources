/**************************************************************************************************
*
* ADOBE SYSTEMS INCORPORATED
* Copyright 2014 Adobe Systems Incorporated
* All Rights Reserved.
*
* NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
* terms of the Adobe license agreement accompanying it.  If you have received this file from a
* source other than Adobe, then your use, modification, or distribution of it requires the prior
* written permission of Adobe.
*
**************************************************************************************************/

/** AgoraLib - v7.0.0 */

/**
 * @class AgoraLib
 *
 * AgoraLib provides an interface to the Adobe Exchange service and Exchange plugin.
 * Please note that Vulcan.js is required.
 */
function AgoraLib() {
    var extensionID = window.__adobe_cep__.getExtensionId();
    // GUID discussions: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);});
    var that = this;
    var exchangeVersion;
    
    this.callerID = guid + '_' + extensionID;
    this.bundleID = window.__adobe_cep__.invokeSync("getBundleId", "");

//--------------------------------------- Private functions ------------------------------    
    this.responseCallback = function (message) {
        if (window.DOMParser) {
            var parser = new window.DOMParser();
            try {
                var xmlDoc = parser.parseFromString(message.data, "text/xml");
                var payloadNode = xmlDoc.getElementsByTagName("payload")[0];
                
                if (payloadNode && payloadNode.childNodes[0]) {
                    payloadNode = payloadNode.childNodes[0].nodeValue;
                }
                if (payloadNode !== null) {
                    payloadNode = cep.encoding.convertion.b64_to_utf8(payloadNode);
                }
                console.log("Decoded payload: " + payloadNode);

                var payloadDoc = parser.parseFromString(payloadNode, "text/xml");
                var responses = payloadDoc.getElementsByTagName("Response");
                
                for (var i = 0; i < responses.length; i++) {
                    var respElem = responses[i];
                    if (respElem) {
                        var apiName = respElem.attributes.getNamedItem("name").nodeValue;
                        var callerID = respElem.attributes.getNamedItem("callerID").nodeValue;
                        console.log("This caller ID " + that.callerID + " received caller ID " + callerID);
                        console.log("API: " + apiName);

                        if (callerID === that.callerID) {
                            console.log("CallerIDs match! Now removing message listener");
                            VulcanInterface.removeMessageListener(AgoraLib.RESPONSE_TYPE, that.responseCallback);
                            // extract parameters
                            var respParams = respElem.getElementsByTagName("Result");
                            var params = {};
                            for (var j = 0; j < respParams.length; j++) {
                                var paramName = respParams[j].attributes.getNamedItem("name").nodeValue;
                                var paramValue = respParams[j].getElementsByTagName("Value")[0].textContent;
                                console.log("param name: " + paramName + " param value: " + paramValue);
                                params[paramName] = paramValue;
                            }

                            if (apiName === AgoraLib.IS_ENTITLED) {
                                console.log("IsEntitled callback");
                                var response1 = new AgoraLibResponse(params[AgoraLib.IS_ENTITLED], params[AgoraLib.STATUS], params[AgoraLib.STATUSCODE]);
                                that.isEntitledCallback(response1);
                            } else if (apiName === AgoraLib.GET_PURCHASE_URL) {
                                console.log("GetPurchaseUrl callback");
                                var url = params.URL;
                                var response2 = new AgoraLibResponse(url, params[AgoraLib.STATUS], params[AgoraLib.STATUSCODE]);
                                that.getPurchaseUrlCallback(response2);
                            } else if (apiName === AgoraLib.GET_VERSION) {
                                console.log("GetVersion callback");
                                var response3 = new AgoraLibResponse(params.Version, params[AgoraLib.STATUS], params[AgoraLib.STATUSCODE]);
                                that.exchangeVersion = params.Version;
                                that.getVersionCallback(response3);
                            } else if (apiName === AgoraLib.CREATE_ENTITLEMENT) {
                                console.log("CreateEntitlement callback");
                                var response4 = new AgoraLibResponse("", params[AgoraLib.STATUS], params[AgoraLib.STATUSCODE]);
                                that.createEntitlementCallback(response4);
                            }
                        }
                    }
                }
            }
            catch(e) {
                console.log("AgoraLibError: " + e);
            }
        }
    };
    
    this.checkVersion = function() {
        console.log("Checking version...");
        var request = "<Request name=\"" + AgoraLib.GET_VERSION + "\" callerID=\"" + that.callerID + "\"><Parameters>";
        request += "</Parameters></Request>";
        var sub_payload = String.format(AgoraLib.MESSAGE_REQUEST_TEMPLATE, request);

        var GetVersionVulcanMessage = new VulcanMessage(AgoraLib.MESSAGE_TYPE);
        GetVersionVulcanMessage.setPayload(sub_payload);
            
        VulcanInterface.addMessageListener(AgoraLib.RESPONSE_TYPE, that.responseCallback);
        VulcanInterface.dispatchMessage(GetVersionVulcanMessage);
        return;
    };

    this.continueWithCheckVersion = function() {
        if (!that.exchangeVersion) {
            that.checkVersion();
        } else {
            var responseObject = new AgoraLibResponse(this.exchangeVersion, AgoraLib.status.success.status, AgoraLib.status.success.code);
            that.getVersionCallback(responseObject);
        }
    };
    
    this.checkConnection = function(callback, ignoreACCC) {        
        that.getVersionCallback = callback;
        var param = "";
        var status = AgoraLib.status.internalClientError.status;
        var statusCode =  AgoraLib.status.internalClientError.code;

        // CoreSync and Thor will include vulcan specifiers so we can 
        // use the vulcan control library to detect CoreSync and Thor and launch when not running.
        var isInstalled = VulcanInterface.isAppInstalled("coresync");
        
        if (!isInstalled) {
            console.log("CoreSync does not exist");
            status = AgoraLib.status.creativeCloudNotFoundError.status;
            statusCode = AgoraLib.status.creativeCloudNotFoundError.code;
        } else {
            var isRunning = VulcanInterface.isAppRunning("coresync");
            
            console.log("CoreSync running? : " + isRunning + ", should it be launched if not running? " + (ignoreACCC ? "no" : "yes"));
            if (!isRunning && !ignoreACCC) {
                // attempt to launch ACC desktop which will launch CoreSync
                isRunning = VulcanInterface.launchApp("creativecloud", false, "");
                
                if (isRunning) {
                  console.log("ACCC is now being launched");
                  var startedUpCallback = function(message) {
                    console.log("ACCC started up");
                    VulcanInterface.removeMessageListener(AgoraLib.ACCC_STARTED_UP_MESSAGE, this);
                    that.continueWithCheckVersion();
                  };
                  // add event listener for vulcan.SuiteMessage.any.cosy.app.StartedUp so we know CoreSync is launched and ready to receive messages
                  VulcanInterface.addMessageListener(AgoraLib.ACCC_STARTED_UP_MESSAGE, startedUpCallback);
                  return;
                } else {
                    status = AgoraLib.status.creativeCloudFailedToLaunchError.status;
                    statusCode = AgoraLib.status.creativeCloudFailedToLaunchError.code; 
                }
            } else if (!isRunning && ignoreACCC) {
                // CoreSync is not running but user wants to bypass launching it. Return error to callback.
                status = AgoraLib.status.creativeCloudNotLaunchedError.status;
                statusCode = AgoraLib.status.creativeCloudNotLaunchedError.code;
            } else {
                that.continueWithCheckVersion();
                return;
            }
        }
        var responseObject = new AgoraLibResponse(param, status, statusCode);
        callback(responseObject);
    };

    // source: http://stackoverflow.com/questions/7717109/how-can-i-compare-arbitrary-version-numbers
    this.compareVersion = function (a, b) {
        var i, cmp, len, re = /(\.0)+[^\.]*$/;
        a = (a + '').replace(re, '').split('.');
        b = (b + '').replace(re, '').split('.');
        len = Math.min(a.length, b.length);
        for( i = 0; i < len; i++ ) {
            cmp = parseInt(a[i], 10) - parseInt(b[i], 10);
            if ( cmp !== 0 ) {
                return cmp;
            }
        }
        return a.length - b.length;
    };
}


//--------------------------------------- Public API ------------------------------

AgoraLib.prototype = (function(){

   /**
    * Triggers a check to determine if the current user is entitled to access the active extension. 
    * Possible responses are True, False or Unknown. Further information about the response can be found in
    * the responses status and statusCode properties. For example, if the response is true, status and statusCode can 
    * return the following combinations:\n
    * <ul>\n
    *     <li>1: Perpetual purchase</li>\n
    *     <li>2: Trial purchase</li>\n
    *     <li>3: Subscription purchase</li>\n
    *     <li>4: Subscription expired {date}</li>\n
    * </ul>\n
    * 
    * This API has a dependency on VulcanInterface.js and will throw an error if it is not defined.
    * 
    * @param callback  The JavaScript handler function to return the AgoraLibResponse object.
    * @param ignoreACCC  When true this API will not attempt to launch the Adobe Creative Cloud Connection application if it is not running. The default value is false.
    * @since 5.2.0
    */
    var isEntitled = function(callback, ignoreACCC) {

        if (typeof(Vulcan) === 'undefined') {
            throw 'Vulcan.js is required.';
        }

        if (callback === null || callback === undefined) {
            callback = function(result){};
        }
        
        if (ignoreACCC === null || ignoreACCC === undefined) {
            ignoreACCC = false;
        }
        
        this.isEntitledCallback = callback;
        var that = this;
        var success = false;
        
        // check connection
        this.checkConnection(function(responseObj) {
            console.log("isEntitled checkConnection response: " + responseObj.response + " with status: " + responseObj.status + " and statusCode: " + responseObj.statusCode);
            success = true;
            // check status and statusCode for success.
            if (responseObj.statusCode === "0" && that.compareVersion(responseObj.response, "1.0.0") >= 0) {
                console.log("isEntitled: connection check successful, now continue with isEntitled API call...");
                var request = "<Request name=\"" + AgoraLib.IS_ENTITLED + "\" callerID=\"" + that.callerID + "\"><Parameters>";
                request += "<Parameter name=\"BundleID\"><Value>" + that.bundleID + "</Value></Parameter>";
                request += "</Parameters></Request>";
                var sub_payload = String.format(AgoraLib.MESSAGE_REQUEST_TEMPLATE, request);

                var isEntitledVulcanMessage = new VulcanMessage(AgoraLib.MESSAGE_TYPE);
                isEntitledVulcanMessage.setPayload(sub_payload);
            
                VulcanInterface.addMessageListener(AgoraLib.RESPONSE_TYPE, that.responseCallback);
                VulcanInterface.dispatchMessage(isEntitledVulcanMessage);
            } else {
                var response = new AgoraLibResponse("Unknown", responseObj.status, responseObj.statusCode);
                callback(response);
            }
        }, ignoreACCC);
        // add a timeout and return error if response is not returned after a minute
        setTimeout(function(){
          if (!success) {
            console.log("isEntitled: Request timed out");
            var response = new AgoraLibResponse("Unknown", AgoraLib.status.internalClientError.status, AgoraLib.status.internalClientError.code);
            callback(response);
          }
        }, AgoraLib.TIMEOUT);
    };

    /**
     * Calls the Adobe Exchange service for a Purchase Url for the active extension. If the request is successful the statusCode in the response will be 0.
     * 
     * This API has a dependency on VulcanInterface.js and will throw an error if it is not defined.      
     *
     * @param callback  The JavaScript handler function to return the AgoraLibResponse object. The Response property will either be the final checkout page or the product details page (see below).
     * @param straightToCheckout If set to true the URL returned will be the final checkout page for this Extension on the Adobe Add-ons site. If set to false the
     *                           URL returned will be the Product details page for this Extension on the Adobe Add-ons site. Default is false. 
     * @param ignoreACCC  When true this API will not attempt to launch the Adobe Creative Cloud Connection application if it is not running. The default value is false.
     * @since 5.2.0
     */
    var getPurchaseUrl = function(callback, straightToCheckout, ignoreACCC) {
        if (typeof(Vulcan) === 'undefined') {
            throw 'Vulcan.js is required.';
        }

        if (callback === null || callback === undefined) {
            callback = function(result){};
        }
        
        if (ignoreACCC === null || ignoreACCC === undefined) {
            ignoreACCC = false;
        }

        this.getPurchaseUrlCallback = callback;
        straightToCheckout = (!requiredParamsValid(straightToCheckout) || straightToCheckout === '') ? false : straightToCheckout;
        
        var that = this;
        var success = false;
        // check connection
        this.checkConnection(function(responseObj) {
            success = true;
            console.log("getPurchaseUrl: checkConnection response: " + responseObj.response + " with status: " + responseObj.status + " and statusCode: " + responseObj.statusCode);
            if (responseObj.statusCode === "0" && that.compareVersion(responseObj.response, "1.0.0") >= 0) {
                console.log("Connection check successful, now continue with getPurchaseUrl API call...");
                var request = "<Request name=\"" + AgoraLib.GET_PURCHASE_URL + "\" callerID=\"" + that.callerID + "\"><Parameters>";
                request += "<Parameter name=\"BundleID\"><Value>" + that.bundleID + "</Value></Parameter>";
                request += "<Parameter name=\"StraightToCheckout\"><Value>" + straightToCheckout + "</Value></Parameter>";
                request += "</Parameters></Request>";
                var sub_payload = String.format(AgoraLib.MESSAGE_REQUEST_TEMPLATE, request); 
    
                var getPurchaseUrlVulcanMessage = new VulcanMessage(AgoraLib.MESSAGE_TYPE);
                getPurchaseUrlVulcanMessage.setPayload(sub_payload);

                VulcanInterface.addMessageListener(AgoraLib.RESPONSE_TYPE, that.responseCallback);
                VulcanInterface.dispatchMessage(getPurchaseUrlVulcanMessage);
            } else {
                var response = new AgoraLibResponse("", responseObj.status, responseObj.statusCode);
                callback(response);
            }
        }, ignoreACCC);
        // add a timeout and return error if response is not returned after a minute
        setTimeout(function(){
          if (!success) {
            console.log("getPurchaseUrl: Request timed out");
            var response = new AgoraLibResponse("", AgoraLib.status.internalClientError.status, AgoraLib.status.internalClientError.code);
            callback(response);
          }
        }, AgoraLib.TIMEOUT);
    };

    /**
    * Creates an entitlement for this extension on Adobe Exchange for the signed in user. 
    * If no user is available then the statusCode in the response will be 1004.
    * If the request is successful the statusCode in the response will be 0.
    *          
    * By adding an entitlement the user will be kept up date with the latest version of the extension
    * which will be published to Adobe Exchange.
    * 
    * This API has a dependency on VulcanInterface.js & CSInterface.js and will throw an error if either is not defined.
    * 
    * @param callback  The JavaScript handler function to return the AgoraLibResponse object.
    * @param ignoreACCC  When true this API will not attempt to launch the Adobe Creative Cloud Connection application if it is not running. The default value is false.
    * @since 5.2.0
    */
    var createEntitlement = function(callback, ignoreACCC) {
        if (typeof(Vulcan) === 'undefined') {
            throw 'Vulcan.js is required.';
        }

        if (typeof(CSInterface) === 'undefined') {
            throw 'CSInterface.js is required.';
        }

        if (callback === null || callback === undefined) {
            callback = function(result){};
        }
        
        if (ignoreACCC === null || ignoreACCC === undefined) {
            ignoreACCC = false;
        }

        this.createEntitlementCallback = callback;
        var that = this;
        var success = false;
        // check connection
        this.checkConnection(function(responseObj) {
            console.log("createEntitlement: checkConnection response: " + responseObj.response + " with status: " + responseObj.status + " and statusCode: " + responseObj.statusCode);
            success = true;
            // check status and statusCode for success.
            if (responseObj.statusCode === "0" && that.compareVersion(responseObj.response, "1.0.0") >= 0) {
                console.log("createEntitlement: Connection check successful, now continue with createEntitlement API call...");
                var csLibrary = new CSInterface();
                var extensionDir = csLibrary.getSystemPath(SystemPath.EXTENSION);
                var os = csLibrary.getOSInformation();
                var pathSeparator = os.indexOf("Win") >= 0 ? "\\" : "/";
                var manifestPath = extensionDir + pathSeparator + "CSXS" + pathSeparator + "manifest.xml";
                var fileContents = window.cep.fs.readFile(manifestPath);
                var error = true;
                if (window.DOMParser) {
                    var parser = new window.DOMParser();
                    try {
                        var xmlDoc = parser.parseFromString(fileContents.data, "text/xml");
                        var extManifest = xmlDoc.getElementsByTagName("ExtensionManifest")[0];
                        if (extManifest) {
                            var extensionBundleVersion = extManifest.attributes.getNamedItem("ExtensionBundleVersion").nodeValue; 
                            var request = "<Request name=\"" + AgoraLib.CREATE_ENTITLEMENT + "\" callerID=\"" + that.callerID + "\"><Parameters>";
                            request += "<Parameter name=\"BundleID\"><Value>" + that.bundleID + "</Value></Parameter>";
                            request += "<Parameter name=\"ExtensionBundleVersion\"><Value>" + extensionBundleVersion + "</Value></Parameter>";
                            request += "</Parameters></Request>";
                            var sub_payload = String.format(AgoraLib.MESSAGE_REQUEST_TEMPLATE, request);

                            var createEntitlementVulcanMessage = new VulcanMessage(AgoraLib.MESSAGE_TYPE);
                            createEntitlementVulcanMessage.setPayload(sub_payload);
            
                            VulcanInterface.addMessageListener(AgoraLib.RESPONSE_TYPE, that.responseCallback);
                            VulcanInterface.dispatchMessage(createEntitlementVulcanMessage);
                            error = false;
                        }
                    }
                    catch(e) {
                        console.log("AgoraLibError: " + e);
                    }
                }

                if (error)
                {
                    var response1 = new AgoraLibResponse("", AgoraLib.status.internalClientError.status, AgoraLib.status.internalClientError.code);
                    callback(response1);
                }
            } else {
                var response2 = new AgoraLibResponse("", responseObj.status, responseObj.statusCode);
                callback(response2);
            }
        }, ignoreACCC);
        // add a timeout and return error if response is not returned after a minute
        setTimeout(function(){
          if (!success) {
            console.log("createEntitlement: Request timed out");
            var response = new AgoraLibResponse("", AgoraLib.status.internalClientError.status, AgoraLib.status.internalClientError.code);
            callback(response);
          }
        }, AgoraLib.TIMEOUT);
    };

    return {
        constructor: AgoraLib,
        isEntitled: isEntitled,
        getPurchaseUrl: getPurchaseUrl,
        createEntitlement: createEntitlement
    };
})();

/**
 * Provides consts for some of the status responses returned by the AgoraLib client.
 */
AgoraLib.status = {
    /* Success Responses */
    success : {
            status        : "Success",
            code          : "0"
    },
    // Create Entitlement success responses
    updateAvailable : {
            status        : "Success. Update available",
            code          : "1"
    },
    entitlementAlreadyCreated : {
            status        : "Success. Entitlement already created",
            code          : "2"
    },
    // IsEntitled success responses
    perpetualPurchase : {
            status        : "Perpetual purchase",
            code          : "1"
    },
    trialPurchase : {
            status        : "Trial purchase",
            code          : "2"
    },
    subscriptionPurchase : {
            status        : "Subscription purchase",
            code          : "3"
    },
    free : {
            status        : "Free",
            code          : "4"
    },
    /* end of Success Responses */

    /* Error Responses */
    // IsEntitled error responses
    userNotEntitledError : {
            status        : "User not entitled or product not found",
            code          : "-1"
    },
    subscriptionExpiredError : {
            status        : "Subscription expired",
            code          : "-2"
    },
    // General error responses
    networkDisabledError : {
            status        : "Network disabled",
            code          : "1001"
    },
    networkError : {
            status        : "Network error",
            code          : "1002"
    },
    productNotFoundError : {
            status        : "Product not found",
            code          : "1003"
    },
    UserLoggedOutError : {
            status        : "User logged out",
            code          : "1004"
    },
    internalClientError : {
            status        : "Internal client error",
            code          : "1005"
    },
    internalServerError : {
            status        : "Internal server error",
            code          : "1006"
    },
    creativeCloudFailedToLaunchError : {
            status        : "Adobe Creative Cloud Desktop failed to launch",
            code          : "1007"
    },
    creativeCloudNotFoundError : {
            status        : "Adobe Creative Cloud Desktop is not installed",
            code          : "1008"
    },
    ApiNotSupportedError : {
            status        : "API not supported",
            code          : "1009"
    },
    creativeCloudNotLaunchedError : {
            status        : "Creative Cloud was not launched",
            code          : "1010"
    }
       
};

/**
 * Returned as the response by all AgoraLib APIs.
 * @param string response   The main result of the API request
 * @param string status     Textual description that either provides information of an error or additional information about the response.
 * @param int statusCode    status code.
 */
function AgoraLibResponse(response, status, statusCode) {
    this.response = response;
    this.status = status;
    this.statusCode = statusCode;
}

//--------------------------------------- AgoraLib Consts ------------------------------
//
AgoraLib.IS_ENTITLED                = "IsEntitled";
AgoraLib.GET_PURCHASE_URL           = "GetPurchaseUrl";
AgoraLib.CREATE_ENTITLEMENT         = "CreateEntitlement";
AgoraLib.GET_VERSION                = "GetVersion";
AgoraLib.STATUS                     = "Status";
AgoraLib.STATUSCODE                 = "StatusCode";
AgoraLib.MESSAGE_TYPE               = "vulcan.SuiteMessage.cosy.exchangeplugin.ApiRequest";
AgoraLib.RESPONSE_TYPE              = "vulcan.SuiteMessage.cosy.exchangeplugin.ApiResponse";
AgoraLib.ACCC_STARTED_UP_MESSAGE    = "vulcan.SuiteMessage.any.cosy.app.StartedUp";
AgoraLib.MESSAGE_REQUEST_TEMPLATE   = "<Message><Requests>{0}</Requests></Message>";
AgoraLib.MESSAGE_RESPONSE_TEMPLATE  = "<Message><Responses>{0}</Responses></Message>";
AgoraLib.TIMEOUT                    = 60000;

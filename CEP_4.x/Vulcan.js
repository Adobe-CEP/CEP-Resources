/**************************************************************************************************
*
* ADOBE SYSTEMS INCORPORATED
* Copyright 2013 Adobe Systems Incorporated
* All Rights Reserved.
*
* NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
* terms of the Adobe license agreement accompanying it.  If you have received this file from a
* source other than Adobe, then your use, modification, or distribution of it requires the prior
* written permission of Adobe.
*
**************************************************************************************************/

/** Vulcan - v4.2.0 */

/**
 * @class Vulcan
 *
 * The singleton instance, <tt>VulcanInterface</tt>, provides an interface
 * to the CC Communication Toolkit. Allows you to launch CC applications
 * and discover information about them.
 */
function Vulcan()
{
};

/** Event dispacher. */
Vulcan.dispatcher = new VulcanMessageDispatcher();

/**
 * Launches a CC application on the local machine, if it is not already running.
 *
 * @param targetSpecifier The application specifier; for example "indesign".
 *
 *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
 *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
 *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
 *        receive wrong result.
 *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
 *
 *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
 * @param focus           True to launch in foreground, or false to launch in the background.
 * @param cmdLine         Optional, command-line parameters to supply to the launch command.
 */
Vulcan.prototype.launchApp = function(targetSpecifier, focus, cmdLine)
{
    if(!requiredParamsValid(targetSpecifier) )
    {
        return;
    }
    var event = new LaunchAppEvent();
    event.targetSpecifier = targetSpecifier;
    event.focus = focus ? "true":"false";
    event.cmdLine = (cmdLine == undefined || cmdLine == null) ? "" : cmdLine;

    Vulcan.dispatcher.dispatchEvent(event);
};

/**
 * Checks whether a CC application is running on the local machine.
 *
 * @param targetSpecifier The application specifier; for example "indesign".
 *
 *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
 *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
 *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
 *        receive wrong result.
 *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
 *
 *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
 * @return True if the app is running, false otherwise.
 */
Vulcan.prototype.isAppRunning = function(targetSpecifier)
{
    if(!requiredParamsValid(targetSpecifier) )
    {
        return;
    }
    var event = new IsAppRunningEvent();
    event.targetSpecifier = targetSpecifier;

    Vulcan.dispatcher.dispatchEvent(event);
};

/**
 * Checks whether a CC application is installed on the local machine.
 *
 * @param targetSpecifier The application specifier; for example "indesign".
 *
 *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
 *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
 *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
 *        receive wrong result.
 *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
 *
 *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
 * @return True if the app is installed, false otherwise.
 */
Vulcan.prototype.isAppInstalled = function(targetSpecifier)
{
    if(!requiredParamsValid(targetSpecifier) )
    {
        return;
    }
    var event = new IsAppInstalledEvent();
    event.targetSpecifier = targetSpecifier;

    Vulcan.dispatcher.dispatchEvent(event);
};

/**
 * Retrieves the local install path of a CC application.
 *
 * @param targetSpecifier The application specifier; for example "indesign".
 *
 *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
 *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
 *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
 *        receive wrong result.
 *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
 *
 *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
 * @return The path string.
 */
Vulcan.prototype.getAppPath = function(targetSpecifier)
{
    if(!requiredParamsValid(targetSpecifier) )
    {
        return;
    }
    var event = new GetAppPathEvent();
    event.targetSpecifier = targetSpecifier;

    Vulcan.dispatcher.dispatchEvent(event);
};

/**
 * Registers an event-handler callback function for a
 * CC Communication Toolkit event.
 *
 * @param type            The event type.  Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 * @param callback        The callback function that handles the event.
 *            Takes one argument, the event object.
 *
 */
Vulcan.prototype.addEventListener = function(type, callback)
{
    if(!requiredParamsValid(type, callback))
    {
        return;
    }

    return Vulcan.dispatcher.addEventListener(type, callback);
};

/**
 * Removes a registered event handler for a CC Communication Toolkit event.
 *
 * @param type            The event type. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 * @param callback        The callback function that was registered.
 */
Vulcan.prototype.removeEventListener = function(type, callback)
{
    if(!requiredParamsValid(type, callback))
    {
        return;
    }

    Vulcan.dispatcher.removeEventListener(type, callback);
};

/**
 * Checks whether a specific callback function has been registered
 * to handle a specific event.
 *
 * @param type            The event type. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 * @param callback        The callback function name.
 *
 * @return True if callback has been registered for the event, false otherwise.
 */
Vulcan.prototype.hasEventListener = function(type, callback)
{
    if(!requiredParamsValid(type, callback))
    {
        return;
    }

    return null != Vulcan.dispatcher.getEventListener(type, callback);
};

/**
 * Dispatches a CC Communication Toolkit event.
 *
 * @param vulcanEvent   The event object. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 */
Vulcan.prototype.dispatchEvent = function(vulcanEvent)
{
    if(!requiredParamsValid(vulcanEvent) )
    {
        return;
    }

    Vulcan.dispatcher.dispatchEvent(vulcanEvent);
};

/** Singleton instance of Vulcan **/
var VulcanInterface = new Vulcan();

//----------------------------------- Private ---------------------------------

/**
 * @class VulcanMessageDispatcher
 *
 * Allows you to exchange messages among applications and CEP-based extensions
 * using the CC Communication Toolkit.
 *
 */
function VulcanMessageDispatcher()
{
};

/** Event listeners **/
VulcanMessageDispatcher.prototype.listeners = new Array();

/**
 * Dispatch a CC Communication Toolkit event.
 *
 * @param vulcanEvent The event instance. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 */
VulcanMessageDispatcher.prototype.dispatchEvent = function(vulcanEvent)
{
    if(!requiredParamsValid(vulcanEvent) )
    {
        return;
    }

    var cs = new CSInterface();
    var event = new CSEvent(vulcanEvent.type, vulcanEvent.scope, vulcanEvent.appId, vulcanEvent.extensionId);
    event.data = vulcanEvent.xmlData();

    cs.dispatchEvent(event);
};

/**
 * Registers an event-handler callback function for a
 * CC Communication Toolkit event.
 *
 * @param type The event type. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 * @param callback The callback function that handles the event.
 *                 Takes one argument, the event object.
 *
 */
VulcanMessageDispatcher.prototype.addEventListener = function(type, callback)
{
    if(!requiredParamsValid(type, callback) )
    {
        return;
    }

    var vulcanlistener = new VulcanListener(type, callback, this.listeners.length);
    this.listeners[vulcanlistener.seqID] = vulcanlistener;

    var cs = new CSInterface();

    cs.addEventListener(type, vulcanlistener.handler, vulcanlistener);
    return vulcanlistener;
};

/**
 * Removes a registered event handler for a CC Communication Toolkit event.
 *
 * @param type            The event type. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 * @param callback        The callback function that was registered.
 */
VulcanMessageDispatcher.prototype.removeEventListener = function(type, callback)
{
    if(!requiredParamsValid(type, callback) )
    {
        return;
    }
    var listener = this.getEventListener(type, callback);
    if(listener != null)
    {
        var cs = new CSInterface();
        cs.removeEventListener(listener.type, listener.handler, listener);
        //Array.splice will not update Array.length, so that Array.length can be the identifier of event listener
        this.listeners.splice(listener.sepId, 0);
  }
};

/**
 * Retrieves a registered event listener.
 *
 * @param type            The event type. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 * @param callback        The callback function that was registered.
 *
 * @return A VulcanListener instance, or null if no match is found.
 */
VulcanMessageDispatcher.prototype.getEventListener = function(type, callback)
{
  for(var i = 0; i< this.listeners.length; i++)
    {
        var listener = this.listeners[i];
        if(listener.type == type && listener.callback == callback)
        {
            return listener;
        }
    }
  return null;
};

/**
 * @class VulcanListener
 * Encapsulates an event listener for CC Communication Toolkit events.
 * Creates an instance that associates a callback
 * handler function with events of a given type.
 *
 * @param type            The event type. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li></ul>
 * @param callback        The callback function that handles the event.
 *            Takes one argument, the event object.
 * @param seqID     A unique identifier for the new instance.
 * @return The new \c VulcanListener instance.
 */
function VulcanListener(type, callback, seqID)
{
    this.type = type;
    this.callback = callback;
    this.seqID = seqID;

};

/**
 * Defines a handler for a CC Communication Toolkit event.
 *
 * @param  The event instance.
 *
 */
VulcanListener.prototype.handler = function(event)
{
    var vulcanEvent = null;
    switch(event.type)
    {
        case LaunchAppEvent.TYPE:
            vulcanEvent = new LaunchAppEvent();
            break;
        case IsAppRunningEvent.TYPE:
            vulcanEvent = new IsAppRunningEvent();
            break;
        case IsAppInstalledEvent.TYPE:
            vulcanEvent = new IsAppInstalledEvent();
            break;
        case GetAppPathEvent.TYPE:
            vulcanEvent = new GetAppPathEvent();
            break;
        default:
            if(strStartsWith(event.type, SuiteMessageEvent.TYPE_PREFIX) )
            {
                vulcanEvent = new SuiteMessageEvent();
            }
            else if(strStartsWith(event.type, HostMessageEvent.TYPE_PREFIX) )
            {
                vulcanEvent = new HostMessageEvent();
            }
            else if(strStartsWith(event.type, VulcanMessageEvent.TYPE_PREFIX) )
            {
                vulcanEvent = new VulcanMessageEvent();
            }
            else
            {
                //log the error
                return;
            }
            break;
    }
    vulcanEvent.initializeWithCSEvent(event);
    this.callback(vulcanEvent);
};

//--------------------------------- Vulcan Event ------------------------------

/**
 * @class VulcanMessageEvent
 * Base type for CC Communication Toolkit events, which are based on
 * the \c CSEvent class. The events are the means by which messages are sent
 * and received among CC Communication Toolkit-enabled applications and extensions.
 *
 * @param type            The event type. Event types are:
 * <ul> <li>LaunchAppEvent</li>
 *  <li>IsAppRunningEvent</li>
 *  <li>GetAppPathEvent</li>
 *  <li>VulcanMessageEvent</li>
 *  <li>HostMessageEvent</li>
 *  <li>SuiteMessageEvent</li></ul>
 *
 */
function VulcanMessageEvent(type)
{
    this.type = type;
    this.scope = VulcanMessageEvent.SCOPE_SUITE;
    this.appId = VulcanMessageEvent.DEFAULT_APP_ID ;
    this.extensionId = VulcanMessageEvent.DEFAULT_EXTENSION_ID;
    this.data = "";
};

VulcanMessageEvent.TYPE_PREFIX    = "vulcan.";
VulcanMessageEvent.SCOPE_HOST     = "APPLICATION";
VulcanMessageEvent.SCOPE_SUITE    = "GLOBAL";
VulcanMessageEvent.DEFAULT_APP_ID = "UNKNOWN";
VulcanMessageEvent.DEFAULT_EXTENSION_ID = "UNKNOWN";
VulcanMessageEvent.dataTemplate = "<data>{0}</data>";

/**
 * Initializes this event instance.
 *
 * @param event           A \c CSEvent instance to use for initialization.
 */
VulcanMessageEvent.prototype.initializeWithCSEvent = function(event)
{
    this.type = event.type;
    this.scope = event.scope;
    this.appId = event.appId;
    this.extensionId = event.extensionId;
    this.data = event.data;
};

/**
 * Retrieve the event data.
 *
 * @return A data string in XML format.
 */
VulcanMessageEvent.prototype.xmlData = function ()
{
    var str = "";
    this.data = String.format(VulcanMessageEvent.dataTemplate, str);
    return this.data;
};

/**
 * @class LaunchAppEvent
 *
 * The event type that signals a launch request for a CC application.
 *
 */
function LaunchAppEvent()
{
    this.targetSpecifier = "";
    this.focus = "true";
    this.cmdLine = "";
    this.result = "true";
};

LaunchAppEvent.TYPE = VulcanMessageEvent.TYPE_PREFIX + "LaunchApp";
LaunchAppEvent.targetSpecifierTemplate = "<targetSpecifier>{0}</targetSpecifier>";
LaunchAppEvent.focusTemplate = "<focus>{0}</focus>";
LaunchAppEvent.cmdLineTemplate = "<cmdLine>{0}</cmdLine>";
LaunchAppEvent.resultTemplate = "<result>{0}</result>";
LaunchAppEvent.dataTemplate = "<data>{0}</data>";

LaunchAppEvent.prototype = new VulcanMessageEvent(LaunchAppEvent.TYPE);

/**
 * Retrieves the event data.
 *
 * @return A data string in XML format.
 */
LaunchAppEvent.prototype.xmlData = function ()
{
    var str = String.format(LaunchAppEvent.targetSpecifierTemplate, this.targetSpecifier);
    str += String.format(LaunchAppEvent.focusTemplate, this.focus);
    str += String.format(LaunchAppEvent.cmdLineTemplate,this.cmdLine);
    str += String.format(LaunchAppEvent.resultTemplate,this.result);

    this.data = String.format(LaunchAppEvent.dataTemplate, str);

    return this.data;
};

/**
 * Initializes this event instance.
 *
 * @param event           A \c CSEvent instance to use for initialization.
 */
LaunchAppEvent.prototype.initializeWithCSEvent = function(event)
{
    this.type = event.type;
    this.scope = event.scope;
    this.appId = event.appId;
    this.extensionId = event.extensionId;
    this.data = event.data;
    this.targetSpecifier = GetValueByKey(this.data, "targetSpecifier");

    this.focus = GetValueByKey(this.data, "focus");
    this.cmdLine = GetValueByKey(this.data, "cmdLine");
    this.result = GetValueByKey(this.data, "result");
};

/**
 * Converts the properties of this instance to a string.
 *
 * @return The string version of this instance.
 */
LaunchAppEvent.prototype.toString = function()
{
    var str = "type=" + this.type;
    str += ", scope=" + this.scope;
    str += ", appId=" + this.appId;
    str += ", extensionId=" + this.extensionId;
    str += ", data=" + this.xmlData();
    return str;
};

/**
 * @class IsAppRunningEvent
 *
 * The event type that signals a request to check if a CC application is running.
 *
 */
function IsAppRunningEvent()
{
    this.targetSpecifier = "";
    this.result = "true";
};

IsAppRunningEvent.TYPE = VulcanMessageEvent.TYPE_PREFIX + "IsAppRunning";
IsAppRunningEvent.targetSpecifierTemplate = "<targetSpecifier>{0}</targetSpecifier>";
IsAppRunningEvent.resultTemplate = "<result>{0}</result>";
IsAppRunningEvent.dataTemplate = "<data>{0}</data>";

IsAppRunningEvent.prototype = new VulcanMessageEvent(IsAppRunningEvent.TYPE);

/**
 * Retrieves the event data.
 *
 * @return A data string in XML format.
 */
IsAppRunningEvent.prototype.xmlData = function ()
{
    var str = String.format(IsAppRunningEvent.targetSpecifierTemplate, this.targetSpecifier);
    str += String.format(IsAppRunningEvent.resultTemplate,this.result);
    this.data = String.format(IsAppRunningEvent.dataTemplate, str);

    return this.data;
};

/**
 * Initializes this event instance.
 *
 * @param event           A \c CSEvent instance to use for initialization.
 */
IsAppRunningEvent.prototype.initializeWithCSEvent = function(event)
{
    this.type = event.type;
    this.scope = event.scope;
    this.appId = event.appId;
    this.extensionId = event.extensionId;
    this.data = event.data;
    this.targetSpecifier = GetValueByKey(this.data, "targetSpecifier");

    this.result = GetValueByKey(this.data, "result");
};

/**
 * Converts the properties of this instance to a string.
 *
 * @return The string version of this instance.
 */
IsAppRunningEvent.prototype.toString = function()
{
    var str = "type=" + this.type;
    str += ", scope=" + this.scope;
    str += ", appId=" + this.appId;
    str += ", extensionId=" + this.extensionId;
    str += ", data=" + this.xmlData();
    return str;
};

/**
 * @class IsAppInstalledEvent
 * The event type that signals a request to check if a CC application is installed locally.
 *
 */
function IsAppInstalledEvent()
{
    this.targetSpecifier = "";
    this.result = "true";
};

IsAppInstalledEvent.TYPE = VulcanMessageEvent.TYPE_PREFIX + "IsAppInstalled";
IsAppInstalledEvent.targetSpecifierTemplate = "<targetSpecifier>{0}</targetSpecifier>";
IsAppInstalledEvent.resultTemplate = "<result>{0}</result>";
IsAppInstalledEvent.dataTemplate = "<data>{0}</data>";

IsAppInstalledEvent.prototype = new VulcanMessageEvent(IsAppInstalledEvent.TYPE);

/**
 * Retrieves the event data.
 *
 * @return A data string in XML format.
 */
IsAppInstalledEvent.prototype.xmlData = function ()
{
    var str = String.format(IsAppInstalledEvent.targetSpecifierTemplate, this.targetSpecifier);
    str += String.format(IsAppInstalledEvent.resultTemplate,this.result);
    this.data = String.format(IsAppInstalledEvent.dataTemplate, str);

    return this.data;
};

/**
 * Initializes this event instance.
 *
 * @param event           A \c CSEvent instance to use for initialization.
 */
IsAppInstalledEvent.prototype.initializeWithCSEvent = function(event)
{
    this.type = event.type;
    this.scope = event.scope;
    this.appId = event.appId;
    this.extensionId = event.extensionId;
    this.data = event.data;
    this.targetSpecifier = GetValueByKey(this.data, "targetSpecifier");

    this.result = GetValueByKey(this.data, "result");
};

/**
 * Converts the properties of this instance to a string.
 *
 * @return The string version of this instance.
 */
IsAppInstalledEvent.prototype.toString = function()
{
    var str = "type=" + this.type;
    str += ", scope=" + this.scope;
    str += ", appId=" + this.appId;
    str += ", extensionId=" + this.extensionId;
    str += ", data=" + this.xmlData();
    return str;
};

/**
 * @class GetAppPathEvent
 * The event type that signals a request to retrieve
 * the local install path of a CC application.
 *
 */
function GetAppPathEvent()
{
    this.targetSpecifier = "";
    this.result = "true";
};

GetAppPathEvent.TYPE = VulcanMessageEvent.TYPE_PREFIX + "GetAppPath";
GetAppPathEvent.targetSpecifierTemplate = "<targetSpecifier>{0}</targetSpecifier>";
GetAppPathEvent.resultTemplate = "<result>{0}</result>";
GetAppPathEvent.dataTemplate = "<data>{0}</data>";

GetAppPathEvent.prototype = new VulcanMessageEvent(GetAppPathEvent.TYPE);

/**
 * Retrieves the event data.
 *
 * @return A data string in XML format.
 */
GetAppPathEvent.prototype.xmlData = function ()
{
    var str = String.format(GetAppPathEvent.targetSpecifierTemplate, this.targetSpecifier);
    str += String.format(GetAppPathEvent.resultTemplate,this.result);
    this.data = String.format(GetAppPathEvent.dataTemplate, str);

    return this.data;
};

/**
 * Initializes this event instance.
 *
 * @param event           A \c CSEvent instance to use for initialization.
 */
GetAppPathEvent.prototype.initializeWithCSEvent = function(event)
{
    this.type = event.type;
    this.scope = event.scope;
    this.appId = event.appId;
    this.extensionId = event.extensionId;
    this.data = event.data;
    this.targetSpecifier = GetValueByKey(this.data, "targetSpecifier");

    this.result = GetValueByKey(this.data, "result");
};

/**
 * Converts the properties of this instance to a string.
 *
 * @return The string version of this instance.
 */
GetAppPathEvent.prototype.toString = function()
{
    var str = "type=" + this.type;
    str += ", scope=" + this.scope;
    str += ", appId=" + this.appId;
    str += ", extensionId=" + this.extensionId;
    str += ", data=" + this.xmlData();
    return str;
};

/**
 * @class SuiteMessageEvent
 *
 * Event type for sending messages between host applications.
 * A message of this type can be broadcast to all running
 * CC Communication Toolkit-enabled apps.
 *
 * To send a message between extensions running within one
 * application, use the <code>HostMessageEvent</code> type.
 */
function SuiteMessageEvent(type)
{
    this.type = type;
    this.scope = VulcanMessageEvent.SCOPE_SUITE;
};

SuiteMessageEvent.TYPE_PREFIX = VulcanMessageEvent.TYPE_PREFIX + "SuiteMessage.";
SuiteMessageEvent.dataTemplate = "<data>{0}</data>";
SuiteMessageEvent.payloadTemplate = "<payload>{0}</payload>";

SuiteMessageEvent.prototype = new VulcanMessageEvent(SuiteMessageEvent.TYPE_PREFIX);

/**
 * Retrieves the event data.
 *
 * @return A data string in XML format.
 */
SuiteMessageEvent.prototype.xmlData = function ()
{
    if(this.data == undefined)
    {
        var str = "";
        this.data = String.format(SuiteMessageEvent.dataTemplate, str);
    }

    return this.data;
};

/**
 * Initializes this event instance.
 *
 * @param event           A \c CSEvent instance to use for initialization.
 */
SuiteMessageEvent.prototype.initializeWithCSEvent = function(event)
{
    this.type = event.type;
    this.scope = event.scope;
    this.appId = event.appId;
    this.extensionId = event.extensionId;
    this.data = event.data;
};

/**
 * Sets the message payload of this event.
 *
 * @param payload           A string containing the message payload.
 */
SuiteMessageEvent.prototype.setPayload = function(payload)
{
    var str = cep.encoding.convertion.utf8_to_b64(payload);
    str = String.format(SuiteMessageEvent.payloadTemplate, str);
    this.data = String.format(SuiteMessageEvent.dataTemplate, str);
};

/**
 * Retrieves the message payload of this event.
 *
 * @return                  A string containing the message payload.
 */
SuiteMessageEvent.prototype.getPayload = function()
{
    var str = GetValueByKey(this.data, "payload");
    if(str != null)
    {
        return cep.encoding.convertion.b64_to_utf8(str);
    }

    return null;
};

/**
 * Converts the properties of this instance to a string.
 *
 * @return The string version of this instance.
 */
SuiteMessageEvent.prototype.toString = function()
{
    var str = "type=" + this.type;
    str += ", scope=" + this.scope;
    str += ", appId=" + this.appId;
    str += ", extensionId=" + this.extensionId;
    str += ", data=" + this.xmlData();
    return str;
};

/**
 * @class HostMessageEvent
 * Event type for sending messages between extensions running within one
 * application.
 *
 * To send a message between host applications, use the
 * <code>SuiteMessageEvent</code> type.
 */
function HostMessageEvent(type)
{
    this.type = type;
    this.scope = VulcanMessageEvent.SCOPE_HOST;
};

HostMessageEvent.TYPE_PREFIX = VulcanMessageEvent.TYPE_PREFIX + "HostMessage.";
HostMessageEvent.dataTemplate = "<data>{0}</data>";
SuiteMessageEvent.payloadTemplate = "<payload>{0}</payload>";

HostMessageEvent.prototype = new VulcanMessageEvent(HostMessageEvent.TYPE_PREFIX);

/**
 * Retrieves the event data.
 *
 * @return A data string in XML format.
 */
HostMessageEvent.prototype.xmlData = function ()
{
    if(this.data == undefined)
    {
        var str = "";
        this.data = String.format(HostMessageEvent.dataTemplate, str);
    }

    return this.data;
};

/**
 * Initializes this event instance.
 *
 * @param event           A \c CSEvent instance to use for initialization.
 */
HostMessageEvent.prototype.initializeWithCSEvent = function(event)
{
    this.type = event.type;
    this.scope = event.scope;
    this.appId = event.appId;
    this.extensionId = event.extensionId;
    this.data = event.data;
};

/**
 * Sets the message payload of this event.
 *
 * @param payload           A string containing the message payload.
 */
HostMessageEvent.prototype.setPayload = function(payload)
{
    var str = cep.encoding.convertion.utf8_to_b64(payload);
    str = String.format(HostMessageEvent.payloadTemplate, str);
    this.data = String.format(HostMessageEvent.dataTemplate, str);
};

/**
 * Retrieves the message payload of this event.
 *
 * @return                  A string containing the message payload.
 */
HostMessageEvent.prototype.getPayload = function()
{
    var str = GetValueByKey(this.data, "payload");
    if(str != null)
    {
        return cep.encoding.convertion.b64_to_utf8(str);
    }

    return null;
};

/**
 * Converts the properties of this instance to a string.
 *
 * @return The string version of this instance.
 */
HostMessageEvent.prototype.toString = function()
{
    var str = "type=" + this.type;
    str += ", scope=" + this.scope;
    str += ", appId=" + this.appId;
    str += ", extensionId=" + this.extensionId;
    str += ", data=" + this.xmlData();
    return str;
};

//--------------------------------------- Util --------------------------------

/**
 * Formats a string based on a template.
 *
 * @param src The format template.
 *
 * @return The formatted string
 */
String.format = function(src)
{
    if (arguments.length == 0)
    {
        return null;
    }

    var args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
  });
};

/**
 * Retrieves the content of an XML element.
 *
 * @param xmlStr    The XML string.
 * @param key       The name of the tag.
 *
 * @return          The content of the tag, or the empty string if such tag is found
 *          or the tag has no content.
 */
function GetValueByKey(xmlStr, key)
{
    if(window.DOMParser)
    {
        var parser = new window.DOMParser();
        try
        {
            var xmlDoc = parser.parseFromString(xmlStr, "text/xml");
            var node = xmlDoc.getElementsByTagName(key)[0];
            if(node && node.childNodes[0])
            {
                return node.childNodes[0].nodeValue;
            }
        }
        catch(e)
        {
            //log the error
        }
    }
    return "";
};

/**
 * Reports whether required parameters are valid.
 *
 * @return    True if all required parameters are valid,
 *            false if any of the required parameters are invalid.
 */
function requiredParamsValid()
{
    for(var i = 0; i< arguments.length; i++)
    {
        var argument = arguments[i];
        if(argument == undefined || argument == null)
        {
            return false;
        }
    }

    return true;
};

/**
 * Reports whether a string has a given prefix.
 *
 * @param str       The target string.
 * @param prefix    The specific prefix string.
 *
 * @return          True if the string has the prefix, false if not.
 */
function strStartsWith(str, prefix)
{
    if(typeof str != "string")
    {
        return false;
    }
    return str.indexOf(prefix) === 0;
};

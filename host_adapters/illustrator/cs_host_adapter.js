/*
ADOBE SYSTEMS INCORPORATED
Copyright 2014 Adobe Systems Incorporated. All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in 
accordance with the terms of the Adobe license agreement accompanying it.  
If you have received this file from a source other than Adobe, then your 
use, modification, or distribution of it requires the prior written 
permission of Adobe.
*/
 
/**
 * EventAdapter provides the base implementation for Creative Cloud
 * application-specific event adapter libraries.
 * 
 * EventAdapter should not be instantiated directly to communicate with a host
 * application. Instead, use the application-specific inheritance of this object.
 * For example, to register listeners for Photoshop events, use the
 * PSEventAdapter.
 */
function EventAdapter(adapterNamespace) 
{
	// Assigned in constructor, vary according to subclass's namespace
	this.ADD_EVENT_LISTENER_EVENT = this.initQualifiedEventName(adapterNamespace, EventAdapter.ADD_EVENT_LISTENER_EVENT_NAME);
    this.REMOVE_EVENT_LISTENER_EVENT = this.initQualifiedEventName(adapterNamespace, EventAdapter.REMOVE_EVENT_LISTENER_EVENT_NAME);
    this.CPP_CS_EVENT_EVENT = this.initQualifiedEventName(adapterNamespace, EventAdapter.CPP_CS_EVENT_EVENT_NAME);
    this.PING_REQUEST_EVENT = this.initQualifiedEventName(adapterNamespace, EventAdapter.PING_REQUEST_EVENT_NAME); 
    this.PING_RESPONSE_EVENT = this.initQualifiedEventName(adapterNamespace, EventAdapter.PING_RESPONSE_EVENT_NAME);
	this.LIST_EVENTS_REQUEST_EVENT = this.initQualifiedEventName(adapterNamespace, EventAdapter.LIST_EVENTS_REQUEST_EVENT_NAME); 
	this.LIST_EVENTS_RESPONSE_EVENT = this.initQualifiedEventName(adapterNamespace, EventAdapter.LIST_EVENTS_RESPONSE_EVENT_NAME);
	
	this.dispatcherDelegate = this;
	
	this.userPingResponseHandler;
	this.pingStarted;
	this.userListEventsResponseHandler;
	
	this.csInterface = new CSInterface();
	
	this.eventListening = {};
	this.CPP_CS_EVENT_EVENT_added = false;
}

EventAdapter.ADD_EVENT_LISTENER_EVENT_NAME = "AddEventListener";
EventAdapter.REMOVE_EVENT_LISTENER_EVENT_NAME = "RemoveEventListener";
EventAdapter.CPP_CS_EVENT_EVENT_NAME = "CppEvent";
EventAdapter.PING_REQUEST_EVENT_NAME = "PingRequestEvent";
EventAdapter.PING_RESPONSE_EVENT_NAME = "PingResponseEvent";
EventAdapter.LIST_EVENTS_REQUEST_EVENT_NAME = "ListEventsRequestEvent";
EventAdapter.LIST_EVENTS_RESPONSE_EVENT_NAME = "ListEventsResponseEvent";

EventAdapter.prototype.initQualifiedEventName = function(ns, eventName)
{
	return ns + "." + eventName;
};

/**
 * Sends a 'ping' message to the host adapter plug-in and dispatches the response
 * to the specified handler.
 * 
 * A PingEvent is dispatched to responseHandler either when a response 
 * is received from the plug-in or after the specified timeout period.
 *  
 * his method provides a means of checking whether the required host adapter 
 * plug-in has been loaded by the host application, and therefore whether 
 * this library can be used to register event listeners.
 * 
 * @param responseHandler A listener function to which the resulting PingEvent
 * will be dispatched
 * @param timeout The number of milliseconds to wait for a response from the host adapter 
 * plug-in before it is considered not to be loaded
 */
EventAdapter.prototype.pingPlugIn = function(responseHandler, timeout)
{
	if (isNaN(timeout))
		timeout = 5000;
		
	var adapter = this;
	
	// Only do ping if another ping is not already pending
	if (! this.pingStarted)
	{
		this.userPingResponseHandler = responseHandler;
		this.csInterface.addEventListener(this.PING_RESPONSE_EVENT, pingResponseHandler);
		
		// Ping the plug-in
		setTimeout(
		    function(){adapter.dispatchToEventAdapter(adapter.PING_REQUEST_EVENT);}, 
			timeout);
		this.pingStarted = true;
	}
	else
	{
		alert("[EventAdapter]: Failed to ping plug-in - another ping response is pending");
	}
	
	function pingResponseHandler(event)
	{
		adapter.csInterface.removeEventListener(adapter.PING_RESPONSE_EVENT, pingResponseHandler);
		
		// If event type is adapter.PING_RESPONSE_EVENT, we received ping, else ping timed out
		var eventType = (event.type == adapter.PING_RESPONSE_EVENT) ? 
			PingEvent.PING_SUCCEEDED : PingEvent.PING_TIMED_OUT;
		
		// Dispatch event to user's ping event handler
		adapter.userPingResponseHandler(new PingEvent(eventType));

		adapter.pingStarted = false;
	}
};

/**
 * Helper method for subclasses which dispatches a CS event with the 
 * specified type and XML payload.
 * 
 * @param type the type of the CS event to dispatch
 * @param payload the data of the CS event, in well-formed XML 
 */
EventAdapter.prototype.dispatchToEventAdapter = function(type, payload)
{
	var e = new CSEvent(type, "APPLICATION", this.csInterface.getApplicationID());
	e.data = payload;
	this.csInterface.dispatchEvent(e);
};

EventAdapter.prototype.hasEventListener = function(eventType) {
	return this.eventListening[eventType];
};

/**
 * Registers a listener for the specified event, so that the 
 * listener receives notification of the event.
 * 
 * The set of allowed values for eventType varies depending on which 
 * Creative Cloud application is being targeted. The type of event 
 * dispatched to the listener will also vary depending on the target 
 * application.
 *
 * @param eventType The unique string identifier of the event to listen for.
 * @param listener The listener function that processes the event.
 */ 
EventAdapter.prototype.addEventListener = function(eventType, listener, useCapture, priority, useWeakReference)
{
	useCapture = useCapture === undefined ? false : useCapture;
	priority = priority === undefined ? 0 : priority;
	useWeakReference = useWeakReference === undefined ? false : useWeakReference;
	
	// Are we currently listening for the specified event type?
	// If not, we'll need to tell the plug-in to start listening for it
	var alreadyListening = this.hasEventListener(eventType);
	var listeners = alreadyListening ? this.eventListening[eventType] : {};
	listeners[listener] = listener;
	this.eventListening[eventType] = listeners;
	
	var adapter = this;
	
	if (!this.CPP_CS_EVENT_EVENT_added) {
	    this.CPP_CS_EVENT_EVENT_added = true;
	    this.csInterface.addEventListener(this.CPP_CS_EVENT_EVENT,
		    function (evt) {adapter.eventForwarder(evt);});
	}
		
	
	// If required, tell plug-in to register listener
	if (!alreadyListening)
		this.dispatchToEventAdapter(this.ADD_EVENT_LISTENER_EVENT, eventType);
};

/**
 * Called when an event is received from the plug-in. Extracts the data
 * sent from the plug-in, creates a corresponding event and 
 * dispatches it to the client.
 */
EventAdapter.prototype.eventForwarder = function(event)
{
	var appEvent = this.createAppEvent(event);
	var listeners = this.eventListening[appEvent.type];
    if (listeners) {
	    for (var listener in listeners)
	        listeners[listener].call(this, appEvent);
	}
};

/**
 * This method must be overridden by subclasses, or it will
 * throw an Error. It is called whenever a CS event is received from
 * the host adapter plug-in which requires translation.
 * 
 * @param event The CS event to translate
 * @return The translated event to dispatch
 */
EventAdapter.prototype.createAppEvent = function(event)
{
	throw new Error("EventAdapter.createAppEvent(..) must be overridden by subclasses");
};

/**
 * Removes an event listener for the specified event.
 * 
 * If no matching listener is registered with this event adapter, 
 * a call to this method has no effect.
 *
 * @param eventType The event type to remove the listener for
 * @param listener The listener object to remove
 * 
 */
EventAdapter.prototype.removeEventListener = function(eventType, listener, useCapture)
{
	useCapture = useCapture === undefined ? false : useCapture;
	
	var wasListening = this.hasEventListener(eventType);
	
	if (! wasListening)
	    return;
	
	var listeners = this.eventListening[eventType];
	var size = 0;
	
	if (listeners) {
	    if (listeners && listeners[listener]) {
	        delete listeners[listener];
		}
		
	    if (listeners) {
	        for (var key in listeners) {
	        	if (listeners.hasOwnProperty(key))
		            size++;
		    }
	    }
	}
	
	if (size == 0) {
	    delete this.eventListening[eventType];
	}
	
	// If we were listening for the event before, but now we're
	// not, then tell the plug-in to stop listening for it
	if(wasListening && !this.hasEventListener(eventType))
		this.dispatchToEventAdapter(this.REMOVE_EVENT_LISTENER_EVENT, eventType);
};

/**
 * Obtains a list of the events for which the host adapter plug-in is 
 * currently listening.
 * 
 * A ListEventsEvent is dispatched to responseHandler when the list of 
 * events is received from the host adapter plug-in.
 *  
 * This method provides a means of checking whether an event listener was 
 * successfully added or removed by the host adapter plug-in.
 * 
 * @param responseHandler A listener function to which the resulting 
 * ListEventsEvent will be dispatched
 */
EventAdapter.prototype.listEvents = function(responseHandler)
{
	this.userListEventsResponseHandler = responseHandler;
	this.csInterface.addEventListener(this.LIST_EVENTS_RESPONSE_EVENT, listEventsResponseHandler);
	this.dispatchToEventAdapter(this.LIST_EVENTS_REQUEST_EVENT);
	var adapter = this;
	
	function listEventsResponseHandler(evt)
	{
		adapter.csInterface.removeEventListener(adapter.LIST_EVENTS_RESPONSE_EVENT, listEventsResponseHandler);
		
		// Extract events data from event XML payload 
		var eventsArray = [];

		var parser = new DOMParser();
        var xmlDoc  = parser.parseFromString(evt.data.replace("<![CDATA[", "").replace("]]>", ""), "text/xml");
		var events = xmlDoc.firstChild.childNodes;
		for (var i = 0; i < events.length; i++)
		{
		    eventsArray.push(events[i].getAttribute("id"));
		}
		
		var eventToDispatch = new ListEventsEvent(ListEventsEvent.LIST, eventsArray);
		adapter.userListEventsResponseHandler(eventToDispatch);
	}
};

/**
 * Dispatched when a ping response is received from a host adapter 
 * plug-in, or when a ping request times out.
 * 
 */
function PingEvent(type)
{
	this.type = type;
}

/**
 * Defines the value of the type property of a ping_succeeded
 * event object.
 * 
 */
PingEvent.PING_SUCCEEDED = "pingSucceeded";

/**
 * Defines the value of the type property of a ping_timed_out 
 * event object.
 * 
 */
PingEvent.PING_TIMED_OUT = "pingTimedOut";

/**
 * Dispatched when a "list events" response is received from a host 
 * adapter plug-in.
 * 
 * The list property of this event contains a list of the
 * events which the host adapter was listening for at the time of 
 * event dispatch.
 * 
 * Constructs a ListEventsEvent with the specified type and event list array.
 * 
 * @param type	The ListEventsEvent type
 * @param list	The list of events the host adapter is listening for
 */
function ListEventsEvent(type, list)
{
	this.type = type;
	this._list = list;
};

/**
 * Defines the value of the type property of a ping_succeeded
 * event object.
 * 
 */
ListEventsEvent.LIST = "listEvents";

/**
 * The list of events being listened for by the host adapter plug-in 
 * which triggered this event. Typically each item in the array is a 
 * String representing an event's unique identifier, however this may
 * vary between host applications.
 * 
 */
ListEventsEvent.prototype.list = function()
{
	return this._list;
};
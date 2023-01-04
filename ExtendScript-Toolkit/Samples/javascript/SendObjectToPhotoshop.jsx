////////////////////////////////////////////////////////////////////////////
// ADOBE SYSTEMS INCORPORATED
// Copyright 2007 Adobe Systems Incorporated
// All Rights Reserved
//
// NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
// terms of the Adobe license agreement accompanying it.  If you have received this file from a
// source other than Adobe, then your use, modification, or distribution of it requires the prior
// written permission of Adobe.
/////////////////////////////////////////////////////////////////////////////

/** 
  @fileoverview Shows how to pass a custom JavaScript object using ExtendScript to another
  	application (Adobe Photoshop CS4) in a BridgeTalk message, and pass it back in a response.
  @class Shows how to pass a custom JavaScript object using ExtendScript to another
  	application (Adobe Photoshop CS4) in a BridgeTalk message, and pass it back in a response.
 
  <h4>Usage</h4>
  <ol>
  <li> Make sure Adobe Photoshop CS4 is running
  <li> Run the snippet in the ExtendScript Toolkit (ESTK).
  <li> Inspect the JavaScript Console in the ESTK for information on the sequence of messages and
  objects passed.
   <li>Note; there is no other visible output besides the trace to the JavaScript Console of the ESTK.
  </ol>
 
  <h4>Description</h4>

    <p>ExtendScript sends a BridgeTalk message to Photoshop, passing a
    JavaScript object. Photoshop reconstructs and modifies the object,
    then serializes the object and returns it as the result of the initial message.
    
    <p>In processing the result, ExtendScript evaluates the serialized object in order
    to reconstruct it.<br />
 
  @constructor Constructor 
 */
function SendObjectToPhotoshop() {

	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tAdobe Photoshop CS4 must be running.";
	$.level = 1; // Debugging level
}

/**
 Functional part of this snippet.  
 
 Constructs a BridgeTalk message, which contains both the script to 
 run in Photoshop, and the onResult callback for processing the response,
 then sends the message to Photoshop.

 <p>The script contains a serialized JavaScript object, reconstructs and
 modifies it on the target side, then reserializes and sends it back
 as the result.

 <p>The sender reconstructs the serialized object it receives as the result
 of the message.

 @return True if the snippet ran as expected, false if Photoshop is not running,
 or if an error occurred sending the message.
 @type Boolean
*/
SendObjectToPhotoshop.prototype.run = function() {
	
	var retval = true;
	if(!this.canRun()) {
		retval = false;	
		return retval;
	}


	// Create the message object
	var bt = new BridgeTalk();
	// The message target is Photoshop
	bt.target = "photoshop";
	
	// Create a custom JavaScript object with some properties
	var CustomObject = {};
	CustomObject.name = "A String";
	CustomObject.createdDate = new Date().toString();
	
	$.writeln("SendObjectToPhotoshop: ESTK - Custom object details:");
	$.writeln("SendObjectToPhotoshop: " + CustomObject.toSource());
	
	// Construct a string containing the body of the message,
	// a script to be evaluated by Photoshop.
	// The script contains the custom object, and causes Photoshop 
	// to modify its properties and send it back as the result
	scp = "";
	// serialize the object for sending
	scp += "var cm = eval(" + CustomObject.toSource() + ");";
	scp += "$.writeln('SendObjectToPhotoshop: Photoshop - Modifying object details...');";
	// modify the properties
	scp += "cm.name = cm.name + '_PS';";
	scp += "cm.modifiedDate = new Date().toString();";
	// serialize the modified object for return.
	// This is the last line of the script, so the serialized string 
	// is the result this evaluation, and is returned to Bridge
	scp += "cm.toSource();";  
			
	// The string containing the script is the body of the message.
	bt.body = scp;
	
	// ExtendScript handles the result of the message
	bt.onResult = function(resObj)
	{
		// Reconstruct the serialized object
		var returnedObject = eval(resObj.body);
		
		// Access the custom object's properties
		$.writeln("SendObjectToPhotoshop: ESTK - Custom object details after changes:");
		$.writeln(returnedObject.toSource());
	}
	
	// ExtendScript handles any errors  that occur when sending the initial message
	bt.onError = function(errObj)
	{
		$.writeln("SendObjectToPhotoshop: " + errObj.body);
		retval = false;
	}
	
	// Send the initial message from ExtendScript to Photoshop
	bt.send();	
	return retval;
}

/**
 Determines whether snippet can run given current context. The snippet 
 fails if these preconditions are not met:
 <ul>
 <li> Photoshop must be running
 </ul>

 @return True if this snippet can run, false otherwise
 @type Boolean
*/
SendObjectToPhotoshop.prototype.canRun = function() {
	
	// Photoshop must be running
	if(BridgeTalk.isRunning("photoshop")) {
		return true;
	}
	
	// Fail if these preconditions are not met.  
	$.writeln("ERROR:: Cannot run SendObjectToPhotoshop");
	$.writeln(this.requiredContext);
	return false;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SendObjectToPhotoshop_unitTest)  == "undefined") {
    new SendObjectToPhotoshop().run();
}
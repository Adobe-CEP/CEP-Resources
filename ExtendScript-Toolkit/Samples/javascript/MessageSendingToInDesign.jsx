////////////////////////////////////////////////////////////////////////////
// ADOBE SYSTEMS INCORPORATED
// Copyright 2008 Adobe Systems Incorporated
// All Rights Reserved
//
// NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
// terms of the Adobe license agreement accompanying it.  If you have received this file from a
// source other than Adobe, then your use, modification, or distribution of it requires the prior
// written permission of Adobe.
/////////////////////////////////////////////////////////////////////////////

/** 
  @fileoverview Demonstrates basic cross-application communication using BridgeTalk messages, communicating between ESTK CS4 and InDesign CS4.
  @class Demonstrates basic cross-application communication using BridgeTalk messages, communicating between ESTK CS4 and InDesign CS4.
  
  <h4>Usage</h4>
  <ol>
  <li> Make sure Adobe InDesign CS4 is running.
  <li> Run the snippet in the ExtendScript Toolkit.
  <li> Inspect the JavaScript Console in the Toolkit to see the sequence of messages between ESTK CS4 and InDesign CS4.
  <li>Switch to InDesign CS3; you should see a new document has been created, with a populated text frame.
  </ol>

  <h4>Description</h4>

  <p>This script creates a BridgeTalk message object and sends it from ESTK CS4 to InDesign CS4. The message sends a function
  (createInDesignObjects()), which is executed in the scripting engine of InDesign CS4 to create a new document with a populated text frame.<br />

  @constructor Constructor
 */
function MessageSendingToInDesign() {
	
	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tInDesign CS4 must be running.";
	$.level = 1; // Debugging level	
}

/**
 Functional part of this snippet. Constructs the BridgeTalk message, including an onResult callback,
 and passes it to InDesign.

 @return True if the snippet ran as expected, false otherwise.  
 @type Boolean
*/
MessageSendingToInDesign.prototype.run = function() {
	var retval = true;
	if(!this.canRun()) {
		retval = false;	
		return retval;
	}
	// Create the message object
	var bt = new BridgeTalk();
	// Initialize with the target and message string
	bt.target = "indesign";
	bt.body = "var SnpSentMessage = {}; SnpSentMessage.create = " + createInDesignObjects.toString();
	bt.body += "SnpSentMessage.create();"
	
	// Handle error case
	bt.onError = function(errObj)
	{
		$.writeln(errObj.body);
	}
	
	// Handler to get the result of the message, so we know when it is completed and with what result
	bt.onResult = function(resObj)
	{
		// The result of executing the code is the last line of the script that was executed in the target (InDesign)
		var retval = eval(resObj.body);
		$.writeln("MessageSendingToInDesign: (ESTK) received result = " + retval);
		$.writeln("MessageSendingToInDesign: (ESTK) the process of creating objects in InDesign has finished...");
		// Now we're done, switch the front app to be InDesign to see the result
		BridgeTalk.bringToFront("indesign");
	}

	$.writeln("MessageSendingToInDesign: (ESTK) about to send initial message to InDesign");
	// Send the message
	bt.send();
	$.writeln("MessageSendingToInDesign: (ESTK) BridgeTalk.send() invoked, MessageSendingToInDesign.run() exiting");
		 
	return retval;
}

/**
 Determines whether snippet can be run given current context.  The snippet 
 fails if these preconditions are not met:
 <ul>
 <li> InDesign must be running
 </ul>

 @return True if this snippet can run, false otherwise
 @type Boolean
*/
MessageSendingToInDesign.prototype.canRun = function() {
	// Must run in ESTK
	// InDesign must be running
	if(BridgeTalk.isRunning("indesign")) {
		return true;
	}
	// Fail if these preconditions are not met. 
	$.writeln("ERROR:: Cannot run MessageSendingToInDesign");
	$.writeln(this.requiredContext);
	return false;
}

/**
 This is code that will only run within the InDesign scripting engine, but we send it to InDesign
 by serializing the function to a string and sending it as part of a BridgeTalk message.
*/
function createInDesignObjects() {
	$.writeln("MessageSendingToInDesign: (InDesign) entering createInDesignObjects");
	var mylayername = "snpsendmessagetoidlayer";
	var mydoc = app.documents.add();
	var mylayer = mydoc.layers.add({name: mylayername});
	with(mydoc.pages.item(0)) {
			myframe = textFrames.add(mydoc.layers.item(mylayername));
			myframe.geometricBounds = ["6p0", "6p0", "18p0", "18p0"];
			myframe.contents = "Hello World from MessageSendingToInDesign";
	}
	$.writeln("MessageSendingToInDesign: (InDesign) leaving createInDesignObjects");
	return true;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(MessageSendingToInDesign_unitTest )  == "undefined") {
	new MessageSendingToInDesign().run();
}
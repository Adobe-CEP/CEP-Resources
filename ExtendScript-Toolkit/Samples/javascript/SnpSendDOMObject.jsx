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
  @fileoverview Shows how to pass a scripting DOM object from Adobe Photoshop CS4 to the ExtendScript toolkit
  	in a BridgeTalk message.
  @class Shows how to pass a scripting DOM object from Adobe Photoshop CS4 to the ExtendScript toolkit
  	in a BridgeTalk message.
 
  <h4>Usage</h4>
  <ol>
  <li> Make sure Adobe Photoshop CS4 is running
  <li> Run the snippet in the ExtendScript Toolkit
  <li> Inspect the JavaScript Console in the Toolkit to see information about the messages and objects passed between the applications.
    <li>Note; there is no other visible output besides the trace to the JavaScript Console of the ESTK.
  </ol>
 
  <h4>Description</h4>

  <p>Demonstrates passing a DOM object from Adobe Photoshop CS4 to Adobe ExtendScript toolkit via BridgeTalk.  
  The passed script within the BridgeTalk message creates a File instance and then serialises
  it with toSource().  When the ESTK receives the BridgeTalk message response, it can access the DOM object 
  created by Adobe Photoshop and its properties by using eval() on the 'resObj.body' which is 
  returned to the callback function BridgeTalk.onResult().<br />
 
  @constructor  Constructor 
 */
function SendDOMObjectToPhotoshop()
{
	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tPhotoshop must be running.";
	$.level = 1; // Debugging level
}

/**
 Functional part of this snippet.  
 
  Constructs a BridgeTalk message, which contains both the script to 
  run in Photoshop, and the onResult callback for processing the response,
  then sends the message to Photoshop.

  <p>The script creates a DOM object on the target side, and serializes it
  in order to return it as the result of evaluation.

 @return True if the snippet ran as expected, false if Photoshop is
 not running or if an error occurred sending the message.
 @type Boolean
*/
SendDOMObjectToPhotoshop.prototype.run = function()
{
	var retval = true;
	if(!this.canRun()) {
		retval = false;	
		return retval;
	}

	try	
	{
		// Create the message object
		var bt = new BridgeTalk();
		// The message target is Photoshop
		bt.target = "Photoshop";
		
		// Construct a string containing the body of the message,
		// a script to be evaluated by Photoshop.
		var scp = "$.writeln('SendDOMObjectToPhotoshop: Photoshop - Creating DOM object');";
		// create a DOM object on the target side
		scp += "var f = new Folder(Folder.myDocuments);";
		// serialize the object to return as the result of evaluation
		scp += "f.toSource();";
		// The string containing the script is the body of the message.
		bt.body = scp;
		
		// ExtendScript handles the result of the message
		bt.onResult = function(resObj)
		{
			// Use eval() to reconstruct the serialized object
			$.writeln("SendDOMObjectToPhotoshop: ESTK - Received and reconstructing object...");
			f = eval(resObj.body);
			
			// Access the object's properties
			$.writeln("SendDOMObjectToPhotoshop: ESTK - Folder Name = " + f.fsName);
			$.writeln("SendDOMObjectToPhotoshop: ESTK - Folder created = " + f.created);
		}
		
		// extendScript handles any errors  that occur when sending the initial message
		bt.onError = function(errObj)
		{
			$.writeln("SendDOMObjectToPhotoshop: " + errObj.body);
			retval = false;
		}

		// Send the initial message from ExtendScript to Photoshop
		bt.send();
		
	}
	catch(error) { $.writeln("SendDOMObjectToPhotoshop: " + error); }

	return retval;
}

/**
 Determines whether snippet can run given current context.  The snippet  
 fails if these preconditions are not met: 
 <ul>
 <li> Photoshop must be running
 </ul>

 @return True if this snippet can run, false otherwise
 @type Boolean
*/
SendDOMObjectToPhotoshop.prototype.canRun = function()
{	
	// Photoshop must be running
	if(BridgeTalk.isRunning("photoshop")) {
		return true;
	}
	
	// Fail if these preconditions are not met.  
	$.writeln("ERROR:: Cannot run SendDOMObjectToPhotoshop");
	$.writeln(this.requiredContext);
	return false;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SendDOMObjectToPhotoshop_unitTest)  == "undefined") {
    new SendDOMObjectToPhotoshop().run();
}
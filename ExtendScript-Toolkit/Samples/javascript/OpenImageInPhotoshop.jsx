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
  @fileoverview Shows how to use the cross-DOM to open a file in Adobe Photoshop. 
  @class Shows how to use the cross-DOM to open a file in Adobe Photoshop. 
 
  <h4>Usage</h4>
  <ol>
  <li>Open the snippet in the ExtendScript Toolkit (see Readme.txt).
  <li> Make sure Adobe Photoshop CS4 is running
  <li>When you execute the snippet, you should find the file opened in Photoshop.
  </ol>
 
  <h4>Description</h4>

  <p>The image file in the resources folder will be opened in Photoshop.<br />
 
  @constructor
  Constructor.
 */
function OpenImageInPhotoshop()
{
	// Tells us where this script is running from
	var scriptsFile = new File($.fileName);

	/**
	 The Image file to be used to load into Adobe Photoshop
	 @type File
	*/
	this.imageFile = new File(scriptsFile.parent.parent.fsName + "/resources/OpenImageInPhotoshop.jpg");

	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tExecute against ESTK\nAdobe Photoshop CS4 must be running and\nthe image file exists in the Resources folder.";
	$.level = 1; // Debugging level
}
/**
 Functional part of this snippet.  
 
 Sends the image file to Photoshop for editing, using a cross-DOM function.

 @return  True if the snippet ran as expected, false otherwise.  
 @type Boolean
*/
OpenImageInPhotoshop.prototype.run = function()
{
	var retval = true;
	if(!this.canRun())
	{
		retval = false;	
		return retval;
	}
	$.writeln("Starting OpenImageInphotoshop");
	// send image to Photoshop using the Cross-DOM open() function
	photoshop.open(new File(this.imageFile));
	$.writeln("Finished OpenImageInPhotoshop");
	return retval;
}

/**
 Determines whether snippet can be run given current context.  The snippet will
 fail if these preconditions are not met: 

 <ul>
 <li> The image file SnpOpenInPhotoshop.jpg is in the resources folder.
 <li> Photoshop must be running
 </ul>

 @return True if this snippet can run, false otherwise
 @type Boolean
*/
OpenImageInPhotoshop.prototype.canRun = function()
{	
	// Photoshop must be running
	// file must exist
	if(BridgeTalk.isRunning("photoshop") && this.imageFile.exists) 
	{
		return true;		
	}
	
	// Fail if these preconditions are not met 
	$.writeln("ERROR:: Cannot run OpenImageInPhotoshop");
	$.writeln(this.requiredContext);
	return false;	
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(OpenImageInPhotoshop_unitTest)  == "undefined") {
    new OpenImageInPhotoshop().run();
}

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
  @fileoverview Shows how to send one or more files from ESTK CS4 to Adobe Photoshop CSS to be saved in PNG format.
  @class Shows how to send files from ESTK CS4 to Adobe Photoshop CS4 to be saved in PNG format.
 
  <h4>Usage</h4>
  <ol>
  <li> Make sure you have Adobe Photoshop CS4 running
  <li> In ExtendScript Toolkit set Target to any application that supports ScriptUI
  <li> The image file 'SaveAsDifferentFileType.jpg' should be located in <extendScriptroot>/sdksamples/resources/.
  <li> Run this snippet
  <li>You should see a PNG image file created from the original image described above, located in the resources folder. The PNG image filename
  should begin snp... and match the first part of the image filename originally selected; for example, if you chose image- so if you chose myImage.psd, the
  output file would be snpmyImage.png.
  </ol>
 
   <h4> Description</h4>
  Uses interapplication messaging to send files from your chosen application to Photoshop to be saved in PNG format.
  When Photoshop receives the message, it begins processing the file. 

  @constructor Constructor
 */
function SaveAsDifferentFileType()
{
	// Tells us where this script is running from
	var scriptsFile = new File($.fileName);

	/**
	 The Image file to be used to load into Adobe Photoshop
	 @type File
	*/
	this.imageFile = new File(scriptsFile.parent.parent.fsName + "/resources/SaveAsDifferentFileType.jpg");
	$.writeln(this.imageFile);

	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tExecute against ExtendScript ToolKit\nAdobe Photoshop CS4 must be running and\n" 
		+ "the image file must exist in the Resources folder.";
	$.level = 2; // Debugging level
}

/**
 Functional part of this snippet.  Creates the BridgeTalk message to send to Photoshop.
 @return True if the snippet ran as expected, false otherwise. Returns false if the file 'SaveAsDifferentFileType.jpg'
 or Photoshop is not running.
 @type Boolean
*/
SaveAsDifferentFileType.prototype.run = function()
{
	var retval = true;
	if(!this.canRun()) {
		retval = false;	
		return retval;
	}
	
	// Create the message
		var scr = "$.writeln('SaveAsDifferentFileType:: in Photoshop: received file(s)...');"; 
		// Serialize the array into a string
		scr += "var img = eval(" + this.imageFile.toSource() + ");"  // must serialize / deserialize objects to be sent  
		//scr += "photoshop.open(new File(img));";
		scr += "app.open (img);";
		scr += "thePNGFile = new File(img.path + '/' + 'snp' + img.name);";
		scr += "options = new PNGSaveOptions();";
		scr += "activeDocument.saveAs (thePNGFile ,options , true, Extension.LOWERCASE);";
		scr += "activeDocument.close(SaveOptions.DONOTSAVECHANGES);";
		scr += "$.writeln('SaveAsDifferentFileType: in Photoshop: ' + '  image ' + img.fsName + ' saved as a PNG.');";

		// Create and initialize the message object
		var bt = new BridgeTalk();
		bt.target = "photoshop";
		bt.body = scr;
		// Define message callbacks
		bt.onError = function(eObj){ retval = false; $.writeln(eObj.body); }

		bt.onResult = function(obj) 
		{ 
			$.writeln("SaveAsDifferentFileType:: in ExtendScript: Done (onResult message received).");
		}
		// Send the message
		bt.send();

	return retval;
}

/**
 Determines whether snippet can be run given current context.  The snippet will
 fail if these preconditions are not met: 
 <ul>
 <li> Photoshop must be running
 <li> File 'SaveAsDifferentFileType.jpg' must exist in the sdksamples/resources directory
 </ul>

 @return True if this snippet can run, false otherwise
 @type Boolean
*/
SaveAsDifferentFileType.prototype.canRun = function()
{	
	
	// Photoshop must be running and file must exist. 
	if(BridgeTalk.isRunning("photoshop") && (this.imageFile.exists)) 
	{
		return true;
	}
	// Fail if these preconditions are not met.
	$.writeln("ERROR:: Cannot run SaveAsDifferentFileType");
	$.writeln(this.requiredContext);
	return false;
}

/**
 "main program": construct an anonymous instance and run it
*/
new SaveAsDifferentFileType().run();

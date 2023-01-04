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
  @fileoverview Loads and executes a basic  external object, showing how to use the "direct" interface to an
  ExternalObject in a shared library written in C/C++
  
  @class Loads and executes a basic external object, showing how to use the "direct" interface to an
  ExternalObject in a shared library written in C/C++
  
  Usage:
	Display the sample in the ExtendScript Toolkit.
     <li> In the ExtendScript Toolkit run the sample.
	<li> A dialog called 'loadExternalObject' will appear with a start button.  Click the start button to trigger communication with the external object. 
	<li> The dialog window will display the communcation between the jsx file and external object.
	<li> A new dialog window will appear with an OK button.  Clicking this will close the connection with the external object.
	<li>Click the close button to end the sample</li>
 
  Description:
  The script loads an external library by using the ExternalObject constructor.  Once the library is loaded,
   a dialog window will appear.  When the buttons is clicked, functions in the library
   are called and the results are displayed in the Dialog window.
 
 */
function LoadExternalObject() 
{
	/**
	 The context in which this snippet can run.
	*/
	this.requiredContext = "\tThe external library needs to be available\n";	
}

/**
 Functional part of this snippet.
 @return True if the sample ran as expected, false if otherwise
 @type boolean
*/
LoadExternalObject.prototype.run = function()
{
	
	if(!this.canRun()) 
	{
		return false;
	}
	
	// holder for all output
	var receivedText = "Click 'Start' to begin ";
	var libPath = this.getLibPath();
	var basiceo = new ExternalObject("lib:" + libPath);

	// Create a dialog that will trigger further interactions with the External object
	var startdlg = new Window('dialog','LoadExternalObject');
	startdlg.pnl = startdlg.add('panel', undefined,'',{bounds:[100,100,480,490]});
	startdlg.pnl.button = startdlg.pnl.add('button', undefined, 'Start');
	startdlg.pnl.buttoncl = startdlg.pnl.add('button', undefined, 'Close');
	
	startdlg.displayPnl = startdlg.add('panel', undefined, 'Output', {bounds:[100,100,480,490]});
	startdlg.displayPnl.textReceived = startdlg.displayPnl.add('edittext', undefined,receivedText, {multiline:true,enabled:false});
	with(startdlg.displayPnl.textReceived){
		bounds = [15,15,360,150];
	}

	startdlg.pnl.buttoncl.onClick = function(){
			startdlg.close();
	}
	// handler for when button is clicked
	startdlg.pnl.button.onClick = function(){
		// The compute an average
		receivedText = receivedText + "\nCalling getAverage()\nAverage: " + basiceo.getAverage(10, 20, 55); // must pass in numbers
		startdlg.displayPnl.textReceived.text = receivedText;
		
		// Append something onto our string
		receivedText = receivedText + "\nCalling appendString()\nString: " + basiceo.appendString("My String");
		startdlg.displayPnl.textReceived.text = receivedText;
		// Get an array
		var arr = basiceo.makeArray(); 
		receivedText = receivedText + "\nAbout to Loop through the array returned by makeArray()";
		startdlg.displayPnl.textReceived.text = receivedText;
		for(i=0; i < arr.length; i++) 
		{
			receivedText = receivedText + "\narr[" + i + "] = " + arr[i];
			startdlg.displayPnl.textReceived.text = receivedText;
		}

		receivedText = receivedText + "\nCalling acceptBoolean()\nBoolean: " + basiceo.acceptBoolean(true);
		startdlg.displayPnl.textReceived.text = receivedText;
		
		// Get a script from the external object.  This will create a new dialog window.
		receivedText =  receivedText + "\nCalling myScript() from External Object";
		startdlg.displayPnl.textReceived.text = receivedText;
		basiceo.myScript();
		
	}
	startdlg.show();
	
	return true;
}

/**
 Returns the expected path to the library for this sample
 @return  Returns the path to the library file
 @type String
*/
LoadExternalObject.prototype.getLibPath = function()
{

	var isWin = (File.fs == "Windows");
	var libFilename = (isWin) ? "BasicExternalObject.dll" : "BasicExternalObject.framework";
	Folder.current = File ($.fileName).parent.parent;
	
	var libPath;

	if(isWin)
	{
		// release
		libPath = Folder.current.fsName + "\\build\\basicexternalobject\\win\\Release\\" + libFilename;
		// Debug
		//libPath = Folder.current.fsName + "\\build\\basicexternalobject\\win\\Debug\\" + libFilename;
	}
	else //  running on mac
	{
		// release
	    libPath = Folder.current.fsName + "/build/basicexternalobject/mac/Release/" + libFilename;
		// Debug
		//libPath = Folder.current.fsName + "/build/basicexternalobject/mac/Debug/" + libFilename;
	}

	return libPath;
}


/**
 Determines whether snippet can be run given current context.  The snippet will
 fail if these preconditions are not met: 
 <li> The library file must be available
 @return True is this snippet can run, false if otherwise
 @type boolean
*/
LoadExternalObject.prototype.canRun = function()
{
	var libFile = new File(this.getLibPath());

	if(libFile.exists) 
	{ 
		return true;
	}
	$.writeln("LoadExternalObject: ERROR - loading library");
	$.writeln(this.requiredContext);
	return false;
}

/**
 "main program": construct an anonymous instance and run it
*/
new LoadExternalObject().run();

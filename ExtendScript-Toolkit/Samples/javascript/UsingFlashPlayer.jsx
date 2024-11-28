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
 @fileoverview Shows how to load and run a Flash movie using the ScriptUI FlashPlayer.
  @class Shows how to load and run a Flash movie using the ScriptUI FlashPlayer.
 
  <h4>Usage</h4>
	
  <ol>
  <li>Run the snippet in the ExtendScript Toolkit (see Readme.txt).
  <li>You should see a dialog window showing a Flash movie.
  </ol>
 
 <h4>Description</h4>
 
 <p>Creates a dialog window that plays a Flash movie.

 <p>The dialog contains ScriptUI components, including control buttons and a FlashPlayer element.<br />

 <p>Loads the Flash movie, an SWF file, into the FlashPlayer component using control's loadMovie() function.
 The 'file' parameter must be a valid ExtendScript File object that references any type of Flash file. 
 
 <p>See the JavaScript Tools Guide for details of the controls available for the Flash Player.<br />

 @see FlashDemo
 
  @constructor Constructor
*/
function UsingFlashPlayer() {

	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tThe Flash file 'UsingFlashPlayer.swf' must be available in the resources folder.";	

	// Tells us where this script is running from
	var scriptsFile = new File($.fileName);

	/**
	 The Flash movie to load into the dialog window
	 @type File
	*/
	this.flashFile = new File(scriptsFile.parent.parent.fsName + "/resources/UsingFlashPlayer.swf");
	
	this.paletteRef = null;
}

/**
 Functional part of this snippet.  
 
 Creates a dialog window and adds the ScriptUI components to it. 
 Creates event handlers for the buttons that control the playback.
	@return True if the snippet ran as expected, false otherwise
 	@type Boolean
*/
UsingFlashPlayer.prototype.run = function() 
{
	if(!this.canRun()) 
	{
		return false;
	}
	
	$.writeln("About to run UsingFlashPlayer");
	
	// Create a dialog window
	var flashPalette = new Window('dialog', 'SDK UsingFlashPlayer - Flash Player');
	this.paletteRef = flashPalette;
		
	// add the elements to the palette
	var pnl = flashPalette.add("group");

	var flashPlayer = pnl.add("flashplayer", pnl.bounds);
	flashPlayer.preferredSize = [300, 300];
	
	var btnGroup = flashPalette.add("group");
	
	//var startBtn = btnGroup.add("button", undefined, "Start Movie");
	//var stopBtn = btnGroup.add("button", undefined, "Stop Movie");
	var closeBtn = btnGroup.add("button", undefined, "Close");
	
	closeBtn.onClick = function(){
			flashPalette.close();
	}
	// Load and play the Flash movie. 
	flashPlayer.loadMovie(this.flashFile);

	// Behavior for Stop button - No longer available, use this as a mechanism to control stopping the flash player within the SWF.
	// See ActionScriptDemo sample for examples of communicating between ESTK and SWF file
	/*stopBtn.onClick = function()
	{
		// Pause the playback
		flashPlayer.stopMovie();
	}*/

	// Behavior for Start button 
	/*startBtn.onClick = function()
	{
		// Restart the movie from where it paused.
		flashPlayer.playMovie(false);
	}*/
	
	flashPalette.show();
	$.writeln("Ran UsingFlashPlayer");
	
	return true;
}


/**
 Determines whether snippet can be run given current context. The snippet  
 fails if these preconditions are not met: 
 <ul>
 <li> The SWF file must exist in the file system.
 </ul>
 	@return True is this snippet can run, false otherwise
 	@type Boolean
*/
UsingFlashPlayer.prototype.canRun = function() 
{
	if(this.flashFile.exists) 
	{ 
		return true;
	}
	$.writeln("ERROR:: Cannot run UsingFlashPlayer");
	$.writeln(this.requiredContext);
	return false;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(UsingFlashPlayer_unitTest) == "undefined") {
    new UsingFlashPlayer().run();
}

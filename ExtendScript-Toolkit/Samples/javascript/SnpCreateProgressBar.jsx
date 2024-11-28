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
  @fileoverview Shows how to use a progress bar ScriptUI component. 
  @class Shows how to use a progress bar ScriptUI component. 
 
  <h4>Usage</h4>
  <ol>
  <li> Open this file and run it in the ExtendScript Toolkit. 
       You can choose as the target any application that supports ScriptUI
  <li> Press Start in the displayed dialog and watch progress bar update
  <li> Press Reset to return the progress bar to its initial state
  </ol>
 
  <h4>Description</h4>
 
   <p>Creates a dialog containing a progress bar, a button that updates
   its value periodically, and another button that resets the progress to 0.<br />

  
  @constructor Constructor.
 */
function SnpCreateProgressBar () 
{
	this.windowRef = null;
}

/**
 Create a window, add a progress-bar control, a text label, and buttons. 
 Define behavior for the buttons that increment or reset the progress value.

 @return True if the snippet ran as expected, false  otherwise. 
 @type Boolean
*/
SnpCreateProgressBar.prototype.run = function() {
	var retval = true;
	
	// Create a palette-type window (a modeless or floating dialog),
	var win = new Window("palette", "SnpCreateProgressBar", [150, 150, 600, 300]); 
	this.windowRef = win;
	// Add a panel to contain the components
	win.pnl = win.add("panel", [10, 10, 440, 100], "Click Start to move the Progress bar");

	// Add a progress bar with a label and initial value of 0, max value of 200.
	win.pnl.progBarLabel = win.pnl.add("statictext", [20, 20, 320, 35], "Progress");
	win.pnl.progBar = win.pnl.add("progressbar", [20, 35, 410, 60], 0, 200);
	
	// Add buttons
	win.goButton = win.add("button", [25, 110, 125, 140], "Start");
	win.resetButton = win.add("button", [150, 110, 250, 140], "Reset");
	win.doneButton = win.add("button", [310, 110, 410, 140], "Done");


	// Define behavior for the "Done" button
	win.doneButton.onClick = function ()
	{
		win.close();
	};
	
	// Define behavior for the "Start" button
	win.goButton.onClick = function ()
	{
		while(win.pnl.progBar.value < win.pnl.progBar.maxvalue)
		{
			// this is what causes the progress bar increase its progress
			win.pnl.progBar.value++; 
			$.sleep(10);
		}
		$.writeln("Progress Bar Complete");
		
	};

	// Define behavior for the "Reset" button
	win.resetButton.onClick = function()
	{ 
		// set the progress back to 0
		win.pnl.progBar.value = 0; 
		$.writeln("Progress Bar Reset");
	}

	// Display the window
	win.show();

	return retval;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCreateProgressBar_unitTest) == "undefined") {
    new SnpCreateProgressBar().run();
}

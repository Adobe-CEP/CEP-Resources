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
  @fileoverview Shows how to use a slider ScriptUI component.
  @class Shows how to use a slider ScriptUI component.
 
  <h4>Usage</h4>
  <ol>
  <li> Open this file and run it in the ExtendScript Toolkit. 
       You can choose as the target any application that supports ScriptUI
  <li> Move the slider in the displayed dialog and watch the label update.
  </ol>
 
  <h4>Description</h4>

  <p>Creates a dialog containing a slider and a text component. The current value 
  is reflected in the text.<br />
  
  @constructor Constructor.
 */
function SnpCreateSlider () 
{
	this.windowRef = null;
}

/**
 Create a window, add a slider control and a text label. Define behavior for the slider
 that updates the text in the label.

 @return True if the snippet ran as expected, false  otherwise.  
 @type Boolean
*/
SnpCreateSlider.prototype.run = function() {
	var retval = true;
	
	// Create a palette-type window (a modeless or floating dialog),
	var win = new Window("palette", "SnpCreateSlider", [150, 150, 600, 300]); 
	this.windowRef = win;
	
	// Add a panel to contain the components
	win.pnl = win.add("panel", [10, 10, 440, 100], "Move slider around");
	// Add some labels that describe the state of the slider
	win.pnl.minLbl = win.pnl.add("statictext", [20, 47, 35, 60], "0");
	win.pnl.curLbl = win.pnl.add("statictext", [115, 47, 170, 60], "100");
	win.pnl.maxLbl = win.pnl.add("statictext", [210, 47, 250, 60], "200");
	win.pnl.displayTextLbl = win.pnl.add("statictext", [290, 20, 380, 40], "Current value:");
	win.pnl.displayLbl = win.pnl.add("statictext", [385, 20, 425, 40], "100");
	// Add a slider control
	win.pnl.sliderCtrl = win.pnl.add("slider", [20, 20, 230, 45], 100, 0, 200);

	// Add buttons
	win.resetButton = win.add("button", [25, 110, 125, 140], "Reset");
	win.doneButton = win.add("button",[320, 110, 420, 140] , "Done");

	// Define behavior for when the slider value changes
	win.pnl.sliderCtrl.onChanging = function() 
	{
		var val = Math.round(win.pnl.sliderCtrl.value);
		// Update the label text with the current slider value.
		win.pnl.displayLbl.text = val;
	};
	
	// Define behavior for the "Exit" button 
	win.doneButton.onClick = function ()
	{
		win.close();
	};

	// Define behavior for the "Reset" button 
	win.resetButton.onClick = function()
	{ 
		win.pnl.sliderCtrl.value = 100;
		win.pnl.curLbl.text = 100;
		win.pnl.displayLbl.text= 100;
	}

	// Display the window
	win.show();

	return retval;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCreateSlider_unitTest) == "undefined") {
    new SnpCreateSlider().run();
}





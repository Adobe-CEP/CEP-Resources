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
  @fileoverview Shows how to create a basic ScriptUI dialog.
  @class Shows how to create a basic ScriptUI dialog.
 
  <h4>Usage</h4>

  <ol>
  <li>Run the snippet in the ExtendScript Toolkit (see Readme.txt).
     This snippet can run in any application that supports ScriptUI.
 <li>A dialog appears, which emits trace statements to the JavaScript console to indicate which button was pressed.
 </ol>
  
  <h4>Description</h4>

  <p>Creates and shows a simple ScriptUI modeless dialog (also called a palette)
  with OK/Cancel buttons and event listeners that implement the button behavior.<br ./>
  
  @constructor Constructor.
 */
function SnpCreateDialog() 
{
	this.windowRef = null;
}

/**
 Functional part of this snippet. 
 
 Create a window of type "palette" (a modeless dialog) and display it.

 @return True if the snippet ran as expected, false otherwise.
 @type Boolean
*/
SnpCreateDialog.prototype.run = function()
{
	// Create a window of type palette.
	var win = new Window("palette", "SnpCreateDialog",[100,100,380,245]);  // bounds = [left, top, right, bottom]
	this.windowRef = win;
	// Add a frame for the contents.
	win.btnPanel = win.add("panel", [25,15,255,130], "SnpCreateDialog");
	// Add the components, two buttons
	win.btnPanel.okBtn = win.btnPanel.add("button", [15,65,105,85], "OK");
	win.btnPanel.cancelBtn = win.btnPanel.add("button", [120, 65, 210, 85], "Cancel");
	// Register event listeners that define the button behavior
	win.btnPanel.okBtn.onClick = function() {
		$.writeln("OK pressed");
		win.close();
	};
	win.btnPanel.cancelBtn.onClick = function() {
		$.writeln("Cancel pressed");
		win.close();
	};

	// Display the window
	win.show();
		
	return true;
		
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCreateDialog_unitTest) == "undefined") {
    new SnpCreateDialog().run();
}


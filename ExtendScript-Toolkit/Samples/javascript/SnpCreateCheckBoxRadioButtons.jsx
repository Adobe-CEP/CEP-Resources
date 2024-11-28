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
  @fileoverview Demonstrates the use of checkboxes and radio buttons and their associated event listeners.
  @class Demonstrates the use of checkboxes and radio buttons and their associated event listeners.
 
  <h4>Usage</h4>
  <ol>
  <li> Run from ExtendScript Toolkit
  <li> Select different combinations of buttons to enable / disable components
  </ol>
 
  <h4>Description</h4>
  
  <p>Click the check boxes and radio buttons to change the text in the text boxes and disable components.<br />
  
  @constructor
  Constructor.
 */
function SnpCreateCheckBoxRadioButtons() 
{
    /**
        Maintain reference to the window we created
	  @type Window
    */
    this.windowRef = null;
}

/**
 Functional part of this snippet.  Create the window and add the ScriptUI components.  Several
 event handlers are registered to capture user input.
 
 @return boolean True if the snippet ran as expected, false if otherwise. For this snippet,
 there is at present no code path that can return false, as the snippet can run in any app
 that supports ScriptUI.
 @type boolean
*/
SnpCreateCheckBoxRadioButtons.prototype.run = function()
{
	var retval = true;
	
	// Create the window
	var win = new Window("palette", "Check and Radio", [150, 150, 460, 455]); // bounds = [left, top, right, bottom]
	this.windowRef = win;
	// Add a panel
	win.radioPanel = win.add("panel", [25, 15, 285, 130], "Radiobuttons");
	win.checkPanel = win.add("panel", [25, 150, 285, 265], "Checkboxes");

	// Add checkboxes
	win.checkPanel.chkOne = win.checkPanel.add("checkbox", [10, 15, 125, 35], "Checkbox One");
	win.checkPanel.chkTwo = win.checkPanel.add("checkbox", [10, 45, 125, 65], "Checkbox Two");
	win.checkPanel.chkDisable = win.checkPanel.add("checkbox", [10, 75, 125, 95], "Disabled");
	
	// Add radio buttons
	win.radioPanel.radOne = win.radioPanel.add("radiobutton", [10, 15, 140, 35], "Radio Button One");
	win.radioPanel.radTwo = win.radioPanel.add("radiobutton", [10, 45, 140, 65], "Radio Button Two");
	win.radioPanel.radThree = win.radioPanel.add("radiobutton", [10, 75, 150, 95], "Radio Button Three");
	// Select the first radio button
	win.radioPanel.radOne.value = true;
	
	// Add text labels
	win.radioPanel.radTxtOne = win.radioPanel.add('edittext', [150, 15, 230, 35], '');
	win.checkPanel.chkTxtOne = win.checkPanel.add('edittext', [140, 15, 230, 35], '');
	win.checkPanel.chkTxtTwo = win.checkPanel.add('edittext', [140, 45, 230, 65], '');

	win.quitBtn = win.add("button", [110,275,200,295], "Done");
	
	// Event listener for the first two checkboxes
	win.checkPanel.chkOne.onClick = win.checkPanel.chkTwo.onClick = function () {
		win.checkPanel.chkTxtOne.text = (win.checkPanel.chkOne.value) ? "Selected" : "";
		win.checkPanel.chkTxtTwo.text = (win.checkPanel.chkTwo.value) ? "Selected" : "";
	};

	// Event listener for the check-box to disable the other checkboxes
	win.checkPanel.chkDisable.onClick = function () {
		if(win.checkPanel.chkDisable.value) {
			win.checkPanel.chkOne.enabled = false;
			win.checkPanel.chkTwo.enabled = false;
		}
		else {
			win.checkPanel.chkOne.enabled = true;
			win.checkPanel.chkTwo.enabled = true;
		}
	};

	// Event listener for the radio buttons
	win.radioPanel.radOne.onClick = win.radioPanel.radTwo.onClick = win.radioPanel.radThree.onClick = function () {
		var selected = "";
		if(win.radioPanel.radOne.value) {
			selected = "Radio One";
		}
		else if(win.radioPanel.radTwo.value) {
			selected = "Radio Two";
		}
		else if(win.radioPanel.radThree.value) {
			selected = "Radio Three";
		}
		
		win.radioPanel.radTxtOne.text = selected;
	};

	// Event listener for the quit button
	win.quitBtn.onClick = function() { 
	    win.close(); 
	}

	win.show();

	return retval;
	
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCreateCheckBoxRadioButtons_unitTest) == "undefined") {
    new SnpCreateCheckBoxRadioButtons().run();
}


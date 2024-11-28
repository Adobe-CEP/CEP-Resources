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
  
  @fileoverview Shows how to create a ScriptUI window using a code-based method.
  @class Shows how to create a ScriptUI window using a code-based method.
 
  <h4>Usage</h4>
  <ol>
  <li> Open this file and run it in the ExtendScript Toolkit.
  <li>You can choose as the target any application that supports ScriptUI.
  <li>You should see a dialog with a variety of ScriptUI components.
  </ol>
  
  
 
  <h4>Description</h4>

  <p>Demonstrates the use of the Window and container add() methods,
  building a simple palette (a modeless or floating dialog)
  containing an assortment of components.<br />
  
  @see AlertBoxBuilder1
  @see AlertBoxBuilder2
  @see SnpCreateUIAddMethod

  @constructor Constructor.
 */ 
function SnpCreateUIAddMethod()
{
	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tExecute in the ExtendScript Toolkit";
	$.level = 1; // Debugging level
	this.windowRef = null;
}

/**
 Functional part of this snippet.

 Create	a window, and a container panel to frame its components.
 Add the components to the panel, including a nested container that groups
 radiobuttons.
 Add behavior for the OK and Cancel buttons, then display the window.

 @return True if the snippet ran as expected, false otherwise
 @type Boolean
*/
SnpCreateUIAddMethod.prototype.run = function()
{
	
	retval = true;
	
	// Create the palette-type window (a modeless dialog)
	var win = new Window('palette', 'SnpCreateUIAddMethod');
	this.windowRef = win;
	// Create a container panel for the components
	win.pnl = win.add("panel", [5,5,225,150], 'A Panel');

	// Use the panel's add() method to create components
	win.pnl.txt = win.pnl.add('edittext', [15,15,200,35], 'Edit Me!');
	win.pnl.chkb1 = win.pnl.add('checkbox', [25,45, 105, 65], 'Check A');
	win.pnl.chkb2 = win.pnl.add('checkbox', [115, 45, 205, 65], 'Check B');

	// Add a nested container to group components within the panel
	win.pnl.grp = win.pnl.add('panel', [15, 75, 200, 105]);
	// Add a pair of radiobuttons to the group. Because they are in the same
	// container, they are automatically part of the same mutually-exclusive
	// selection group.
	win.pnl.grp.rb1 = win.pnl.grp.add('radiobutton', [5, 5, 50, 25], 'One');
	win.pnl.grp.rb2 = win.pnl.grp.add('radiobutton', [135, 5, 180, 25], 'Two');

	// Add OK/Cancel buttons
	win.pnl.okBtn = win.pnl.add("button", [25,110,105,130], 'OK');
	win.pnl.cnlBtn = win.pnl.add("button", [120, 110, 190, 130], 'Cancel');

	// Define the behavior of the buttons
	win.pnl.okBtn.onClick = function()
	{
		$.writeln(win.pnl.txt.text);
		win.close();
	}

	win.pnl.cnlBtn.onClick = function()
	{
		$.writeln("Cancel Button Pressed");
		win.close();
	}
	// Display the window
	win.show();
		
	return retval;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCreateUIAddMethod_unitTest)  == "undefined") {
    new SnpCreateUIAddMethod().run();
}

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
  
  @fileoverview Shows how to use a resource specification to build a ScriptUI window.
  @class Shows how to use a resource specification to build a ScriptUI window.
 
  <h4>Usage</h4>
  
 <ol>
 <li>Run the snippet in the ExtendScript Toolkit (see Readme.txt). 
  <li>You can choose as the target any application that supports ScriptUI.
  <li>You should see a dialog with a variety of ScriptUI components.
 </ol>
 
  <h4>Description</h4>

  <p>Creates a resource-specifications string that defines the contents 
  for a simple palette (a modeless or floating dialog). The contents
  are an assortment of user-interface components, the same ones that 
  are created individually with the add() method in SnpCreateUIAddMethod.jsx.<br />

  @see AlertBoxBuilder1
  @see AlertBoxBuilder2
  @see SnpCreateUIAddMethod
  
  @constructor  Constructor.
 */ 
function SnpCreateUIResourceSpec()
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

  Create a resource-specifications string that defines an assortment of 
  user-interface components.

  <p>Pass the resource-specification string to the constructor of a 
  Window object, then define the behavior of the elements created
  by the resource specification.

 @return True if the snippet ran as expected, false otherwise
 @type Boolean
*/
SnpCreateUIResourceSpec.prototype.run = function() {

	var retval = true;
	

	// Define the resource-specification string
	// This creates the same components as those created
  	// with the add() method in SnpCreateUIAddMethod.jsx.

	var res = "palette { text:'SnpCreateUIResourceSpec', " + 
		"pnl: Panel { bounds:[5,5,225,150], text:'A Panel', " + 
		"txt: EditText { bounds: [15,15,200,35], text: 'Edit Me!'}," +
		"chkB1: Checkbox { bounds: [25, 45, 105, 65], text: 'Check A'}," +
		"chkB2: Checkbox { bounds: [115, 45, 205, 65], text: 'Check B'}," +
		"grp: Panel { bounds: [15, 75, 200, 105]," +
		"rb1: RadioButton { bounds: [5, 5, 50, 25], text: 'One'}, " +
		"rb2: RadioButton { bounds: [135, 5, 180, 25], text: 'Two'} " +
		"}," +
		"okBtn: Button {bounds: [25,110,105,130], text:'OK'}, " + 
		"cnlBtn: Button {bounds: [120, 110, 190, 130], text:'Cancel' } } }";
		
	
	// Create a new Window object using the resource specification
	var win = new Window(res);
	this.windowRef = win;
	// Define the behavior of the OK and Cancel buttons
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
if(typeof(SnpCreateUIResourceSpec_unitTest)  == "undefined") {
    new SnpCreateUIResourceSpec().run();
}

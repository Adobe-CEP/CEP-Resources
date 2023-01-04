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
 @fileoverview Shows how to create a dynamic user interface  using ScriptUI, using groups of ScriptUI components that are shown or hidden in turn.
  @class Shows how to create a dynamic user interface using ScriptUI, using groups of ScriptUI components that are shown or hidden in turn.
 
  <h4>Usage</h4>

  <ol>
  <li>Run the snippet in the ExtendScript Toolkit (see Readme.txt). This snippet can run in any application that supports ScriptUI.
  <li>You should see a dialog, with a drop down list. When you change the selection in the drop-down list, the widgets shown
  in the panel below the drop-down list change.
  </ol>
 
  <h4>Description</h4>
  
  <p>Creates a modeless dialog (or palette) with a DropDownList and a Panel
  that contains two groups of components. When the dialog is displayed,
  one group is hidden and the other is shown, according to the selection in the drop-down list. 
  <br />
  
  @constructor Constructor
 */
function SnpCreateDynamicScriptUI() 
{ 
    this.windowRef = null;
}


/**
 Functional part of this snippet, creates the modeless dialog and its components.
 Defines the behavior in an event handler for the list component.
 
 @return True if the snippet ran as expected, false otherwise
 @type Boolean
*/
SnpCreateDynamicScriptUI.prototype.run = function() 
{
	$.writeln("About to run SnpCreateDynamicScriptUI");
	// Define components
	var res =
           "palette { \
                   whichInfo: DropDownList { preferredSize: [100, 20],  alignment:'left' }, \
                   allGroups: Panel { text: 'Test', orientation:'stack', \
                           info: Group { orientation: 'column', \
                                   name: Group { orientation: 'row', \
                                           s: StaticText { text:'Name:' }, \
                                           e: EditText { preferredSize: [200, 20] } \
                                   } \
                           }, \
                           workInfo: Group { orientation: 'column', \
                                   name: Group { orientation: 'row', \
                                           s: StaticText { text:'Company name:' }, \
                                           e: EditText { preferredSize: [200, 20] } \
                                   } \
                                   }, \
                   }, \
                   buttons: Group { orientation: 'row', alignment: 'right', \
                           okBtn: Button { text:'OK', properties:{name:'ok'} }, \
                           cancelBtn: Button { text:'Cancel', properties:{name:'cancel'} } \
                   } \
           }";
	// Create the dialog with the components
	var win = new Window (res);	
	this.windowRef = win;
	
	// Define the behavior for the drop-down list that changes the display
	win.whichInfo.onChange = function () 
	{
	    // In this context, "this" refers to the list component object
		if (this.selection != null) 
		{
			for (var g = 0; g < this.items.length; g++)
			{
				//hide all other groups
				this.items[g].group.visible = false; 
			}
			//show this group
			this.selection.group.visible = true;
		}
	}
	// Define the button behavor
   	win.buttons.okBtn.onClick = function () { this.parent.parent.close(1); };
	win.buttons.cancelBtn.onClick = function () { this.parent.parent.close(2); };
		
	// Add list items to the drop-down list
	var item = win.whichInfo.add ('item', 'Personal Info');
	item.group = win.allGroups.info;
	item = win.whichInfo.add ('item', 'Work Info');
	item.group = win.allGroups.workInfo;
	win.whichInfo.selection = win.whichInfo.items[0];
	win.center(); 
	// Display the window
	win.show();
	
	$.writeln("Ran SnpCreateDynamicScriptUI");
	
	return true;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCreateDynamicScriptUI_unitTest) == "undefined") {
    new SnpCreateDynamicScriptUI().run();
}

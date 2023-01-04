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
 @fileoverview Shows how to create a custom LayoutManager with ScriptUI.
  @class Shows how to create a custom LayoutManager with ScriptUI.
 
  <h4>Usage</h4>

  <ol>
  <li>Run the snippet in the ExtendScript Toolkit (see Readme.txt). Note; this snippet can run in any application that supports ScriptUI.
  <li>You should see a dialog appear.
  <li>Try selecting the drop-down list in the top-left corner of the dialog; note how the layout of the dialog 
  changes in response to changing the selected item in the drop-down list.
  </ol>
 
  <h4>Description</h4>
  
  <p>Uses a custom layout manager to arrange the components within a group.  The bottom
  group, 'buttons', of the Panel uses the custom 'StairStepButtonLayout' to arrange the buttons 
  in a stepping fashion.

  <p>The reference to the custom layout manager object is stored in the 'layout' property of 
  the container element for the managed components. The custom layout object 
  provides a 'layout' method that performs the layout calculations. It calculates the necessary 'size' and 
  'location' of each child element, using the 'preferredSize' property of the container, which
  must also be calculated.<br />
  
  @constructor Constructor
 */
function SnpCustomLayoutManager() 
{ 
	this.windowRef = null;
}

/**
 Functional part of this snippet. Creates the custom layout manager object, 
 and the ScriptUI window and components that it manages. Defines the layout()
 method that calculates the positions of the child elements.
 @return True if the snippet ran as expected, false otherwise
 @type boolean
*/
SnpCustomLayoutManager.prototype.run = function() 
{
	$.writeln("About to run SnpCustomLayoutManager");
	
	// Define a custom layout manager that arranges the children
	// of 'container' in a stair-step fashion.
	function StairStepButtonLayout (container) 
	{
		this.initSelf(container);
	}

	// Initialization method
	function SSBL_initSelf (container) 
	{
		this.container = container;
	}
	// Layout method, which calculates the size and positions of child elements
	function SSBL_layout()
	{
			var top = 0, left = 0;
			var width;
			var vspacing = 10, hspacing = 20;
			for (var i = 0; i < this.container.children.length; i++) 
			{
					var child = this.container.children[i];
					if (typeof child.layout != "undefined")
					{
						// If child is a container, call its layout method
						child.layout.layout();
					}
			
					child.size = child.preferredSize;
					child.location = [left, top];
					width = left + child.size.width;
					top += child.size.height + vspacing;
					left += hspacing;
			}
			this.container.preferredSize = [width, top - vspacing];
	}

	// Attach methods to Object's prototype
	StairStepButtonLayout.prototype.initSelf = SSBL_initSelf;
	StairStepButtonLayout.prototype.layout = SSBL_layout;

	// Define a string containing the resource specification for the controls
	res =
	 "palette { \
			whichInfo: DropDownList { preferredSize: [100, 20] }, \
			allGroups: Panel { orientation:'column', alignChildren:'right', \
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
			buttons: Group { orientation: 'row', \
					okBtn: Button { text:'OK', properties:{name:'ok'} }, \
					cancelBtn: Button { text:'Cancel', properties:{name:'cancel'} } \
			} \
	}";

	// Create the window using the resource specification
	win = new Window (res);
	this.windowRef = win;
	// Create list items, select first one
	win.whichInfo.onChange = function () {
			if (this.selection != null) {
					for (var g = 0; g < this.items.length; g++)
							this.items[g].group.visible = false;
					this.selection.group.visible = true;
			}
	}
	// Define button behavior
   	win.buttons.okBtn.onClick = function () { this.parent.parent.close(1); };
	win.buttons.cancelBtn.onClick = function () { this.parent.parent.close(2); };
	
	// Add list items
	var item = win.whichInfo.add ('item', 'Personal Info');
	item.group = win.allGroups.info;
	item = win.whichInfo.add ('item', 'Work Info');
	item.group = win.allGroups.workInfo;
	win.whichInfo.selection = win.whichInfo.items[0];

	// Override the default layout manager for the 'buttons' group
	// with the custom layout manager
	//win.buttons.layout = new StairStepButtonLayout(win.buttons);

	win.center(); 
	// Display the window
	win.show();

	$.writeln("Ran SnpCustomLayoutManager");
	
	return true;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCustomLayoutManager_unitTest)  == "undefined") {
    new SnpCustomLayoutManager().run();
}

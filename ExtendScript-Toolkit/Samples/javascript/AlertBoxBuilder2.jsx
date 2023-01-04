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
@fileoverview Code sample that creates a user interface for building alert boxes, using a resource-based (rather than code-based) approach to create the widgets.
 @class Code sample that creates a user interface for building alert boxes, using a resource-based (rather than code-based) approach to create the widgets.
 
 <h4>Usage</h4>

<ol>
<li>Run the sample in the ExtendScript Toolkit. You can choose as a target any application that supports ScriptUI.
  <li>You should see a dialog appear, which lets you parameterize the specification to build a Script-UI based alert.
</ol>
 
 <h4>Description</h4>

 <p>Uses a resource-specification string to build the Alert Box Builder dialog. 
 This is roughly the same dialog as created by AlertBoxBuilder1.jsx.<br/>
 
 This version demonstrates some techniques for vertically aligning UI elements in
 unrelated groups, without use of the preferredSize property. See the 'onShow'
 event handler.<br/>
 
 It also demonstrates creation of a resizeable dialog: the Alert Box that is
 created can be resized, and its UI elements will also resize and / or move
 to adapt to the new dialog size.<br/>
 
 @constructor Constructor
 */
function AlertBoxBuilder2(){ }

/**
	Functional part of this snippet.  Creates the Dialog and adds the ScriptUI
	components and event handlers.
*/
AlertBoxBuilder2.prototype.run = function()
{

	var retval = true;
	
	// Define the resource specification string,
	// which specifies all of the components for the 
	// Alert Box Builder dialog.
	var alertBuilderResource =
	"dialog { properties:{ resizeable:true }, \
		text: 'Alert Box Builder', frameLocation:[100,100], \
		msgPnl: Panel { orientation:'column', alignChildren:['right', 'top'],\
			text: 'Messages', \
			title: Group { \
				st: StaticText { text:'Alert box title:' }, \
				et: EditText { text:'Sample Alert', characters:35 } \
			}, \
			msg: Group { \
				st: StaticText { text:'Alert message:' }, \
				et: EditText { properties:{multiline:true}, \
					text:'<your message here>' \
				} \
			}, \
			msgWidth: Group { \
				st: StaticText { text:'Message width:' }, \
				sl: Slider { minvalue:100, maxvalue:300, value:150 }, \
				et: EditText { characters:4, justify:'right' } \
			}, \
			msgHeight: Group { \
				st: StaticText { text:'Message height:' }, \
				sl: Slider { minvalue:20, maxvalue:300 }, \
				et: EditText { characters:4, justify:'right' } \
			} \
		}, \
		hasBtnsCb: Checkbox { \
			alignment:'center', text:'Has alert buttons?', value:true \
		}, \
		alertBtnsPnl: Panel { orientation:'row', \
			text: 'Button alignment', \
			alignLeftRb: RadioButton { text:'Left' }, \
			alignCenterRb: RadioButton { text:'Center', value:true }, \
			alignRightRb: RadioButton { text:'Right' } \
		}, \
		btnPnl: Panel { orientation:'row', \
			text: 'Build it', \
			testBtn: Button { text:'Test' }, \
			buildBtn: Button { text:'Build', properties:{name:'ok'} }, \
			cancelBtn: Button { text:'Cancel', properties:{name:'cancel'} } \
		} \
	}";


	// Creates the builder dialog from the resource string
	function createBuilderDialogFromResource() {
		return new Window(alertBuilderResource);
	} // createBuilderDialogFromResource


	/**
	 Initializes the values in the components of the builder dialog 
	*/
	function initializeBuilder(builder) {
		// Set up initial control states
		with (builder.msgPnl) {
			msgWidth.et.text = msgWidth.sl.value;
			msgHeight.et.text = msgHeight.sl.value;
		}

		// Attach event callback functions to controls
		
		/*
		   Define an event handler that will be called after initial layout of the dialog, just before
		   it becomes visible. Because the layout manager has already calculated the location and
		   size of the 'title' edit field, we can now use its 'window relative' location to adjust the widths
		   of other controls, then force another layout pass so that all the 'control groups' (i.e., the edit
		   fields and associated sliders) in the top panel will have their left and right edges aligned vertically,
		   and the labels for each control group will be vertically aligned along their right edges.
		*/
		builder.onShow = function ()
			{
				var msgPnl = this.msgPnl;
				var leftEdge = msgPnl.title.et.windowBounds.left;
				msgPnl.msg.et.size.width += (msgPnl.msg.et.windowBounds.left - leftEdge);
				msgPnl.msg.et.size.height = 60;
				msgPnl.msgWidth.sl.size.width += (msgPnl.msgWidth.sl.windowBounds.left - leftEdge);
				msgPnl.msgHeight.sl.size.width += (msgPnl.msgHeight.sl.windowBounds.left - leftEdge);
				this.layout.layout(true);
			}
		
		// The 'has buttons' checkbox enables or disables the panel that
		//determines the justification of the 'alert' button group
		builder.hasBtnsCb.onClick = function () { this.parent.alertBtnsPnl.enabled = this.value; };

		// The edittext fields and sliders in msgPnl are connected
		with (builder.msgPnl) {
			msgWidth.et.onChange = function () { this.parent.parent.msgWidth.sl.value = Number(this.text); };
			msgWidth.sl.onChanging = function () { this.parent.parent.msgWidth.et.text = Math.floor(this.value); };
			msgHeight.et.onChange = function () { this.parent.parent.msgHeight.sl.value = Number(this.text); };
			msgHeight.sl.onChanging = function () { this.parent.parent.msgHeight.et.text = Math.floor(this.value); };
		}
		
		with (builder.btnPnl) {
			// The Test button creates a trial Alert box from
			// the current specifications
			testBtn.onClick = function ()
			{
				$.writeln("Displaying customised alert dialog");
				createTestDialog(createResource(this.parent.parent));
			};

			// The Build and Cancel buttons close this dialog
			buildBtn.onClick = function () { this.window.close(1); };
			cancelBtn.onClick = function () { this.window.close(2); };
		};
	} // initializeBuilder


	/**
	 Invokes the dialog and returns its result
	*/
	function runBuilder(builder) {
		return builder.show();
	}

	/**
	 Creates and returns a string containing a dialog
	 resource specification that will create a resizeable Alert dialog using
	 the parameters the user entered in the builder dialog. 
	*/
	function createResource(builder) {
		// Define the initial part of the resource spec with dialog parameters
		var res = "dialog { properties:{ resizeable:true }, " + stringProperty("text", builder.msgPnl.title.et.text) + "\n";
		
		// Define the alert message statictext element, sizing it as user specified
		var textWidth = Number(builder.msgPnl.msgWidth.et.text);
		var textHeight = Number(builder.msgPnl.msgHeight.et.text);
		res += " msg: StaticText { " + stringProperty("text", builder.msgPnl.msg.et.text) + 
			" preferredSize: [" + textWidth + ", " + textHeight + "],\n" + 
			" minimumSize: [" + textWidth + ", " + textHeight + "],\n" + 
			" alignment:['fill','fill'], properties:{multiline:true} }";
		
		// Define buttons if desired
		var hasButtons = builder.hasBtnsCb.value;
		if (hasButtons) {
			var groupAlign = "['center', 'bottom']";
			// Align buttons as specified
			if (builder.alertBtnsPnl.alignLeftRb.value) {
				groupAlign = "['left', 'bottom']";
			}
			else if (builder.alertBtnsPnl.alignRightRb.value) {
				groupAlign = "['right', 'bottom']";
			}
			
			res += ",\n" + " btnGroup: Group {\n" + " alignment:" + groupAlign +
				"\n" + " okBtn: Button { " + stringProperty("text", "OK") +"},\n";
			res += " cancelBtn: Button { " + stringProperty("text", "Cancel") +"}" + " }";
		}

		// done
		res += "\n}";
		return res;
	}

	// Helper function for string building.
	function stringProperty(pname, pval) {
		return pname + ":'" + pval + "', ";
	}

	// Test the alert dialog
	function createTestDialog(resource) {
		var target = new Window (resource);
		target.onResize = target.onResizing = function () { this.layout.resize(); }
		return target.show();
	}

	//------------- "Main" -------------//
	// Create and initialize the builder dialog
	var builder = createBuilderDialogFromResource(); 
	initializeBuilder(builder);
	// Show the builder dialog, and save the returned resource specification
	var buildResult = runBuilder(builder);
	if (buildResult == 1) {
		// Create the Alert dialog resource specification string
		var resSpec = createResource(builder);
		// Write the resource spec string to a file w/platform file-open dialog
		var fname = File.saveDialog('Save resource specification');
		var f = File(fname);
		if (f.open('w')) {
			var ok = f.write(resSpec);
			if (ok) {
				ok = f.close();
			}
			if (! ok) {
				Window.alert("Error creating " + fname + ": " + f.error);
			}
		}
	}

	return retval;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(AlertBoxBuilder2_unitTest)  == "undefined") {
    new AlertBoxBuilder2().run();
}
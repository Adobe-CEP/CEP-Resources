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
 @fileoverview Code sample that creates a user interface for building alert boxes, using a code-based (rather than resource-based) approach to create the widgets.
 @class Code sample that creates a user interface for building alert boxes, using a code-based (rather than resource-based) approach to create the widgets.

 <h4>Usage</h4>
 <ol>
  <li>Run the sample in the ExtendScript Toolkit (see Readme.txt). You can choose as a target any application that supports ScriptUI.
  <li>You should see a dialog appear, which lets you parameterize the specification to build a Script-UI based alert.
 </ol>
 <h4>Description</h4>

 <p>Creates a dialog to gather parameters to control the appearance of an alert it is building
 and then creates a resource specification from those values. Saves specification to a file, and lets you 
 preview the alert created by the parameters
 supplied.
 <br />
 
 @constructor Constructor
 */
function AlertBoxBuilder1(){ }

/**
	Functional part of this snippet.  Creates the Dialog and adds the ScriptUI
	components and event handlers.
*/
AlertBoxBuilder1.prototype.run = function()
{

	var retval = true;

	function createBuilderDialog() {
		// Create an empty dialog window near the upper left of the screen
		var dlg = new Window('dialog', 'Alert Box Builder');
		dlg.frameLocation = [100, 100];
		// Add a container panel for the title and 'message text' strings
		dlg.msgPnl = dlg.add('panel', undefined, 'Messages');
		dlg.msgPnl.alignChildren = "right";
		// add the panel's child components
		dlg.msgPnl.title = dlg.msgPnl.add('group');
		dlg.msgPnl.msg = dlg.msgPnl.add('group');
		dlg.msgPnl.msgWidth = dlg.msgPnl.add('group');
		dlg.msgPnl.msgHeight = dlg.msgPnl.add('group');
		with (dlg.msgPnl) {
			title.st = title.add('statictext', undefined, 'Alert box title:');
			title.et = title.add('edittext', undefined, 'Sample Alert');
			title.et.preferredSize = [200,20];

			msg.st = msg.add('statictext', undefined, 'Alert message:');
			msg.et = msg.add('edittext', undefined, '<your message here>', {multiline:true});
			msg.et.preferredSize = [200,60];
			msgWidth.st = msgWidth.add('statictext', undefined, 'Message width:');
			msgWidth.sl = msgWidth.add('slider', undefined, 150, 100, 300);
			msgWidth.sl.preferredSize = [150, 20];
			msgWidth.et = msgWidth.add('edittext');
			msgWidth.et.preferredSize = [40, 20];
			msgHeight.st = msgHeight.add('statictext', undefined, 'Message height:');
			msgHeight.sl = msgHeight.add('slider', undefined, 20, 20, 300);
			msgHeight.sl.preferredSize = [150, 20];
			msgHeight.et = msgHeight.add('edittext');
			msgHeight.et.preferredSize = [40, 20];
		}
		
		// Add a checkbox to control the presence of buttons to dismiss the alert box
		dlg.hasBtnsCb = dlg.add('checkbox', undefined, 'Has alert buttons?');
		// Add a panel to determine alignment of buttons on the alert box
		dlg.alertBtnsPnl = dlg.add('panel', undefined, 'Button alignment');
		dlg.alertBtnsPnl.orientation = "row";
		dlg.alertBtnsPnl.alignLeftRb =
		dlg.alertBtnsPnl.add('radiobutton', undefined, 'Left');
		dlg.alertBtnsPnl.alignCenterRb =
		dlg.alertBtnsPnl.add('radiobutton', undefined, 'Center');
		dlg.alertBtnsPnl.alignRightRb =
		dlg.alertBtnsPnl.add('radiobutton', undefined, 'Right');

		// Add a panel with buttons to test parameters and
		// create the alert box specification
		dlg.btnPnl = dlg.add('panel', undefined, 'Build it');
		dlg.btnPnl.orientation = "row";
		dlg.btnPnl.testBtn = dlg.btnPnl.add('button', undefined, 'Test');
		dlg.btnPnl.buildBtn = dlg.btnPnl.add('button', undefined, 'Build', {name:'ok'});
		dlg.btnPnl.cancelBtn = dlg.btnPnl.add('button', undefined, 'Cancel', {name:'cancel'});
		
		return dlg;
	} // createBuilderDialog


	/**
	 This function initializes the values in the controls
	 of the builder dialog 
	*/
	function initializeBuilder(builder) {
		// Set up initial control states
		with (builder) {
			hasBtnsCb.value = true;
			alertBtnsPnl.alignCenterRb.value = true;
			with (msgPnl) {
				msgWidth.et.text = msgWidth.sl.value;
				msgHeight.et.text = msgHeight.sl.value;
			}
		}

		// Attach event callback functions to controls
		// The 'has buttons' checkbox enables or disables the panel that
		// determines the justification of the 'alert' button group

		builder.hasBtnsCb.onClick = function () { this.parent.alertBtnsPnl.enabled = this.value; };

		// The edittext fields and scrollbars in msgPnl are connected
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
				$.writeln("Displaying customized alert dialog");
				createTestDialog(createResource(this.parent.parent));
			};

			// The Build and Cancel buttons close this dialog
			buildBtn.onClick = function () { this.parent.parent.close(1); };
			cancelBtn.onClick = function () { this.parent.parent.close(2); };
		};
	} // initializeBuilder


	/**
	 This function invokes the dialog an returns its result
	*/
	function runBuilder(builder) {
		return builder.show();
	}

	/**
	 This function creates and returns a string containing a dialog
	 resource specification that will create an Alert dialog using
	 the parameters the user entered in the builder dialog. 
	*/
	function createResource(builder) {
		// Define the initial part of the resource spec with dialog parameters
		var res = "dialog { " + stringProperty("text", builder.msgPnl.title.et.text) + "\n";
		
		// Define the alert message statictext element, sizing it as user specified
		var textWidth = Number(builder.msgPnl.msgWidth.et.text);
		var textHeight = Number(builder.msgPnl.msgHeight.et.text);
		res += " msg: StaticText { " + stringProperty("text", builder.msgPnl.msg.et.text) + 
			" preferredSize: [" + textWidth + ", " + textHeight + "],\n" +
			" alignment:['center','top'], properties:{multiline:true} }";
		
		// Define buttons if desired
		var hasButtons = builder.hasBtnsCb.value;
		if (hasButtons) {
			var groupAlign = "center";
			// Align buttons as specified
			if (builder.alertBtnsPnl.alignLeftRb.value) {
				groupAlign = "left";
			}
			else if (builder.alertBtnsPnl.alignRightRb.value) {
				groupAlign = "right";
			}
			
			res += ",\n" + " btnGroup: Group {\n" + stringProperty(" alignment", groupAlign) +
				"\n" + " okBtn: Button { " + stringProperty("text", "OK") +"},\n";
			res += " cancelBtn: Button { " + stringProperty("text", "Cancel") +"}" + " }";
		}

		// done
		res += "\n}";
		return res;
	}

	// Utility string-building function
	function stringProperty(pname, pval) {
		return pname + ":'" + pval + "', ";
	}

	// Display the 	generated alert dialog
	function createTestDialog(resource) {
		var target = new Window (resource);
		target.center();
		return target.show();
	}
	//------------- "Main" -------------//
	// Create and initialize the user-input dialog
	var builder = createBuilderDialog(); 
	initializeBuilder(builder);

	// Show the user-input dialog, and save the returned resource string
	if (runBuilder(builder) == 1 ){
		// Create the Alert dialog resource-specification string
		var resSpec = createResource(builder);
		// Write the resource string to a file w/platform file-save dialog
		var fname = File.saveDialog('Save resource specification');
		var f = File(fname);
		if (f.open('w')) {
			var ok = f.write(resSpec);
			if (ok) {
				ok = f.close();
			}
			if (! ok) {
				alert("Error creating " + fname + ": " + f.error);
			}
		}
	}
	
	return retval;

}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(AlertBoxBuilder1_unitTest)  == "undefined") {
    new AlertBoxBuilder1().run();
}

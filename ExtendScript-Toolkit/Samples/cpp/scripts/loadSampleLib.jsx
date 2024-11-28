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
  @fileoverview Loads and executes an external object, showing how to use the "indirect" (object-oriented)
    and "direct" interfaces to an
    ExternalObject, calling out to code in a shared library written in C/C++
  
  @class Loads and executes an external object, showing how to use the "indirect" (object-oriented)
    and "direct" interfaces to an
    ExternalObject, calling out to code in a shared library written in C/C++
  
  Usage:
	Load the JavaScript code in this file in the ExtendScript Toolkit.
     <li> From ExtendScript Toolkit, run the sample.
	<li> A dialog window will appear with two buttons 'Object Calls' and 'Direct Calls'.
	<li> Click the 'Object Calls' button to demonstrate the LoadExternalObjectLib object calls.
	<li> Inspect the text area for object calls for the output.
 	<li> Then choose the 'Direct Calls' button to demonstrate the direct calls.
	<li> Inspect the text area for direct calls for the output.
  Description:
<p>The script loads an external library by using the ExternalObject constructor.  Once the library is loaded
   a dialog window appears with two buttons; 'Object Calls', 'Direct Calls'.  These buttons exercise both the direct and indirect (object-oriented)
   interfaces to the external object. Once a button is invoked, the results are displayed in the corresponding text area on the dialog.
   
<p>When the button relating to the object-oriented interface is invoked, several instances
   of the class named SampleLibObject are created. Each instance
   has methods which can be called and properties which can be updated.  Each instance has a unique
   identifier which demonstrates each separate instance of the class SampleLibObject.  With the indirect 
   interface any number of classes can be created and each class can have any number of methods and
   properties.
   
<p>An event handler is also created to unload the External Object when the dialog is closed.
 
 */
function LoadExternalObjectLib() 
{
	/**
	 The context in which this snippet can run.
	*/
	this.requiredContext = "\tThe external library needs to be available\n";	
}

/**
 Functional part of this snippet.
 @return True if the sample ran as expected, false if otherwise
 @type boolean
*/
LoadExternalObjectLib.prototype.run = function()
{
	
	if(!this.canRun()) 
	{
		return false;
	}
	
	var libPath = this.getLibPath();
	var sampleLib = new ExternalObject("lib:" + libPath);
	var directText = "";
	var objectText = "";

	// create the dialog window
	var dlg = new Window('dialog', 'LoadExternalObjectLib');
	//create panel for buttons
	dlg.pnl = dlg.add('panel', undefined,'');
	// now the buttons
	dlg.pnl.objectbtn = dlg.pnl.add('button', undefined,'Object Calls');
	dlg.pnl.directbtn = dlg.pnl.add('button', undefined, 'Direct Calls');
	dlg.pnl.closebn = dlg.pnl.add('button', undefined, 'Close');
	
	dlg.directPnl = dlg.add('panel', undefined, 'Direct Calls Output', {bounds:[100,100,480,490]});
	dlg.directPnl.textReceived = dlg.directPnl.add('edittext', undefined,directText, {multiline:true,enabled:false});
	with(dlg.directPnl.textReceived){
		bounds = [15,15,360,150];
	}
	dlg.objectPnl = dlg.add('panel', undefined, 'Object Calls Output', {bounds:[100,100,480,490]});
	dlg.objectPnl.textReceived = dlg.objectPnl.add('edittext', undefined,objectText, {multiline:true,enabled:false});
	with(dlg.objectPnl.textReceived){
		bounds = [15,15,360,150];
	}

	dlg.pnl.closebn.onClick = function(){
			dlg.close();
	}
	// button handler for the direct interface of the ExternalObject
	// This will exercise the direct interfaces
	dlg.pnl.directbtn.onClick = function()
	{
		directText = directText + "Created object: " + sampleLib.createObject("prop1", "999");
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nCreated array: " + sampleLib.createArray("As", "many", "args", "as", "we", "want", "!");
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nAny param: " + sampleLib.paramAny("Anything");
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nAny param: " + sampleLib.paramAny(100);
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nAny param: " + sampleLib.paramAny(0.98765);
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nA boolean: " + sampleLib.paramBool(true);
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nUnsigned Int: " + sampleLib.paramUInt32(99);
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nSigned Int: " + sampleLib.paramInt32(-99);
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\n64 bit float: " + sampleLib.paramFloat64(0.987654321);
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nA String: " + sampleLib.paramString("This is a string!!");
		dlg.directPnl.textReceived.text = directText;
		directText = directText + "\nBuilt on: " + sampleLib.built();
		dlg.directPnl.textReceived.text = directText;
	}

	// Button handler for the object interface of the ExternalObject
	// This create several objects and exercise their functions
	dlg.pnl.objectbtn.onClick = function () 
	{ 
		// We can create as many instances of the class as we like
		// For each instance only properties a and b are writeable
		var sampObj1 = new SampleLibObject();		
		sampObj1.a = "A value for a";
		objectText = objectText + "sampObj1.a = " + sampObj1.a;
		dlg.objectPnl.textReceived.text = objectText;
		sampObj1.b = "A value for b";
		objectText = objectText + "\nsampObj1.b = " + sampObj1.b;
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText + "\nsampObj1.pi = " + sampObj1.pi;
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText + "\nsampObj1.sine(45) = " + sampObj1.sine(45);
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText +"\nsampObj1.built = " + sampObj1.built;
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText +"\nsampObj1.reverse('I love scripting') = " + sampObj1.reverse('I love scripting');
		
		var sampObj2 = new SampleLibObject();
		sampObj2.a = "A different value";
		objectText = objectText + "\nsampObj2.a = " + sampObj2.a;
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText +"\nsampObj1.me = " + sampObj1.me;
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText + "\nsampObj2.me = " + sampObj2.me;
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText + "\nsampObj1.toString() = " + sampObj1.toString();
		dlg.objectPnl.textReceived.text = objectText;
		objectText = objectText + "\nsampObj2.toString() = " + sampObj2.toString();
		dlg.objectPnl.textReceived.text = objectText;
	}
	
	// Handler to unload the the external object when dialog closed
	dlg.onClose = function()
	{
		$.writeln("LoadExternalObjectLib: closing and unloading ExternalObject");
		sampleLib.unload();
	}
	dlg.show();
	
	return true;
}

/**
 Returns the expected path to the library for this sample
 @return  Returns the path to the library file
 @type String
*/
LoadExternalObjectLib.prototype.getLibPath = function()
{
	var isWin = (File.fs == "Windows");
	var libFilename = (isWin) ? "SampleLib.dll" : "SampleLib.framework";
	Folder.current = File ($.fileName).parent.parent;
	
	var libPath;

	if(isWin)
	{
		// release
		libPath = Folder.current.fsName + "\\build\\samplelib\\win\\Release\\" + libFilename;
		// Debug
		//libPath = Folder.current.fsName + "\\build\\samplelib\\win\\Debug\\" + libFilename;
	}
	else //  running on mac
	{
		// release
	    libPath = Folder.current.fsName + "/build/samplelib/mac/Release/" + libFilename;
		// Debug
		//libPath = Folder.current.fsName + "/build/samplelib/mac/Debug/" + libFilename;
	}
	$.writeln(libPath);
	return libPath;
}


/**
 Determines whether snippet can be run given current context.  The snippet will
 fail if these preconditions are not met: 
 <li> The library file must be available
 @return True is this snippet can run, false if otherwise
 @type boolean
*/
LoadExternalObjectLib.prototype.canRun = function()
{
	var libFile = new File(this.getLibPath());

	if(libFile.exists) 
	{ 
		return true;
	}
	$.writeln("LoadExternalObjectLib:: ERROR loading SampleLib shared library");
	$.writeln(this.requiredContext);
	return false;
}

/**
 "main program": construct an anonymous instance and run it
*/
new LoadExternalObjectLib().run();

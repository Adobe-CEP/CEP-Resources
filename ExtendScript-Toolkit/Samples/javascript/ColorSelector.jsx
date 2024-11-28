////////////////////////////////////////////////////////////////////////////
// ADOBE SYSTEMS INCORPORATED
// Copyright 1998 - 2006 Adobe Systems Incorporated
// All Rights Reserved
//
// NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
// terms of the Adobe license agreement accompanying it.  If you have received this file from a
// source other than Adobe, then your use, modification, or distribution of it requires the prior
// written permission of Adobe.
/////////////////////////////////////////////////////////////////////////////

/** 
  @fileoverview Shows how to use graphic objects to customize the drawing of ScriptUI elements.
  @class Shows how to use graphic objects to customize the drawing of ScriptUI elements.

  <h4>Usage</h4>
  <ol>
  <li> Open this file and run it in the ExtendScript Toolkit. 
       You can choose as the target any application that supports ScriptUI.
  <li> Move the sliders up and down to change the color of the top panel.
  </ol>
 
  <h4>Description</h4>

<p>Changes the colors of ScriptUI components dynamically, using the graphics customization objects.
   Displays sliders that allow the user to set the RGB components of a color, then 
   creates new Pen and Brush types using those colors with methods of the ScriptUIGraphics objects 
   associated with the window and panels.
   
<p>To make the change in how the colors are drawn into the window on the screen, the example places the 
   new Pen and Brush objects into the appropriate color properties of the graphics objects. The Pen is
   used to change the foreground, and the Brush is used to change the background.
  
<p>Each Pen and Brush object is created with a brush type, a color value, and a line width.
  The color is given as an array of RGB values with a fourth number representing the Alpha
  channel (transparency) value.  The range for all values is 0 to 1.   
  For example, to set the background color of a window to a light grey:

<pre>
graphicsObject.backgroundColor = graphicsObject.newBrush (g.PenType.SOLID_COLOR, [0.75, 0.75, 0.75, 1], 1);
</pre>

  See the JavaScript Tools Guide for more details.<br />

   @constructor Constructor
 */
function ColorSelector() { }

/**
<p>Functional part of this snippet, creates a Window and its ScriptUI components.
 Defines three panels: an instruction panel, a panel that displays the current
 color values, and a control panel.
 
 <p>The control panel contains radio buttons to choose the background or
 foreground, and sliders to choose new color values.  As the sliders move, 
 their event handlers apply the new colors to the  background or foreground 
 of the window. The event handlers use a helper function, changeColor(), which actually
 performs the color change, by creating Pen and Brush objects and using them to set
 the color properties of the graphics objects associated with the window and with 
 each panel.

 @return True if the snippet ran as expected, false otherwise
 @type Boolean
*/
ColorSelector.prototype.run = function() 
{
	
	$.writeln("About to run ColorSelector");
	
	// Construct the window and the components
	var win = new Window("window", "Color Selector", undefined, { resizeable: false });
	win.alignChildren = "fill";

	// The instructions panel - the text color of this panel will change
	var instPanel = win.add("panel", undefined, "Instructions");
	//instPanel.alignment = "fill";
	instPanel.alignChildren = "left";
	var st = instPanel.add("statictext", undefined, "", {multiline: true } );
	st.text = "Use the radio buttons to select either the forground or background.  Then adjust "
	+ "the sliders in the bottom panel.  Each of the sliders represent a color, Red, Green or Blue.   "
	+ "The values of the sliders are show in the 'Color Values' panel.\n\n"
	+ "Using a Graphics Object you can:\n"
	+ "*   Change the background color\n"
	+ "*   Change the foreground color\n"
	+ "*   Change individual elements or the entire window\n\n"
	+ "This sample changes the colors within this panel.";
	st.characters = 50;

	// Panel to display the current color values
	var colPanel = win.add("panel", undefined, "Color Values");
	colPanel.orientation = "column";
	gp1 = colPanel.add("group");
	gp1.orientation = "row";
	gp1.add("statictext", undefined, "Red:");
	var RedText = gp1.add("edittext", undefined, "0.5000");
	gp1.add("statictext", undefined, "Green:");
	var GreenText = gp1.add("edittext", undefined, "0.5000");
	gp1.add("statictext", undefined, "Blue:");
	var BlueText = gp1.add("edittext", undefined, "0.5000");

	// Panel to control how the sliders move and to set the foreground/background
	var sliderPanel = win.add("panel", undefined, "Color Controls");
	sliderPanel.alignChildren = ["fill", "fill"];

	gp3 = sliderPanel.add("group");
	gp3.orientation = "row";
	gp3.alignment ="center";

	var foreBtn = gp3.add("radiobutton", undefined, "Foreground");
	var backBtn = gp3.add("radiobutton", undefined, "Background");
	var lockBtn = gp3.add("checkbox", undefined, "Lock Sliders");
	foreBtn.value = true;

	sliderRed = sliderPanel.add("slider", undefined, 5, 0, 10);
	sliderGreen = sliderPanel.add("slider", undefined, 5, 0, 10);
	sliderBlue = sliderPanel.add("slider", undefined, 5, 0, 10);

	// Handlers for sliders to capture changed values and apply colors
	sliderRed.onChanging = function() 
	{
		newVal = 0;
		if(sliderRed.value != 0)
		{
			newVal = sliderRed.value / 10;
		}

		RedText.text = newVal;
		if(lockBtn.value)
		{
			sliderGreen.value = sliderBlue.value = this.value;
			GreenText.text = BlueText.text = RedText.text;
		}
		// apply color
		changeColor(1, newVal, foreBtn.value);
	}

	sliderGreen.onChanging = function() 
	{
		newVal = 0;
		if(sliderGreen.value != 0)
		{
			newVal = sliderGreen.value / 10;
		}

		GreenText.text = newVal;
		if(lockBtn.value)
		{
			sliderRed.value = sliderBlue.value = this.value;
			BlueText.text = RedText.text = GreenText.text;
		}
		// apply color
		changeColor(2, newVal, foreBtn.value);
	}

	sliderBlue.onChanging = function() 
	{
		newVal = 0;
		if(sliderBlue.value != 0)
		{
			newVal = sliderBlue.value / 10;
		}

		BlueText.text = newVal;
		if(lockBtn.value)
		{
			sliderGreen.value = sliderRed.value = this.value;
			RedText.text = GreenText.text = BlueText.text;
		}
	
		// apply color
		changeColor(3, newVal, foreBtn.value);

	}

	win.show();

	// Apply the color changes to the window and panels
	function changeColor(color, val, foreground)
	{
		try
		{
			var Red = parseFloat(RedText.text);
			var Green = parseFloat(GreenText.text);
			var Blue = parseFloat(BlueText.text);

			switch(color)
			{
				case 1:
					Red = val;
					break;
				case 2:
					Green = val;
					break;
				case 3:
					Blue = val;
					break;
				default:
					return;	
			}

			// Colors: Red, Green, Blue, Alpha
			var colArr = [Red, Green, Blue, 1];
			// Get ScriptUIGraphics object associated with the window and each panel
			var g = win.graphics;
			var g2 = sliderPanel.graphics;
			var g3 = colPanel.graphics;
			var c, c2, c3;

			if(foreground) 	// do the foreground
			{
				// Create a Pen object for each color
				// specifying type, color, linewidth
				c  = g.newPen (g.PenType.SOLID_COLOR, colArr, 1);
				c2  = g2.newPen (g2.PenType.SOLID_COLOR, [0, 0, 0, 1], 1);
				c3  = g3.newPen (g3.PenType.SOLID_COLOR, [0, 0, 0, 1], 1);
				// Set the new Pen object as the foregroundColor of the graphics objects
				g.foregroundColor = c;
				g2.foregroundColor = c2;
				g3.foregroundColor = c3;
			}
			else // do the background
			{
				// Create a Brush object for each color
				// specifying type, color, linewidth
				c  = g.newBrush (g.BrushType.SOLID_COLOR, colArr, 1);
				if(File.fs == "Windows")
				{
					defColor = [0.933, 0.918, 0.848, 1];
				}
				else
				{
					defColor = [0.949, 0.949, 0.949, 1];
				}
				c2  = g2.newBrush (g2.BrushType.SOLID_COLOR, defColor, 1);
				c3  = g3.newBrush (g3.BrushType.SOLID_COLOR, defColor, 1);
				// Set the new Brush object as the backgroundColor of the graphics objects
				g.backgroundColor = c;
				g2.backgroundColor = c2;
				g3.backgroundColor = c3;
			}
		}
		catch(error){ alert(error); }
	}
	
	$.writeln("Ran ColorSelector");
	
	return true;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(ColorSelector_unitTest ) == "undefined") {
	new ColorSelector().run();
}

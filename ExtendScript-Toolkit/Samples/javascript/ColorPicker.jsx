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
  @fileoverview Shows how to use graphic objects to customize the drawing of ScriptUI elements.
  @class Shows how to use graphic objects to customize the drawing of ScriptUI elements.
	
	<h4>Usage</h4>
  <ol>
  <li> Open this file and run it in the ExtendScript Toolkit. 
       You can choose as the target any application that supports ScriptUI
  <li> Move the sliders up and down to change the color of the panels
	<li> Click  the large swatch to pop an alert with the current RGB settings 
  </ol>
	
	<h4>Description</h4>
	
	<p>This script creates an example Color Picker floating palette to show how to use some
	of the ScriptUI graphics properties and methods.  Specifically, it demonstrates:
	<ul>
	<li>Defining a ScriptUIFont object and using it to set an element's graphics.font property.
	<li>Defining a ScriptUIBrush object and using it to set an element's graphics.backgroundColor property.
	<li>Dttaching an onDraw notify handler to a UI element and drawing the element in different ways.
	<li>Defining linear segment and rectangular paths.
	<li>Filling a path with a ScriptUIBrush created from a dynamic RGB color.
	<li>Stroking over paths with ScriptUIPen objects created from static colors  (using partial transparency for some pens).
	</ul>
	
	 See the JavaScript Tools Guide for more details.<br />
	
	@see ColorSelector.jsx

   @constructor Constructor	
*/
function ColorPicker() {}

/**
  Functional part of this sample, creates several nodes of the new type, and one manager object,
  which stores the node-identifying prefix and root node. 
     
 	@return True if the sample ran as expected, false otherwise
 	@type Boolean
*/
ColorPicker.prototype.run = function()
{

	// Constants
	/*
	 The size of the font to use.
	 @type Mumber
	*/
	var kFontSize = 9;

	/*
	 The line width, in pixels, for the main color swatch.
	 @type Number
	*/
	var kSwatchBorderWidth = 2;

	/*
		The RGBPickerComponent class implements a single color component of
		an RGBColorPicker class. It uses Slider and EditText elements for the user
		to control the level of a single RGB component color.
	*/
	function RGBPickerComponent (componentIndex)
	{
		//	Define the UI elements and layout
		this.uiResource = 
		"group {													\
			spacing: 2,											\
			alignChildren:['right','center'],					\
			swatch: Panel {										\
				alignment:['left','center'],					\
				properties:{ borderStyle:'sunken' },		\
				preferredSize:[18,18]							\
			},															\
			label: StaticText { },								\
			slColor: Slider { 									\
				minvalue:0, maxvalue:100					\
			 },														\
			etColor: EditText {									\
				characters:3, justify:'right'					\
			},															\
			percent: StaticText { text:'%' }			\
		}";
		this.initRGBPickerComponent (componentIndex);
	}

	RGBPickerComponent.prototype.initRGBPickerComponent =
		function (componentIndex)
	{
		this.rgbVal = [0, 0, 0];
		this.componentIndex = componentIndex;
	}

	RGBPickerComponent.prototype.initialize = function (pickerObj, colorLabel, initialValue)
	{
		this.pickerObject = pickerObj;
		this.ui = pickerObj.getContainer().add (this.uiResource);
		this.ui.rgbComponentObj = this;	//	Link UI object back to this object

		with (this.ui) {
			label.graphics.font = pickerObj.getUIFont();
			label.text = colorLabel;
			slColor.value = initialValue * slColor.maxvalue;
			slColor.onChanging = slColor.onChange = function ()
				{
					//	'this' is the slider element
					this.parent.etColor.text = this.value;
					this.parent.rgbComponentObj.updateSwatch();
				}
			etColor.graphics.font = pickerObj.getUIFont();
			etColor.onChange = function ()
				{
					/*	'this' is the edittext element: limit its value
						between the slider's min and max values */
					var slider = this.parent.slColor;
					var val = Number (this.text);
					if (val > slider.maxvalue)
						val = slider.maxvalue;
					else if (val < slider.minvalue)
						val = slider.minvalue;
					slider.value = val;
					this.text = val;
					this.parent.rgbComponentObj.updateSwatch();
				}
		}
		this.setComponentValue (initialValue);
	}

	RGBPickerComponent.prototype.getComponentValue =
		function () { return this.rgbVal[this.componentIndex]; }

	RGBPickerComponent.prototype.setComponentValue = function (colorVal)
	{
		this.ui.slColor.value = colorVal * this.ui.slColor.maxvalue;
		this.ui.slColor.notify ("onChange");
	}

	RGBPickerComponent.prototype.updateSwatch = function ()
	{
		this.rgbVal[this.componentIndex] = this.ui.slColor.value / this.ui.slColor.maxvalue;
		var uiGfx = this.ui.graphics;
		this.ui.swatch.graphics.backgroundColor = uiGfx.newBrush (uiGfx.BrushType.SOLID_COLOR, this.rgbVal);
		this.ui.swatch.graphics.disabledBackgroundColor = this.ui.swatch.graphics.backgroundColor;
		this.pickerObject.updateRGBSwatch();
	}

	/*	
		The GrayPicker class is derived from the RGBPickerComponent class. It allows the user
		to select a shade of gray by simultaneously changing the Red, Green and Blue component
		values as the user changes a single Slider or EditText field. It has an invisible swatch
		because we don't want a preview of the gray shade (the main picker's swatch will show this).
	*/
	function GrayPicker ()
	{
		this.initGrayPicker();
	}

	//	Derive from RGBPickerComponent, 'override' its initialize method.
	GrayPicker.prototype = new RGBPickerComponent (0);
	GrayPicker.prototype.initializeRGBPickerComponent = GrayPicker.prototype.initialize;

	GrayPicker.prototype.initGrayPicker = function ()
	{
		this.initRGBPickerComponent (0);
	}

	GrayPicker.prototype.initialize = function (pickerObj, colorLabel, initialGrayLevel)
	{
		this.initializeRGBPickerComponent (pickerObj, colorLabel, initialGrayLevel);
		this.ui.swatch.visible = false;
	}

	/*
		Updates all swatches to a the selected shade of grey
	*/
	GrayPicker.prototype.updateSwatch = function ()
	{
		var grayLevel = this.ui.slColor.value / this.ui.slColor.maxvalue;
		this.pickerObject.enableUpdates (false);
		this.pickerObject.redPicker.setComponentValue (grayLevel);
		this.pickerObject.greenPicker.setComponentValue (grayLevel);
		this.pickerObject.bluePicker.setComponentValue (grayLevel);
		this.pickerObject.enableUpdates (true);
		this.pickerObject.updateRGBSwatch();
	}

	/*
		The RGBColorPicker class uses a GrayPicker instance and RGBPickerComponent 
		instances  to create an RGB color picker User Interface.

	*/
	function RGBColorPicker (container, initialRGB, fontSize)
	{
		this.initRGBColorPicker (container, initialRGB, fontSize);
	}

	/*
		Initializes the default values, sets the orientation of the Group container and adds the 
		RGBPickerComponents.
		
	*/
	RGBColorPicker.prototype.initRGBColorPicker = function (container, initialRGB, fontSize)
	{
		this.container = container;
		this.rgbValue = initialRGB;
		this.uiFont = ScriptUI.newFont ("palette", fontSize);
		this.updatesEnabled = false;
		//	Create the picker UI for each RGB component color
		container.orientation = 'column';
		container.alignChildren = ['fill','top'];
		container.spacing = 2;
		this.redPicker = new RGBPickerComponent (0);
		this.greenPicker = new RGBPickerComponent (1);
		this.bluePicker = new RGBPickerComponent (2);
		this.enableUpdates (false);
		this.redPicker.initialize (this, "R:", initialRGB[0]);
		this.greenPicker.initialize(this, "G:", initialRGB[1]);
		this.bluePicker.initialize(this,"B:", 2, initialRGB[2]);
		this.enableUpdates (true);
		this.grayPicker = new GrayPicker();
		this.grayPicker.initialize (this, "Gray:", 1);
		this.updateRGBSwatch();
	}

	RGBColorPicker.prototype.getContainer =
		function () { return this.container; }

	RGBColorPicker.prototype.getUIFont =
		function () { return this.uiFont; }

	RGBColorPicker.prototype.getRGBColor =
		function () { return this.rgbValue; }

	RGBColorPicker.prototype.enableUpdates =
		function (enable) { this.updatesEnabled = enable; }

	RGBColorPicker.prototype.updateRGBSwatch = function ()
	{
		if (this.updatesEnabled) {
			this.rgbValue[0] = this.redPicker.getComponentValue();
			this.rgbValue[1] = this.greenPicker.getComponentValue();
			this.rgbValue[2] = this.bluePicker.getComponentValue();
			var swatchGfx = this.container.window.rgbSwatch.graphics;
			swatchGfx.backgroundColor =
				swatchGfx.newBrush (swatchGfx.BrushType.SOLID_COLOR, this.rgbValue);
			swatchGfx.disabledBackgroundColor = swatchGfx.backgroundColor;
			this.container.window.rgbSwatch.btn.bgPen =
				swatchGfx.newPen (swatchGfx.PenType.SOLID_COLOR, this.rgbValue, kSwatchBorderWidth);
		}
	}

	// Create the color picker window
	var colorPickerRes =
	"palette {																					\
		text: 'Color Picker demo',														\
		properties: { closeOnKey:'OSCmnd+W', independent:true },		\
		orientation:'row',																	\
		rgbSwatch: Group {																\
			btn: Button { preferredSize:[40,40] }									\
		},																							\
		rgbPicker:	Group {	 },															\
	}";

	var colorPickerWin = new Window (colorPickerRes);
	colorPickerWin.rgbPicker = new RGBColorPicker (colorPickerWin.rgbPicker, [1, 1, 1], kFontSize);
	colorPickerWin.rgbSwatch.btn.onDraw = drawRGBSwatch;
	colorPickerWin.rgbSwatch.btn.onClick = clickRGBSwatch;

	/*	Force initial layout so UI element dimensions are known, and force swatch group 
		to fit tightly around the button (override layout manager's defaults) */
	colorPickerWin.layout.layout (true);
	with (colorPickerWin.rgbSwatch) {
		size = btn.size;
		location = [btn.windowBounds.x, btn.windowBounds.y];
		btn.location = [0, 0];
	}
	initializeDrawingState (colorPickerWin.rgbSwatch.btn);

	//	Now display the window
	colorPickerWin.show();

	/*
		The RGB swatch is implemented as a Group element with a Button that completely fills it. We use
		a Group because a Group's graphics.backgroundColor can be set, so we set it to the currently
		selected RGB color. We put a Button inside this Group to demonstrate making the swatch 'active',
		and to show a technique for making the Button be essentially transparent, by defining an onDraw
		handler for it that does not draw the 'background' of the button, but only its borders.
		We initialize the 'static' drawing state of the "rgb swatch" button as follows:
		<ul>
		<li>the 'border' paths are constant, so create them now rather than each time we draw the swatch
		<li>likewise, the pens for the borders are constant colors, so create them only once
		</ul>
	*/
	function initializeDrawingState (swatchBtn)
	{
		var gfx = swatchBtn.graphics;
		var btnW = swatchBtn.size.width;
		var btnH = swatchBtn.size.height;
		//	Define the top-left and bottom-right border paths
		var halfBorderW = kSwatchBorderWidth / 2;
		gfx.newPath();
		gfx.moveTo (halfBorderW, btnH - halfBorderW);
		gfx.lineTo (halfBorderW, halfBorderW);
		gfx.lineTo (btnW - halfBorderW, halfBorderW);
		swatchBtn.tlBorderPath = gfx.currentPath;
		gfx.newPath();
		gfx.moveTo (halfBorderW, btnH - halfBorderW);
		gfx.lineTo (btnW - halfBorderW, btnH - halfBorderW);
		gfx.lineTo (btnW - halfBorderW, halfBorderW);
		swatchBtn.brBorderPath = gfx.currentPath;
		//	Define the border pens: use semi-transparent pens so the background color shows through
		swatchBtn.highlightPen = gfx.newPen (gfx.PenType.SOLID_COLOR, [1, 1, 1, .4], kSwatchBorderWidth);
		swatchBtn.shadowPen = gfx.newPen (gfx.PenType.SOLID_COLOR, [.25, .25, .25, .4], kSwatchBorderWidth);
	}

	/*
		This is the "onDraw" event handler function for the rgb swatch Button. Because this function is
		called each time this Button is drawn, we want it to execute as fast as possible, so as
		much of the drawing state as possible is derived 'outside' this function.
	*/
	function drawRGBSwatch (drawingStateObj)
	{
		var gfx = this.graphics;
		try {
			//Don't draw button background - let our container's BG color show through. Just draw the border,
			//based on mouse state: first draw 'under' the border with the solid BG color from our container,
			//then draw over top of this using the semi-transparent border highlight and shadow.
			gfx.strokePath (this.bgPen, this.tlBorderPath);
			gfx.strokePath (this.bgPen, this.brBorderPath);
			if (drawingStateObj.leftButtonPressed) {
				gfx.strokePath (this.shadowPen, this.tlBorderPath);
				gfx.strokePath (this.highlightPen, this.brBorderPath);
			}
			else {
				gfx.strokePath (this.highlightPen, this.tlBorderPath);
				gfx.strokePath (this.shadowPen, this.brBorderPath);
			}
		}
		catch (e) {
			//	On any error, undefine the onDraw handler, so we don't get here again
			this.onDraw = undefined;
			alert ("drawRGBSwatch handler failed.\n" + e);
		}
	}

	//	This is the "onClick" event handler for the rgb swatch button
	function clickRGBSwatch ()
	{
		var rgb = this.window.rgbPicker.getRGBColor();
		alert ("Selected RGB color:\n  " + rgb[0] * 100 + "% red " + 
					rgb[1] * 100 + "% green " +
					rgb[2] * 100 + "% blue");
	}

}

/**
  "main program": construct an anonymous instance and run it
*/
if(typeof(ColorPicker_unitTest) == "undefined") {
	new ColorPicker().run();
}
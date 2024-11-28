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
 @fileoverview Demonstrates two-dimensional alignment of ScriptUI components.
 @class Demonstrates two-dimensional alignment of ScriptUI components.

 <h4>Usage</h4>
 
  <ol>
  <li>Run the snippet in the ExtendScript Toolkit (see Readme.txt). You can choose as a target any application that supports ScriptUI.
  <li>You should see two modeless dialogs, which show ScriptUI components placed in containers with either row or column orientation.
 </ol>
 
 <h4>Description</h4>

 <p>Creates two windows demonstrating the use of the two-dimensional
 form of the alignment property. Using this form, it is possible to control
 the vertical placement of elements within a container having column
 orientation and the horizontal placement of elements within a container
 having row orientation<br />

  @constructor Constructor
 */
function SnpAlignElements() 
{

	 /**
        Maintain reference to the window we created
	  @type Window
    */
   this.windowRef = null;
}

/**
 Functional part of this snippet.  Creates 2 windows with different alignment settings.
 @return boolean True if the snippet ran as expected, false if otherwise. For this snippet,
 there is at present no code path that can return false, as the snippet can run in any app
 that supports ScriptUI.
 @type boolean
*/
SnpAlignElements.prototype.run = function() 
{
	
	$.writeln("About to run SnpAlignElements");
	
	var retval = true;
	
	
	var desc1 =
		"Demonstrate vertical placement of elements within " +
		"groups with column orientation";
	
	// Resource specification for the vertical alignment window
	var res1 =
		"palette {																			\
			properties:{ closeButton:true, maximizeButton:false,			\
				minimizeButton:false, resizeable:false },					\
			orientation:'row', spacing:2, margins:5,							\
			alignChildren:['left','fill'],													\
			description: StaticText { properties:{ multiline:true },		\
				characters:15 },															\
			separator: Panel { preferredSize:[0,120] },						\
			g1: Group {																	\
				orientation:'column', spacing:2,									\
				x1: EditText { text:'top', alignment:['fill','top'] },			\
				x2: EditText { text:'center', alignment:['fill','center'] },	\
				x3: EditText { text:'bottom', alignment:['fill','bottom'] },	\
			},																					\
			g2: Group {																	\
				orientation:'column', spacing:2,									\
				x1: EditText { text:'top', alignment:['fill','top'] },			\
				x2: EditText { text:'top', alignment:['fill','top'] },			\
				x3: EditText { text:'bottom', alignment:['fill','bottom'] },	\
			},																					\
			g3: Group {																	\
				orientation:'column', spacing:2,									\
				x1: EditText { text:'top', alignment:['fill','top'] },			\
				x2: EditText { text:'bottom', alignment:['fill','bottom'] },	\
				x3: EditText { text:'bottom', alignment:['fill','bottom'] },	\
			},																					\
			g4: Group {																	\
				orientation:'column', spacing:2,									\
				x1: EditText { text:'top', alignment:['fill','top'] },			\
				x2: EditText { text:'fill', alignment:['fill','fill'] },				\
				x3: EditText { text:'bottom', alignment:['fill','bottom'] },	\
			},																					\
		}";

	var dw = demo ("Vertical alignment in columns", desc1, res1, [300, 50]);

	var desc2 =
		"Demonstrate horizontal placement of elements within " +
		"groups with row orientation";
		
	// Resource specification for the horizontal alignment window
	var res2 =
		"palette {																				\
			properties:{ closeButton:true, maximizeButton:false,				\
				minimizeButton:false, resizeable:false },						\
			orientation:'column', spacing:2, margins:5,							\
			alignChildren:['fill','top'],														\
			description: StaticText { properties:{ multiline:true },			\
				characters:30},																\
			separator: Panel { preferredSize:[300, 0] },							\
			g1: Group {																		\
				orientation:'row', spacing:2,											\
				x1: EditText { text:'left', alignment:['left','center'] },			\
				x2: EditText { text:'center', alignment:['center','center'] },	\
				x3: EditText { text:'right', alignment:['right','center'] },		\
			},																						\
			g2: Group {																		\
				orientation:'row', spacing:2,											\
				x1: EditText { text:'left', alignment:['left','center'] },			\
				x2: EditText { text:'left', alignment:['left','center'] },			\
				x3: EditText { text:'right', alignment:['right','center'] },		\
			},																						\
			g3: Group {																		\
				orientation:'row', spacing:2,											\
				x1: EditText { text:'left', alignment:['left','center'] },			\
				x2: EditText { text:'right', alignment:['right','center'] },		\
				x3: EditText { text:'right', alignment:['right','center'] },		\
			},																						\
			g4: Group {																		\
				orientation:'row', spacing:2,											\
				x1: EditText { text:'left', alignment:['left','center'] },			\
				x2: EditText { text:'fill', alignment:['fill','center'] },				\
				x3: EditText { text:'right', alignment:['right','center'] },		\
			},																						\
		}";

	dw = demo ("Horizontal alignment in rows", desc2, res2, dw);

	// Creates and shows the windows
	function demo (title, description, resource, ref)
	{
		var w = new Window (resource);
		w.text = title;
		w.description.text =description;
		if (typeof ref.frameBounds != "undefined")
			w.frameLocation = [ref.frameBounds.left, ref.frameBounds.bottom + 5];
		else
			w.frameLocation = ref;
		w.show();
		return w;
	}
	
	$.writeln("Ran SnpAlignElements");
	
	return retval;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpAlignElements_unitTest ) == "undefined") {
	new SnpAlignElements().run();
}

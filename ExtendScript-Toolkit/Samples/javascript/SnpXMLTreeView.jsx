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
 @fileoverview Shows to work with XML data, using the Adobe Mini-E4X implementation to manipulate the logical structure of an XML document.
  @class Shows to work with XML data, using the Adobe Mini-E4X implementation to manipulate the logical structure of an XML document.
 
	<h4>Usage</h4>
  <ol>
  <li>Open this file and run it in the ExtendScript Toolkit. 
       You can choose as the target any application that supports ScriptUI.
	  <li>  You should see a dialog with a tree view and other controls, showing a view of the logical structure of a
	  default XML document from the ./resources folder (in a file named SnpXMLTreeView.xml).
	<li>Expand and collapse the nodes on the tree to view the elements of the XML node. Note how the attributes and text of
	the elements are shown in text areas at the bottom of the dialog.
	<li>Use the Add/Remove buttons to add or remove elements from the tree.
	<li>Select an element and click 'Edit Name' to change the name of the element.
	<li>Select an element and click 'Edit Raw XML' to edit the element directly and click 'Apply Edit' to apply
				the changes or 'Cancel Edit' to cancel.
	<li>To enter an XPath expression, click 'XPath Query'.
	<li>You can load a new file into the XML viewer. To load a new XML file,  click 'Load File'.
	<li>You can saved the modified XML data to a file. To save the XML to a file,  click 'Save File'.
  </ol>
 
  <h4>Description</h4>
  
  <p>Note: This sample uses the Adobe ExtendScript Mini-E4X implementation to process XML.  The Mini-E4X implementation is a subset
	of the E4X specification (as per http://www.ecma-international.org/publications/standards/Ecma-357.htm ) and it does not cover all 
	aspects of the E4X specification; see the JavaScript Tools Guide for full details on Mini-E4X.
	
	<p>A ScriptUI TreeView component is used to represent the logical structure of an XML document.  
	An XML object (in the scripting DOM) is created by reading  
	XML-based content from a file and using this content to create the XML object. The top ListItem of the TreeView shows the top element
	of the XML object.
	
	<p>Each ListItem on the TreeView shows the name of the element that it represents.  Elements with children are rendered with
	node expander widgets.  
	Each TreeView node  has a value attached, 
	which is the actual XML object being represented.  As each ListItem is expanded, its value is interrogated and any elements found are 
	added to the TreeView.  Element text (or the first dozen or so characters of) is also shown  in the ListItem associated with the element,
	and the full text is displayed in a text area below the tree view.
		
	<p>The buttons available perform several different operations on the logical structure of the XML document, 
	from adding and removing elements anywhere
	in the tree, to editing the elements directly.  To add a new element then click the 'Add Element' button.  This will present a dialog, fill
	in the desired information and click 'OK' to see the new element added to the TreeView.  When adding an element the raw XML can 
	seen in the bottom text area of the 'Add Element' dialog as the details are entered.  This area can also be edited directly.  
	
	<p>To edit attributes and text elements then select the desired node and click the 'Edit Raw XML' button.  This will allow the raw XML to 
	be edited directly.  Click the 'Apply Edit' button to save any changes.
	
	<p>The Mini E4X does offer a full implementation of the XPath 1.0 standard ( http://www.w3.org/TR/xpath ) and XPath expressions 
	can be evaluated.  Click the 'XPath' button to enter an expression and have it evaluated agains the root XML node.  The results, if any, 
	will be displayed in the right text area at the bottom of the window.<br />
 
  @constructor Constructor
 */
function SnpXMLTreeView() 
{

	// Tells us where this script is running from
	var scriptsFile = new File($.fileName);

	/**
	 The XML file which will be used to populate the XML Treeview
	 @type File
	*/
	this.xmlFile = new File(scriptsFile.parent.parent.fsName + "/resources/SnpXMLTreeView.xml");
	
	this.requiredContext = "The file SnpXMLTreeView.xml must exist within the resources folder"; 
	/**
		The root XML Object
		@type XML
	*/
	this.XML = null;

}

/**
 Functional part of this snippet.  Loads the XML from a file and builds the UI.
 @return True if the snippet ran as expected, false otherwise
 @type boolean
*/
SnpXMLTreeView.prototype.run = function() 
{
	if(!this.canRun())
	{
		return false;
	}
	
	$.writeln("About to run SnpXMLTreeView");
	
	// Open the file and read the contents
	this.xmlFile.open("r");
	var contents = this.xmlFile.read();
	this.xmlFile.close();

	// Create the XML object
	this.XML = new XML(contents);
	preferredSize: [108, 22]
	// Create the window
	var res = 
	"window { text: 'SnpXMLTreeView', properties: { maximizeButton: false },  \
		pnl: Panel { text: 'XML', orientation: 'column', alignment: 'fill', alignChildren: 'left',  \
			gp: Group { orientaion: 'row', xmlTreeView: TreeView { preferredSize: [400, 300]  }, \
				btnGp: Group { alignment: 'top', orientation: 'column', \
					addBtn: Button {text: 'Add Element', preferredSize: [108, 22] },	removeBtn: Button {text: 'Delete Element', preferredSize: [115, 22] }, \
					editNameBtn: Button {text: 'Edit Name', preferredSize: [108, 22] }, editBtn: Button {text: 'Edit Raw XML', preferredSize: [108, 22]}, \
					xpathBtn: Button { text: 'XPath Query', preferredSize: [108, 22] }, loadBtn: Button {text: 'Load File', preferredSize: [108, 22]}, \
					dumpBtn: Button { text: 'Save File', preferredSize: [108, 22]}, saveBtn: Button {text: 'Apply Edit', visible: false, preferredSize: [108, 22] }, \
					cancelSaveBtn: Button {text: 'Cancel Edit', visible: false, preferredSize: [108, 22] } \
				}, \
			},  nsGp: Group { orientation: 'row', nsLbl: StaticText { text: 'Namespace:' }, nsName: StaticText {text: '', characters: 60 } } , \
		}, \
		txtPnl: Group { alignment: ['fill', 'fill'], orientation: 'row', \
			p1: Panel { text: 'Attributes', attText: EditText { preferredSize: [175, 100], properties: { multiline: true } } }, \
			p2: Panel { orientation: 'row', text: 'Text', nodeText: EditText { preferredSize: [275, 100], properties: { multiline: true } } , \
			}, \
		} \
	}";
	var win = new Window(res);
	win.pnl.gp.text = this.xmlFile.name;
	
	// Add the top element to the Treeview
	var root = win.pnl.gp.xmlTreeView.add("node", this.XML.localName());
	root.value = this.XML;

	// Keep a reference to this object
	var that = this;
	
	// Handlers for the main dialog
	
	// Adds a new element underneath the selected part of the Tree
	win.pnl.gp.btnGp.addBtn.onClick  = function()
	{
		// This is the XML object represented by the TreeView node
		var n = win.pnl.gp.xmlTreeView.selection.value;
		if(typeof n == "xml")
		{
			var obj = displayGetXMLDetaiils();
			if(obj instanceof XML)
			{
				n.appendChild(obj); // Add a new XML object to this element
				var tmp = win.pnl.gp.xmlTreeView.selection;
				
				if(tmp.type == "item") // We must replace an 'item' type with a 'node' type
				{
					// Store the detail of the ListItem we are going to update
					tmpTxt = tmp.text;
					tmpVal = tmp.value;
					p = tmp.parent;
					p.remove(tmp.index);  // Get rid of it
					tmp = p.add("node", tmpTxt); 	// And add the new node
					tmp.value = tmpVal;
				}
				
				win.pnl.gp.xmlTreeView.onExpand(tmp);
				tmp.expanded = true;		
			}
		}
	}

	// Removes the selected element and all of its children
	win.pnl.gp.btnGp.removeBtn.onClick = function()
	{
		if(win.pnl.gp.xmlTreeView.selection != null)
		{
			var n = win.pnl.gp.xmlTreeView.selection.value;
			if(typeof n == "xml")
			{
				var idx = n.childIndex();  // Get the index of this element
				var parent = n.parent(); // Get the parent
				
				if(parent != null)
				{
					delete parent[idx]; // Delete this element from the parent element
					
					// Rebuild the tree from the parent node
					var listP = win.pnl.gp.xmlTreeView.selection.parent;
					listP.remove(idx);
					if(listP.items.length == 1) // Clean up any trailing tags (</xxx>)
					{
						listP.removeAll();
					}			
					win.pnl.gp.xmlTreeView.onExpand(listP);
					listP.expanded = true;
					}				
			}
		}
	}

	// Change the name of the selected node
	win.pnl.gp.btnGp.editNameBtn.onClick = function()
	{
		var n = win.pnl.gp.xmlTreeView.selection.value;
		if(typeof n == "xml")
		{
			var name = prompt("Enter the new name for this element");
			if(name != null)
			{
				n.setName(name); // Set the name of this element to the one supplied
			}

			var listP = win.pnl.gp.xmlTreeView.selection.parent;
			// If the parent is the TreeView object then we are dealing with the root node
			if(listP instanceof TreeView)
			{
			win.pnl.gp.xmlTreeView.removeAll();
			root = win.pnl.gp.xmlTreeView.add("node", n.localName());
			root.value = n;
			win.pnl.gp.xmlTreeView.onExpand(win.pnl.gp.xmlTreeView.items[0]);
			}
			else
			{
				win.pnl.gp.xmlTreeView.onExpand(listP);
			}
			listP.expanded = true;			
		}		
	}

	// Edit the XML directly. Displays the XML contents of the selected node in the bottom text area
	// so it can be edited directly.
	win.pnl.gp.btnGp.editBtn.onClick = function()
	{
		if(win.pnl.gp.xmlTreeView.selection != null)
		{
			var n = win.pnl.gp.xmlTreeView.selection.value;
			if(typeof n == "xml")
			{
				str = n.toXMLString();
				if(str.length >= 29199) // EditText can only take so much data
				{
					str = "The XML is too long to be edited in this area, selected a node further down the tree.";
				}
				else
				{
					win.pnl.gp.btnGp.addBtn.enabled = false;
					win.pnl.gp.btnGp.removeBtn.enabled = false;
					win.pnl.gp.btnGp.editNameBtn.enabled = false;
					win.pnl.gp.btnGp.editBtn.enabled = false;
					win.pnl.gp.btnGp.xpathBtn.enabled = false;
					win.pnl.gp.btnGp.loadBtn.enabled = false;
					win.pnl.gp.btnGp.dumpBtn.enabled = false;
					
					win.pnl.gp.btnGp.cancelSaveBtn.visible = true;
					win.pnl.gp.xmlTreeView.enabled = false;
					win.pnl.gp.btnGp.saveBtn.visible = true;
				}
				win.txtPnl.p2.nodeText.text = str;
			}
		}
	}
	
	// Prompts for an XPath expression and then passes that to this XML object
	win.pnl.gp.btnGp.xpathBtn.onClick = function()
	{
		win.txtPnl.p2.nodeText.text = "";
		var xp = prompt("Enter a xpath expression.  The expression will be evaluated against the root element of the XML.")
		if(xp != null)
		{
			var x = that.XML.xpath(xp);
			win.txtPnl.p2.nodeText.text = x.toXMLString();
		}
	}

	// Loads a new XML file
	win.pnl.gp.btnGp.loadBtn.onClick = function()
	{	
			prompt = "Load XML File";
			if(File.fs = "Windows")
			{
				var f = File.openDialog(prompt, "XML Files: *.xml");
			}
			else
			{
				var f = File.openDialog(prompt, checkMacFileType);
			}
			if(f != null)
			{
				f.open("r");
				c = f.read();
				f.close();
				this.XML = new XML(c);
				
				win.pnl.gp.xmlTreeView.removeAll();
				var root = win.pnl.gp.xmlTreeView.add("node", this.XML.localName());
				root.value = this.XML;
				win.pnl.text = f.name;
			}
	}

	// Saves this XML object to a file
	win.pnl.gp.btnGp.dumpBtn.onClick = function()
	{
		var f = File.saveDialog("Select a file or enter the file name");
		if(f)
		{
			f.open("w");
			f.write(that.XML.toXMLString());
			f.close();	
		}
	}

	// Whenever the tree selection changes the buttons are enabled/disabled as appropriate
	// and the bottom text are is supplied with any text elements of the selected XML element
	win.pnl.gp.xmlTreeView.onChange = function()
	{
		win.txtPnl.p2.nodeText.text = "";
		if(this.selection != null)
		{
			var n = this.selection.value;
			if(typeof n == "xml")
			{
				// Display the names space if one available
				win.pnl.nsGp.nsName.text = n.namespace();
				
				// Display the attributes if there are any
				win.txtPnl.p1.attText.text = "";
				var atts = n.attributes();
				for(var j = 0;j < atts.length();j++)
				{
					win.txtPnl.p1.attText.text += atts[j].name() + "='" + atts[j] + "'\n";
				}
			
				win.txtPnl.p2.nodeText.text = n.text();
			
				win.pnl.gp.btnGp.addBtn.enabled = true;
				win.pnl.gp.btnGp.removeBtn.enabled = true;
				win.pnl.gp.btnGp.editNameBtn.enabled = true;
				win.pnl.gp.btnGp.editBtn.enabled = true;
				win.pnl.gp.btnGp.xpathBtn.enabled = true;
			}
		}
	}

	// Exits from edit mode or saves the updated XML and overwrites the selected XML element
	win.pnl.gp.btnGp.saveBtn.onClick = win.pnl.gp.btnGp.cancelSaveBtn.onClick = function()
	{
		if(this.text == "Apply Edit")
		{
			var n = win.pnl.gp.xmlTreeView.selection.value;
			if(typeof n == "xml")
			{
				try{
					var x = new XML(win.txtPnl.p2.nodeText.text);
					var p = n.parent();
					if(p != null)
					{
						p.insertChildAfter(n, x);
						var idx = n.childIndex();
						delete p[idx];
						
						listP = win.pnl.gp.xmlTreeView.selection.parent;
						win.pnl.gp.xmlTreeView.onExpand(listP);
						listP.expanded = true;	
					}
					else
					{
						win.pnl.gp.xmlTreeView.selection.value = x;
						win.pnl.gp.xmlTreeView.onExpand(win.pnl.gp.xmlTreeView.selection);
						win.pnl.gp.xmlTreeView.selection.expanded = true;	
					}			
				} catch(e) { alert(e); }
			}
		}
		
		win.pnl.gp.btnGp.addBtn.enabled = true;
		win.pnl.gp.btnGp.removeBtn.enabled = true;
		win.pnl.gp.btnGp.editNameBtn.enabled = true;
		win.pnl.gp.btnGp.editBtn.enabled = true;
		win.pnl.gp.btnGp.xpathBtn.enabled = true;
		win.pnl.gp.btnGp.loadBtn.enabled = true;
		win.pnl.gp.btnGp.dumpBtn.enabled = true;
		win.pnl.gp.btnGp.cancelSaveBtn.visible = false;
		win.pnl.gp.btnGp.saveBtn.visible = false;
		win.pnl.gp.xmlTreeView.enabled = true;
		win.pnl.gp.enabled = true;
		win.txtPnl.p2.nodeText.text = "";
	
	}

	// To save time we will only build the parts of the Tree we are currently looking at
	win.pnl.gp.xmlTreeView.onExpand = function(item)
	{
		var xmlNode = item.value; // Get the XML object attached to the ListItem
		var e = xmlNode.elements(); // find the elements of the XML object

		if(typeof e == "undefined") return;
		
		// If there are some elements then we want to rebuild the tree directly under this item
		// so first we remove any items
		if(e.length() > 0)
		{
			if(item.type == "node") /////////////////////////////////////
			{
				item.removeAll();
				// If the XML element at this item has any text elements then add them as an 'item'
				if(xmlNode.text() != "")
				{
					var txt = xmlNode.text(); // This returns a XML object - not a string
					this.text += "'" + txt.toString().substring(0, 15);
				}
			}
		}
		
		// Add each of the elements as a node item to the tree
		for(var i =0;i < e.length();i++)
		{
			if(e[i].elements().length() != 0)
			{
				var n = item.add("node", e[i].localName());
			}
			else
			{
				n = item.add("item", e[i].localName());
			}
		
			if(e[i].text() != "")
			{
				var txt = e[i].text(); // This returns a XML object - not a string
				n.text += "  '" + txt.toString().substring(0, 15);
				if(txt.toString().length > 15) 
				{
				    n.text  += "...'";
				} 
			    else
				{
				    n.text  += "'";	
				}
			}
					
			n.value = e[i];
		}
	}

	// Utility function so only files with a XML extension can
	// be loaded when this script runs on a mac
	function checkMacFileType(file)
	{
		if(!file instanceof Folder) return true;
		
		index = file.name.lastIndexOf(".");
		ext = file.name.substring(index + 1);
		
		if(ext == "xml" || ext == "XML")
		{
			return true;
		}
		return false;
	}

	// Presents a dialog so a new element can be added.
	// All parameters needed to create the element can be added.
	// The dialog also allows XML to be entered directly into an edit area
	// and if the XML is correctly formed a new element will be added.
	function displayGetXMLDetaiils()
	{
		// This will be returned value to the main dialog
		var x = undefined;
		
		var res = "dialog { text: 'Add Element', properties: {resizable: false} , 	\
			p: Panel { text: 'Element', alignment: ['fill', 'fill'], orientation: 'row', s:  StaticText { text: 'Name:' }, elName: EditText { alignment: ['fill', 'fill']} }, \
			topGP: Group { orientation: 'row', alignChildren: ['fill', 'fill'] ,\
				attGp: Panel { text: 'Attributes', orientaiton: 'column', \
					topRow: Group { alignment:  ['fill', 'fill'], alignChildren: ['left', 'center'], \
						aLabel: StaticText { text: 'Attribute Name:'} , \
						attribName: EditText { text: '', preferredSize: [100, 20] }, \
						addAttBtn: Button { text: 'Add', preferredSize: [45, 23] } \
					},\
					bottomRow: Group { orientation: 'row', alignChildren: 'left', \
						attribList: DropDownList { } , attribVal: EditText {preferredSize: [100, 20] }, attribValBtn: Button { text: 'Set', minimumSize: [40, 23]}\
					} \
				}, \
				attGp2: Panel { text: 'Text', orientaiton: 'column', dText: EditText { properties:{multiline:true}, preferredSize:  [200, 70], multiline: true } } \
			}, \
			elementGp: Panel {text: 'Element String', alignment: ['fill', 'fill'], alignChildren: ['fill', 'fill'], \
				eText: EditText { text: '', characters: 40, preferredSize: [200, 50], properties: { multiline: true} }, \
			} ,\
			btnGp: Group { okBtn: Button {text: 'OK' }, cancelBtn: Button {text: 'Cancel' } \
			} }";
		
		var d = new Window(res);	
		
		d.topGP.attGp.bottomRow.attribList.preferredSize.width = d.topGP.attGp.topRow.aLabel.preferredSize.width;
		d.topGP.attGp.bottomRow.attribList.add("item", "None");
		d.topGP.attGp.bottomRow.attribVal.preferredSize.width = 100;
		d.topGP.attGp.bottomRow.attribValBtn.preferredSize.width = 30;
		d.topGP.attGp.bottomRow.attribList.items[0].selected = true;
		
		// Handlers
		
		// When the element name text box if edited
		d.p.elName.onChange = d.topGP.attGp2.dText.onChange = function()
		{
			d.elementGp.eText.text = buildXMLString();
		}
		
		// Adding an attribute
		d.topGP.attGp.topRow.addAttBtn.onClick = function()
		{
			// Get text - ignore attribute names with spaces in them
			if(d.topGP.attGp.topRow.attribName.text.lastIndexOf(" ") < 0)
			{
				// add attrib onto dropdown list
				d.topGP.attGp.bottomRow.attribList.add("item", d.topGP.attGp.topRow.attribName.text);
				d.topGP.attGp.topRow.attribName.text = "";
				// Select the last added item
				d.topGP.attGp.bottomRow.attribList.items[d.topGP.attGp.bottomRow.attribList.items.length-1].selected = true;
				
				if(d.topGP.attGp.bottomRow.attribList.items[0].text == "None")
				{
					d.topGP.attGp.bottomRow.attribList.remove(0);
				}
			}
		}

		// Setting a value to an attribute
		d.topGP.attGp.bottomRow.attribValBtn.onClick = function()
		{
			// Give the param a value
			var item = d.topGP.attGp.bottomRow.attribList.selection;
			item.value = d.topGP.attGp.bottomRow.attribVal.text;
			d.elementGp.eText.text = buildXMLString();
		}

		d.topGP.attGp.bottomRow.attribList.onChange = function()
		{
			if(typeof d.topGP.attGp.bottomRow.attribList.selection.value != "undefined")
			{
				d.topGP.attGp.bottomRow.attribVal.text = d.topGP.attGp.bottomRow.attribList.selection.value;
			}
			else
			{
				d.topGP.attGp.bottomRow.attribVal.text = "";
			}
		}

		d.btnGp.okBtn.onClick = function()
		{
			var s = buildXMLString();
			if(s != "")
			{
				try{
					x = new XML(s);
					if(x.nodeKind() != "element")
					{
						x = undefined;
					}
				}
				catch(e)
				{ 
					alert(e); 
					x = undefined;
				}
			}
			d.close(1);
		}

		d.btnGp.cancelBtn.onClick = function()
		{
			d.close(2); 
		}

		// Utility function to create an XML string from the input params
		function buildXMLString()
		{
			if(d.p.elName.text != "")
			{
				if(d.topGP.attGp.bottomRow.attribList.items[0].text != "None")
				{
					var params = "";
					for(var i = 0;i < d.topGP.attGp.bottomRow.attribList.items.length;i++)
					{
						var item = d.topGP.attGp.bottomRow.attribList.items[i]
						params += " " + item.text + "='" + item.value + "'";
					}
					var n = "<" + d.p.elName.text + params + ">" + d.topGP.attGp2.dText.text + "</" + d.p.elName.text + ">";
				}
				else
				{
					var n = "<" + d.p.elName.text +  ">" + d.topGP.attGp2.dText.text + "</" + d.p.elName.text + ">";
				}
			}
			else if(d.elementGp.eText.text != "")
			{
				var n = d.elementGp.eText.text;
			}
			return n;		
		}
		d.show();
		return x;
	}

	win.show();
	win.pnl.gp.xmlTreeView.notify(); // Ensure the buttons are disabled if no selection is made
	
	$.writeln("Ran SnpXMLTreeView");
	return true;
}


/**
 Determines whether snippet can be run given current context.  The snippet 
 fails if these preconditions are not met:
 <ul>
 <li> The XML file must be available
 </ul>
 @return True if this snippet can run, false otherwise
 @type Boolean
*/
SnpXMLTreeView.prototype.canRun = function()
 {

	if(this.xmlFile.exists) 
	{ 
		return true;
	}
	$.writeln("ERROR:: Cannot run SnpXMLTreeView");
	$.writeln(this.requiredContext);
	return false;
}

/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpXMLTreeView_unitTest ) == "undefined") {
	new SnpXMLTreeView().run();
}

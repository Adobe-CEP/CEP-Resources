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
 @fileoverview Shows how to use a tree-view list element, and how to capture events with 
 	either callback functions or script-registered event listeners.
 @class Shows how to use a tree-view list element, and how to capture events with 
 	either callback functions or script-registered event listeners.
 
  <h4>Usage</h4>
   
   
   <ol>
   <li>Run the snippet in the ExtendScript Toolkit (see Readme.txt).
    <li>Expand and collapse the list elements
    <li>Inspect the JavaScript Console to see the captured events from the TreeView elements.
  </ol>

  <h4>Description</h4>
  
  <p>Creates two TreeView hierarchical list components. One is static, with a fixed set of item
  nodes that you can expand and collapse. The other is dynamic; item nodes are added and removed as 
  as needed to show a view of the filesystem.  
  
  <p>The list items in the TreeView use custom images to display folders and files.  When adding items to the 
  TreeView list, the type 'item' is used for leaf elements and 'node' for container elements.
  
  <p>The dynamic TreeView captures events in two different ways. It uses callback functions to capture the
  node expand and collapse events and selection changes, and also registers an event listener to 
  capture double-click events.<br />

 
  @constructor Constructor 
 */
function SnpCreateTreeView() 
{
	/**
	 The context in which this snippet can run.
	 @type String
	*/
	this.requiredContext = "\tRequires the target application to support ScriptUI\n";	

	/**
	  The file-system location of this script
	  @type File
	*/
	var scriptsFile = new File($.fileName);
	
	/**
	  The file-system location of the PNG resource file used to represent folders
	  @type File
	*/
	this.folderIcon = new File(scriptsFile.parent.path + "/resources/Folder_16x16.png");

	/**
	  The file-system location of the PNG resource file used to represent files
	  @type File
	*/
	this.fileIcon = new File(scriptsFile.parent.path + "/resources/Story_16x16.png");

	/**
	  The root folder that will be used for the dynamic tree
	  @type String
	*/
	this.rootFolder

	if(File.fs == "Windows")
	{
		this.rootFolder = "C:";
	}
	else
	{
		this.rootFolder = "/";
	}
}

/**
 Functional part of this snippet. Creates the ScriptUI window and its components ,
 and defines the behavior.
 @return True if the snippet ran as expected, false otherwise
 @type boolean
*/
SnpCreateTreeView.prototype.run = function() 
{

	$.writeln("About to run SnpCreateTreeView");
	
	// Create the window
	var win = new Window("palette", "SnpCreateTreeView", undefined, {resizeable: false});

	// Create the panel for the static TreeView
	var sPanel = win.add("panel", undefined, "Static TreeView Element");
	sPanel.alignment = ["fill", "fill"];
	sPanel.alignChildren = ["fill", "fill"]

	// Create the TreeView list
	var sTv = sPanel.add("treeview");
	sTv.preferredSize = [300, 200];
	// Add static items to the list, in a hierarchical structure.
	for(var i = 0;i < 10;i++)
	{
		sTv.add("node", "Item " + i);	
		for(var j = 0;j < 4;j++)
		{
			sTv.items[i].add("item", "Sub Item " + j);
		}
	}

	// Create the panel for the dynamic TreeView
	var dPanel = win.add("panel", undefined, "Dynamic TreeView Element");
	// Create the TreeView list
	var dTv = dPanel.add("treeview", undefined);
	dTv.preferredSize = [400, 300];
	// Create the root node item
	var aNode = dTv.add("node", "/");
	// Associate it with an icon image
	aNode.image = this.folderIcon;

	// Define an event handler for double clicks
	myOnDoubleClick = function(e)
	{
		if(e.detail ==  2)
		{
			$.writeln("Double Click");	
		}
	}

	// Add the handler as an event listener to the TreeView element.
	dTv.addEventListener('click', myOnDoubleClick);

	// Keep a reference to this object
	var that = this;

	// Define an event handler for when a node is expanded
	dTv.onExpand  = function (item)
	{ 
		$.writeln(item.text + " is now expanded.");		
		var nextItem = item;
		var path = "";
		var goUp = true;

		while(goUp)
		{
			path = "/" + nextItem.text + path;
			nextItem = nextItem.parent;
			if(nextItem instanceof TreeView)
			{
				goUp = false;
			}
		}

		// Remove all the children of this item
		item.removeAll();

		var ref = new Folder(that.rootFolder + path);
		if(ref instanceof Folder)
		{
			var children = ref.getFiles();
			for(var i = 0;i < children.length;i++)
			{
				if(children[i] instanceof Folder)
				{
					item.add("node", children[i].displayName);
					item.items[i].image = that.folderIcon;
				}
				else
				{
					item.add("item", children[i].displayName);
					item.items[i].image = that.fileIcon;
				}
			}
		}
	}

	// Define an event handler for when a node is collapsed
	dTv.onCollapse = function (item)
	{
		$.writeln(item.text + " is now collapsed.");		
	}

	// Define an event handler for when the selection changes
	dTv.onChange = function()
	{
		$.writeln("Selection has changed");
	}

	// Display the window
	win.show();
	
	$.writeln("Ran SnpCreateTreeView");
	
	return true;
}


/**
 "main program": construct an anonymous instance and run it
  as long as we are not unit-testing this snippet.
*/
if(typeof(SnpCreateTreeView_unitTest ) == "undefined") {
	new SnpCreateTreeView().run();
}

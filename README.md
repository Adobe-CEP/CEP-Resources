Getting Started with the Creative Cloud Extension SDK
==============

This page provides resources you need to get started creating extensions for Adobe Creative Cloud applications, using the new HTML5/JavaScript interface model. The Flash/ActionScript interface model for extensions is deprecated in the current Creative Cloud release, and will no longer be supported in the upcoming CC 2014 release.

* The Creative Suite 6 and the current Creative Cloud releases of Adobe desktop applications support CEP 4, which allows you to build extensions using the older Flash/ActionScript interface model. However, the new HTML5/JavaScript model is preferred. It is recommended that you port existing Flash/ActionScript extensions to the new model.

* In the upcoming CC 2014 release, extensions and add-ins must be built on the CEP 5 infrastructure and loaded with Extension Manager. The current releases do not support CEP 5.

This SDK provides the low-level tools that you need to build extensions. Extensions that you build using these tools must be packaged as ZXP files in order to be seen and loaded by Extension Manager. You can offer extensions as free or paid products through our marketing portals (Adobe Exchange, the Add-ins website, the Creative Cloud desktop app). When you do this, you upload the extension to Adobe as a single ZXP file. 

Resources you will need include:
* CEP JavaScript libraries for communicating  with the operating system and Extension Manager and for communicating wtih the host application and other extensions.
* Sample code for how to use these libraries
* The ZXP packager, a command-line utility

(Because we are in transition and working on the new relese, some of the documents provided here are in the process of being updated, and may not be entirely applicable in the current environment.)

----

For developing CEP 4.x and extensions for CS6/CC host applications
* [Extension Builder 3 Preview](http://adobe.ly/1pho2QU)
* [Extension Builder 3 forums - get help from the developer community](http://adobe.ly/1mgZ2xe)
   (NOTE: EB3 is compatible with CEP 4.x only)
* [Documentation for CEP 4.2](http://adobe.ly/1cWBggl)
* [CSInterface for CEP4.2](https://github.com/Adobe-CEP/JavaScript-API/blob/master/CSInterface-4.2.0.js)
   (NOTE: Include this file in your extension project for CS6/CC host apps)
* [Tutorial](http://bit.ly/1nNLqH4)
   (NOTE: A bit old)

----

For developing CEP5 HTML/JavaScript extensions for CC2014 host applications

* [CSInterface for CEP5](https://github.com/Adobe-CEP/JavaScript-API/blob/master/CSInterface.js)
   (NOTE: Include this file in your extension project)
* [Vulcan for CEP5 (Communication API)](https://github.com/Adobe-CEP/CEP-Resources/blob/master/Vulcan.js)
   (NOTE: Include this file in your extension project if you wish to exchange messages with the host or other extensions
* [CEPEngine Extension API spec (zipped)](http://adobe.ly/1p2Onnl) 
   (NOTE: Do NOT include this file in your extension project. It is already integrated into CEP)
* [Sample extensions](https://github.com/Adobe-CEP/Samples)
* [A short guide to HTML5 extensions](http://adobe.ly/Nk1EK7)
   (NOTE:  For CEP 4.0 but still mostly relevant)
* [Guide to signing extensions](http://adobe.ly/1oiS4FE)
   (NOTE:  For CEP 4.0 but probably valid for CEP 5)

----

Miscellaneous help
* [Davide Barranca’s blog](http://bit.ly/Nk1Mta)
* [David Deraedt’s plugin for Adobe Brackets](http://bit.ly/QKWWYL)
* [The other API (Article on Medium)](http://bit.ly/1hIFZay)
* [Adobe Exchange](http://bit.ly/1mHVksI)

----




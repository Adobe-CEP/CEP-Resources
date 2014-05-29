Getting Started with the CC2014 Extension SDK
==============

This page provides resources you need to get started creating extensions for Adobe Creative Cloud.Next applications, using the new HTML5/JavaScript interface model. The Flash/ActionScript interface model for extensions is no longer supported.

Extensions and add-ins are built on the CEP 5 infrastructure and loaded with Extension Manager. Extensions that you build using these low-level tools must be packaged as ZXP files in order to be seen and loaded by Extension Manager. You can offer extensions as free or paid products through our marketing portals (Adobe Exchange, the Add-ins website, the Creative Cloud desktop app). When you do this, you upload the extension to Adobe as a single ZXP file. 

Resources you will need include:
* CEP JavaScript libraries for communicating  with the operating system and Extension Manager and for communicating wtih the host application and other extensions.
* Sample code for how to use these libraries
* The ZXP packager, a command-line utility

(some of the documents provided here are in the process of being updated, and may not be entirely applicable)

* For developing CEP5 HTML/JavaScript extensions for CC2014 host applications
** [CSInterface for CEP5](https://github.com/Adobe-CEP/JavaScript-API/blob/master/CSInterface.js)
   (NOTE: Include this file in your extension project)
** [Vulcan for CEP5 (Communication API)](https://github.com/Adobe-CEP/CEP-Resources/blob/master/Vulcan.js)
   (NOTE: Include this file in your extension project if you wish to exchange messages with the host or other extensions
** [CEPEngine Extension API spec (zipped)](http://adobe.ly/1p2Onnl) 
   (NOTE: Do NOT include this file in your extension project. It is already integrated into CEP)
** [Sample extensions](https://github.com/Adobe-CEP/Samples)
** [A short guide to HTML5 extensions](http://adobe.ly/Nk1EK7)
   (NOTE:  For CEP 4.0 but still mostly relevant)
** [Guide to signing extensions](http://adobe.ly/1oiS4FE)
   (NOTE:  For CEP 4.0 but probably valid for CEP 5)

* Miscellaneous help
** [Davide Barranca’s blog](http://bit.ly/Nk1Mta)
** [David Deraedt’s plugin for Adobe Brackets](http://bit.ly/QKWWYL)
** [The other API (Article on Medium)](http://bit.ly/1hIFZay)
** [Adobe Exchange](http://bit.ly/1mHVksI)

* For CEP 4.x and extensions to CS6/CC host applications
** [Extension Builder 3 Preview](http://adobe.ly/1pho2QU)
** [Extension Builder 3 forums - get help from the developer community](http://adobe.ly/1mgZ2xe)
   (NOTE: EB3 is compatible with CEP 4.x only)
** [Documentation for CEP 4.2](http://adobe.ly/1cWBggl)
** [CSInterface for CEP4.2](https://github.com/Adobe-CEP/JavaScript-API/blob/master/CSInterface-4.2.0.js)
   (NOTE: Include this file in your extension project for CS6/CC host apps)
** [Tutorial](http://bit.ly/1nNLqH4)
   (NOTE: A bit old)



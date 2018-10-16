Getting Started with Common Extensibility Platform (CEP)
==============

This page provides the resources you need to get started in order to create extensions for Adobe Creative Cloud applications, using the new HTML5/JavaScript interface model. The Flash/ActionScript interface model for extensions is deprecated in Creative Cloud releases; Support has already been removed from CC2014 and later releases.

* Creative Cloud 2019 products include CEP 9 for developing extensions and add-ons. Refer to the [table](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep) for 2019 products integration with CEP 9.

* Creative Cloud 2018 products include CEP 8 for developing extensions and add-ons. Refer to the [table](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep) for 2018 product integration with CEP 8.

* In the Creative Cloud 2015.x release in June 2016, Photoshop and Illustrator use CEP 7 while other applications still use CEP 6.1. Extensions and add-ons must be built on at least CEP 6 infrastructure.

* In the Creative Cloud 2015 release, extensions and add-ons must be built on the CEP 6 infrastructure.

* In the Creative Cloud 2014 release, extensions and add-ons must be built on the CEP 5 infrastructure and loaded with Extension Manager. The current releases either do not now or soon will not support CEP 4 and Flash/ActionScript extensions.

* The Creative Suite 6 and the Creative Cloud 2013 releases of Adobe desktop applications support CEP 4, which allows you to build extensions using the older Flash/ActionScript interface model. However, the new HTML5/JavaScript model is preferred. It is recommended that you port existing Flash/ActionScript extensions to the new model.

This SDK provides the low-level tools that you need to build extensions. Extensions that you build using these tools must be packaged as ZXP files in order to be seen and loaded by Extension Manager. You can offer extensions as free or paid products through our marketing portals (Adobe Exchange, the Add-ins website, the Creative Cloud desktop app). When you do this, you upload the extension to Adobe as a single ZXP file.

Resources you will need include:
* CEP JavaScript libraries for communicating with the operating system and Extension Manager and for communicating with the host application and other extensions.
* Sample code for how to use these libraries
* The ZXP packager, a command-line utility

---

For developing CEP 9.0 HTML/JavaScript extensions for CC 2019.x host applications

**Documentation**
* [CEP 9.0 HTML Extension Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md)
* [CEP 9 runtime](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#chromium-embedded-framework-cef) 

For CEP 8,
* [CEP 8.0 HTML Extension Cookbook](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md)
* [CEP 8 runtime](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#chromium-embedded-framework-cef) 

**APIs** 
CEP 9 APIs: https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_9.x
* Include these files in your extension project if you need to use the APIs.
  * CSInterface.js
  * Vulcan.js
* Do NOT include this file in your extension project. It is already integrated into CEP.
  * CEPEngine_extensions.js

**Samples**
* [Sample extensions](https://github.com/Adobe-CEP/Samples)

**Packaging and Signing Tool (ZXPSignCMD)**
* Tool: [ZXPSignCMD](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD)
* Document: [Packaging and Signing Adobe Extensions](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf) 

**Extension Installation Tools**
* Extension Manager Command Line Tool
  * [Announcement: Extension Manager End of Life](https://www.adobeexchange.com/resources/27)
  * [ExMan Command Line Tool](https://www.adobeexchange.com/resources/28)
  * [ExMan Command Line Tool's Error Codes](http://www.adobeexchange.com/resources/19#errors)
* [A Python script to install & manage extensions](https://github.com/adobe-photoshop/generator-panels/blob/master/installPanels.py) (by John Peterson)
* Other Tools
  * http://zxpinstaller.com/
  * http://install.anastasiy.com/

---

For developing CEP 7.0 HTML/JavaScript extensions for CC 2015.x host applications

**Documentation**
* [CEP 7.0 HTML Extension Cookbook for 2015.x in June 2016](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/CEP_7.0_HTML_Extension_Cookbook.pdf)
* [CEP 7 Feature List](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/CEP_7_Feature_List.pdf)

**APIs** (https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_7.x)
* Include these files in your extension project if you need to use the APIs.
  * AgoraLib.js
  * CSInterface.js
  * Vulcan.js
* Do NOT include this file in your extension project. It is already integrated into CEP.
  * CEPEngine_extensions.js
* Extension Manifest
  * ExtensionManifest_v_7_0.xsd

**Samples**
* [Sample extensions](https://github.com/Adobe-CEP/Samples)

**Packaging and Signing Tool (ZXPSignCMD)**
* Tool: [ZXPSignCMD](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD)
* Document: [Packaging and Signing Adobe Extensions](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf) (NOTE:  For CEP 4.0 but valid for CEP 7.x)

**Extension Installation Tools**
* Extension Manager Command Line Tool
  * [Announcement: Extension Manager End of Life](https://www.adobeexchange.com/resources/27)
  * [ExMan Command Line Tool](https://www.adobeexchange.com/resources/28)
  * [ExMan Command Line Tool's Error Codes](http://www.adobeexchange.com/resources/19#errors)
* [A Python script to install & manage extensions](https://github.com/adobe-photoshop/generator-panels/blob/master/installPanels.py) (by John Peterson)
* Other Tools
  * http://zxpinstaller.com/
  * http://install.anastasiy.com/

----

For developing CEP 6.1 HTML/JavaScript extensions for CC2015.1 host applications

**Documentation**
* [CEP 6.1 HTML Extension Cookbook for CC 2015.1](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_6.x/CEP_6.1_HTML_Extension_Cookbook.pdf)
* [CEP 6 Feature List](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_6.x/CEP_6_Feature_List.pdf)

**APIs** (https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_6.x)
* Include these files in your extension project if you need to use the APIs.
  * AgoraLib.js
  * CSInterface.js
  * Vulcan.js
* Do NOT include this file in your extension project. It is already integrated into CEP.
  * CEPEngine_extensions.js
* Extension Manifest
  * ExtensionManifest_v_6_0.xsd

**Samples**
* [Sample extensions](https://github.com/Adobe-CEP/Samples)

**Packaging and Signing Tool (ZXPSignCMD)**
* [Packaging and Signing Adobe Extensions](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf) (NOTE:  For CEP 4.0 but valid for CEP 6.x)

**Extension Installation Tools**
* Extension Manager Command Line Tool
  * [Announcement: Extension Manager End of Life](https://www.adobeexchange.com/resources/27)
  * [ExMan Command Line Tool](https://www.adobeexchange.com/resources/28)
  * [ExMan Command Line Tool's Error Codes](http://www.adobeexchange.com/resources/19#errors)
* [A Python script to install & manage extensions](https://github.com/adobe-photoshop/generator-panels/blob/master/installPanels.py) (by John Peterson)
* Other Tools
  * http://zxpinstaller.com/
  * http://install.anastasiy.com/

----

For developing CEP 6.0 HTML/JavaScript extensions for CC2015 host applications

**Documentation**
* [CEP 6.0 HTML Extension Cookbook for CC 2015](https://github.com/Adobe-CEP/CEP-Resources/wiki/CEP-6-HTML-Extension-Cookbook-for-CC-2015)

**APIs** (https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_6.x)
* Include these files in your extension project if you need to use the APIs.
  * AgoraLib.js
  * CSInterface.js
  * Vulcan.js
* Do NOT include this file in your extension project. It is already integrated into CEP.
  * CEPEngine_extensions.js
* Extension Manifest (unchanged in CEP 6.0)
  * ExtensionManifest_v_5_0.xsd

**Samples**
* [Sample extensions](https://github.com/Adobe-CEP/Samples)

**Packaging and Signing Tool (ZXPSignCMD)**
* [Packaging and Signing Adobe Extensions](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf) (NOTE:  For CEP 4.0 but valid for CEP 6)

**Extension Installation Tools**
* Extension Manager Command Line Tool
  * [Announcement: Extension Manager End of Life](https://www.adobeexchange.com/resources/27)
  * [ExMan Command Line Tool](https://www.adobeexchange.com/resources/28)
  * [ExMan Command Line Tool's Error Codes](http://www.adobeexchange.com/resources/19#errors)
* [A Python script to install & manage extensions](https://github.com/adobe-photoshop/generator-panels/blob/master/installPanels.py) (by John Peterson)
* Other Tools
  * http://zxpinstaller.com/
  * http://install.anastasiy.com/

----

For developing CEP 5.x HTML/JavaScript extensions for CC2014 host applications

**Documentation**
* [Offical Adobe Extension SDK Documentation for CC 2014](http://adobe.ly/1rin38t)
* [CEP 5 HTML Extension Cookbook for CC 2014](https://github.com/Adobe-CEP/CEP-Resources/wiki/CEP-5-HTML-Extension-Cookbook-for-CC-2014)
* [CEP 5 Flash Extension Cookbook for CC 2014](https://github.com/Adobe-CEP/CEP-Resources/wiki/CEP-5-Flash-Extension-Cookbook-for-CC-2014)

**APIs** (https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_5.x)
* Include these files in your extension project if you need to use the APIs.
  * AgoraLib.js
  * CSInterface.js
  * Vulcan.js
* Do NOT include this file in your extension project. It is already integrated into CEP.
  * CEPEngine_extensions.js
* Extension Manifest
  * ExtensionManifest_v_5_0.xsd
* PlugPlugExternalObject
  * [PlugPlugExternalObject for InDesign CC 2014](http://bit.ly/1qlnKOb)

**Samples**
* [Sample extensions](https://github.com/Adobe-CEP/Samples)

**Other Documents**
* [CEP for the InDesign Developer](http://adobe.ly/1xXkviH)
* [Extending Adobe CC 2014 apps using Node.js](http://bit.ly/1yAR0T9)
* [A short guide to HTML5 extensions](http://adobe.ly/Nk1EK7)
   (NOTE:  For CEP 4.0 but still mostly relevant)
* [Guide to signing extensions](http://adobe.ly/1oiS4FE)
   (NOTE:  For CEP 4.0 but valid for CEP 5)

----

For developing CEP 4.x and extensions for CS6/CC host applications

**Documentation**
* [Documentation for CEP 4.2](http://adobe.ly/1cWBggl)
* [Tutorial](http://bit.ly/1nNLqH4)
   (NOTE: A bit old)

**APIs** (https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_4.x)
* Include these files in your extension project if you need to use the APIs.
  * CSInterface.js
  * Vulcan.js
* Do NOT include this file in your extension project. It is already integrated into CEP.
  * CEPEngine_extensions.js
* Extension Manifest
  * ExtensionManifest_v_4_0.xsd

**Tooling**
* [Extension Builder 3 Preview](http://adobe.ly/1pho2QU)
* [Extension Builder 3 forums - get help from the developer community](http://adobe.ly/1mgZ2xe)
   (NOTE: EB3 is compatible with CEP 4.x only. You can [tweak it](http://adobe.ly/1v3wgiq) so that it supports CC 2014 (with limitations))

----

Miscellaneous help
* [Getting Started Guides](https://github.com/Adobe-CEP/Getting-Started-guides)
* [CS SDK Blog](https://blogs.adobe.com/cssdk/)
* [Andy Hall's Super Mega Guide (English)] (http://bit.ly/XQn9IV) [ (Japanese)] (http://bit.ly/XQnB9P)
* [Davide Barranca’s blog](http://www.davidebarranca.com/) and [HTML Panels Development Course](http://htmlpanelsbook.com/)
* [David Deraedt’s plugin for Adobe Brackets](http://bit.ly/QKWWYL)
* [Olav Martin Kvern's article on extensibility and InDesign](http://bit.ly/1zEa9Ef)
* [The other API (Article on Medium)](http://bit.ly/1hIFZay)
* [Adobe Exchange](http://bit.ly/1mHVksI)
* [Photoshop CC 2014 CEP samples by John Peterson](http://bit.ly/1nGAWYN)

----




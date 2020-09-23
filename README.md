Getting Started with Common Extensibility Platform (CEP)
==============

This page provides the resources you need to [get started](https://github.com/Adobe-CEP/Getting-Started-guides) in order to create extensions for Adobe Creative Cloud applications, using the new HTML5/JavaScript interface model. The Flash/ActionScript interface model for extensions is deprecated in Creative Cloud releases; Support has already been removed from CC2014 and later releases.

* CEP 10 is available for developing extensions and add-ons in latest vesions of Creative Cloud Applications. Refer to the [table](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_10.x/Documentation/CEP%2010.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep) for Creative Cloud products integration with CEP 10.

* Creative Cloud 2019 products include CEP 9 for developing extensions and add-ons. Refer to the [table](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep) for 2019 products integration with CEP 9.

* Creative Cloud 2018 products include CEP 8 for developing extensions and add-ons. Refer to the [table](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep) for 2018 product integration with CEP 8.


This SDK provides the low-level tools that you need to build extensions. Extensions that you build using these tools must be packaged as ZXP files in order to be seen and loaded by Extension Manager. You can offer extensions as free or paid products through our marketing portals (Adobe Exchange, the Add-ins website, the Creative Cloud desktop app). When you do this, you upload the extension to Adobe as a single ZXP file.

Resources you will need include:
* CEP JavaScript libraries for communicating with the operating system and Extension Manager and for communicating with the host application and other extensions.
* Sample code for how to use these libraries
* The ZXP packager, a command-line utility

---

For developing CEP 10.0 HTML/JavaScript extensions for CC 2021.x host applications

**Documentation**

  * **[HTML Extension Cookbook](./Documentation/README.md)**
  
  * **APIs**
    For CEP 10 and CEP 9 APIs:
      * Include these files in your extension project if you need to use the APIs.
          * CSInterface.js
          * Vulcan.js
      * Do NOT include this file in your extension project. It is already integrated into CEP.
          * CEPEngine_extensions.js

  * **[Sample extensions](https://github.com/Adobe-CEP/Samples)** 
    

  * **Packaging and Signing Tool (ZXPSignCMD)**
    * Tool: [ZXPSignCMD](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCMD)
    * Document: [Packaging and Signing Adobe Extensions](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/creativesuite/pdfs/SigningTechNote_CC.pdf) 

  * **Extension Installation Tools** 
    * Extension Manager Command Line Tool
      * [Announcement: Extension Manager End of Life](https://www.adobeexchange.com/resources/27)
      * [ExMan Command Line Tool](https://www.adobeexchange.com/resources/28)
      * [ExMan Command Line Tool's Error Codes](http://www.adobeexchange.com/resources/19#errors)
    * [A Python script to install & manage extensions](https://github.com/adobe-photoshop/generator-panels/blob/master/installPanels.py) (by John Peterson)
    * Other Tools
      * http://zxpinstaller.com/
      * http://install.anastasiy.com/

  * **Tooling** 
    * [Extension Builder 3 Preview](http://adobe.ly/1pho2QU)
    * [Extension Builder 3 forums - get help from the developer community](http://adobe.ly/1mgZ2xe)
   (NOTE: EB3 is compatible with CEP 4.x only. You can [tweak it](http://adobe.ly/1v3wgiq) so that it supports CC 2014 (with limitations))

  * **[Older CEP versions 4.x to 7.x](./README_ArchivedVersions.md)**


----


**Miscellaneous help**
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




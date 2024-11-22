<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CEP 9 Known Issues](#cep-9-known-issues)
    - [Following are the known issues in the latest version. Please keep these in mind while creating your own extension...](#following-are-the-known-issues-in-the-latest-version-please-keep-these-in-mind-while-creating-your-own-extension)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


CEP 9 Known Issues 
====================

### Following are the known issues in the latest version. Please keep these in mind while creating your own extension...

#Issue 1 :
  Extensions should not have 'in between spaces' in the Extension Id mentioned in the manifest.
  Eg.- <Extension Id= "com.adobe.abc.def" Version="x.y" /> is valid
       <Extension Id= "com_adobe_abc_def" Version="x.y" /> is valid
       <Extension Id= "comAdobeAbcDef" Version="x.y" /> is valid
       <Extension Id= "com adobe abc def" Version="x.y" /> is NOT valid

  


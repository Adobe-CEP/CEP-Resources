<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Known issues](#known-issues)
  - [32-bit application](#32-bit-application)
  - [Workaround for ExtendScript Toolkit Debugger Error #1116](#workaround-for-extendscript-toolkit-debugger-error-1116)
- [Another option](#another-option)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Use of Adobe ExtendScript Toolkit is governed by the Adobe Terms of Use and [Adobe Developer Additional Terms](http://www.adobe.com/go/developer-terms), and the license attached to this repo does not apply.

# Known issues

## 32-bit application
This is a 32-bit application. The installers here are provided in case you need them, but should only be used if you absolutely need them. Note that ExtendScript Toolkit will not run on macOS 10.15 Catalina or above.

## Workaround for ExtendScript Toolkit Debugger Error #1116
To run scripts with ExtendScript Toolkit, you'll need to [implement the workaround for ExtendScript Toolkit debugger error #1116](https://medium.com/adobetech/workaround-for-extendscript-toolkit-debugger-error-1116-f067f81f96c6).

# Another option

Since early 2019, Adobe has provided the [VSCode ExtendScript Debugger plugin](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug). This does not replace all the capabilities of ExtendScript Toolkit, so you’ll want to be sure that it will meet your needs before you upgrading to a 64-bit only OS.


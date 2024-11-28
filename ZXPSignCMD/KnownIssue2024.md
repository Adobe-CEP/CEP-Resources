# November 2024 Cross-platform ZXP Signing Compatibility Known Issue and Workaround

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [The Problem](#the-problem)
- [The Workaround](#the-workaround)
  - [Plugin Users](#plugin-users)
  - [Plugin Developers](#plugin-developers)
- [Why is this happening?](#why-is-this-happening)
- [FAQ](#faq)
  - [Q. Which versions of Creative Cloud apps are affected?](#q-which-versions-of-creative-cloud-apps-are-affected)
  - [Q. Does this happen with plugins installed via the Adobe Exchange Marketplace?](#q-does-this-happen-with-plugins-installed-via-the-adobe-exchange-marketplace)
  - [Q. Is a fix on the way?](#q-is-a-fix-on-the-way)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The Problem  
Some users are experiencing blank panels after a successful installation of a ZXP plugin. ZXP certificate signatures are appearing to be invalid, even after appearing to be signed successfully.

**Expected Behavior:** Historically ZXP files signed by ZXPSignCmd may be installed and used succesfully using ExManCmd, [UPIA](https://helpx.adobe.com/in/creative-cloud/help/working-from-the-command-line.html), or popular installers using these tools (e.g., [ZXPInstaller](https://aescripts.com/learn/zxp-installer/), [Anastasiy's Extension Manager](https://install.anastasiy.com/), and others).

## The Workaround
There are several known workarounds.

### Plugin Users
Plugin end users may use either of the following workarounds:

1. Run the host application (for example, Premiere Pro) in administrator mode. If you install the plugin with the host application in administrator mode, it might continue to work in user mode.

2. Plugin users may [set the Debug mode](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging#set-the-debug-mode)

**Windows:** Open regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.8, then add a new entry PlayerDebugMode of type “string” with the value of “1”. Regedit is located in (C:\Windows\regedit). You can access it using CMD, too.
![image](https://github.com/user-attachments/assets/25f9cde0-fc01-44dd-b49a-f3bf57820c48)


**On macOS:** In the Terminal, type: `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`
<img width="816" alt="Screenshot 2024-11-22 at 1 31 20 PM" src="https://github.com/user-attachments/assets/9b9d0e8b-784c-421d-99f0-772aec4d04eb">

Terminal is located in (Applications > Utilities > Terminal).

### Plugin Developers

As a plugin developer, you can replace all symlinks inside your folders with file paths. Note that some node modules use symlinks, so it's be sure to look for symlinks inside any `node_modules` folders and replace them as well.

**Other Steps:**
* For the time being, sign ZXPs on the platform they are expected to be run on. Sign ZXPs for use with macOS on a macOS machine, and ZXPs intended for Windows on Windows devices.
* Delete all  `.DS_Store` and `__MACOSX` folders/files inside your extension directory/subdirectories. (It's not clear if this related to the problem, but if you want to distribute on [Adobe's Marketplace](https://exchange.adobe.com/apps/browse/cc) you will need to do this step. (Read about [how to distribute here](https://developer.adobe.com/developer-distribution/creative-cloud/docs/guides/).)

## Why is this happening?

When CEP attempts to load a plugin in the host application, it relies on a library called `ZXPSignLib` to verify the plugin package's signature. If the plugin package is installed via [UPIA](https://helpx.adobe.com/in/creative-cloud/help/working-from-the-command-line.html) – or an installer that uses UPIA, such as "ZXPInstaller", the signature verification fails, preventing the plugin from loading.

During the installation of the plugin package via UPIA if the plugin contains any symbolic links (symlinks), these links are extracted as regular text files containing the path to the original file, instead of including the actual content of the original file.

As part of the signature verification process, ZXPSignLib replaces the symlinks in the extension directory with the actual files they point to. Since plugins are installed in system space, ZXPSignLib requires administrator privileges to perform this operation. When the host application is run in administrator mode, the symlinks are correctly replaced with the original files, resolving the issue. Once this happens, the signature verification succeeds, and the extension can be loaded successfully—even if the application is later launched by a non-administrative user.

When plugins were installed via ExManCmd, ZXPSignLib's signature verification process was also executed as part of installation process. ExManCmd ran with elevated permissions, which allowed ZXPSignLib to properly replicate the symlinks at the time of installation, preventing the issue from occurring at the time of loading the extension.

## FAQ

### Q. Which versions of Creative Cloud apps are affected?

A. We're not completely sure, but we have seen this more often with the 2025 versions of application, and with new or recently updated plugins. Please help us report this issue by letting us know [in the this forum thread](https://community.adobe.com/t5/exchange-bugs/cross-platform-zxp-signing-compatibility-known-issue-and-workaround-2024/idi-p/14961412).

### Q. Does this happen with plugins installed via the Adobe Exchange Marketplace?

A. This seems less common, but if you're facing this issue, please [help us report this issue by letting us know in the this forum thread](https://community.adobe.com/t5/exchange-bugs/cross-platform-zxp-signing-compatibility-known-issue-and-workaround-2024/idi-p/14961412).

### Q. Is a fix on the way?

A. The team that owns UPIA is working on a fix. Typically UPIA changes are rolled out with the Creative Cloud desktop app, which at the time of this writing is 6.4. The update may be available with 6.5, or sooner. Watch this document for updates or [follow the forum thread](https://community.adobe.com/t5/exchange-bugs/cross-platform-zxp-signing-compatibility-known-issue-and-workaround-2024/idi-p/14961412).


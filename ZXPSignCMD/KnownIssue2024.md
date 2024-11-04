# 2024 Cross-platform ZXP Signing Compatibility Known Issue and Workaround

**The problem:**  ZXP files signed on macOS are failing when installed and run on Windows machines, and vice versa. On Windows, this may mean that the installed panel appears blank, or only functions as expected with debug mode enabled.

**Expected Behavior:** Historically ZXP files signed by ZXPSignCmd may be installed and used succesfully on both macOS and Windows, regardless of which platform they were signed on.

## The Workaround
For the time being, the work around is to sign ZXPs on the platform they are expected to be run on. Sign ZXPs for use with macOS on a macOS machine, and ZXPs intended for Windows on Windows devices.

## FAQ

### Q. Which versions of Creative Cloud apps are affected?

A. We're not sure. It could be related to Creative Cloud desktop app 6.4. It may only be for 2025 versions of dektop apps. Please help us report this issue by letting us know [in the this forum thread](https://community.adobe.com/t5/exchange-bugs/cross-platform-zxp-signing-compatibility-known-issue-and-workaround-2024/idi-p/14961412).

### Q. Will I need to maintain two different listings on the Adobe Exchange Marketplace?

A. We're still investigation this.

### Q. I don't have two computers handy for signing two ZXPs, what are my options?

A. If you have a Mac, you can run a Windows virtual machine. If you have a Windows machine, there are cloud-based macOS virtual machine options available.

If you sign a ZXP on a virtual machine and find it still doesn't work, please let us know [in the this forum thread](https://community.adobe.com/t5/exchange-bugs/cross-platform-zxp-signing-compatibility-known-issue-and-workaround-2024/idi-p/14961412).

### Q. Is a fix on the way?

A. Due to other important maintence, it may be some time before we have a fix.


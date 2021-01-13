## ExManCmd

ExManCmd is a command line tool, usually used by our Enterprise customers, to install plugins and extensions. It replaced the deprecated Extension Manager CC.

### ExManCmd 7.11

ExManCmd 7.11 will be backward-compatible, and continue to work for the time being. However, it will no longer be updated going forward. That said, ExManCmd 7.11 relies on the Creative Cloud Desktop App. 

As we [announced earlier this year](https://medium.com/adobetech/cep-10-and-exmancmd-7-11-are-here-21d55625a230?source=friends_link&sk=e6c2193e4e3faf96d110c9d38c3d22da), because of a change in the location and name of the database file, ExManCmd 7.11 is not backwards compatible with ExManCmd 7.10. A one-time database migration should be triggered the first time you install Creative Cloud Desktop 5.3, or the first time you run ExManCmd 7.11. (There is no way to manually trigger this migration.)

- Download ExManCmd 7.11 for Windows: [http://www.adobe.com/go/ExManCmdWin](http://www.adobe.com/go/ExManCmdWin)
- Download ExManCmd 7.11 for macOS: [http://www.adobe.com/go/ExManCmdMac](http://www.adobe.com/go/ExManCmdMac)

### ExManCmd 7.10 for Users Who Do Not Install the Creative Cloud Desktop App
If you don’t use CCD in your installation environment, you may need to use ExManCmd 7.10 or earlier to install plugins or extensions. Third party installation tools like [Anastasiy's Extension Manager](https://install.anastasiy.com/) are also an option.

Please note that this only applies to plugins or extensions using the `.ZXP` file format. Newer, UXP-based plugins using the `.CCX` or (formerly) `.XDX` files may be installed using a double-click or via the Creative Cloud Desktop app. 

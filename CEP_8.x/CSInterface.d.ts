/**************************************************************************************************
 *
 * ADOBE SYSTEMS INCORPORATED
 * Copyright 2013 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 * terms of the Adobe license agreement accompanying it.  If you have received this file from a
 * source other than Adobe, then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 *
 **************************************************************************************************/
/** CSInterface - v7.0.0 */
/** EvalScript error message */
declare var EvalScript_ErrMessage: string;
/**
 * Stores gradient type constants
 *
 * @enum {number}
 */
declare enum GradientType
{
    Linear = "linear",
}
/**
 * Stores event scope constants
 *
 * @enum {number}
 */
declare enum EventScope
{
    GLOBAL = "GLOBAL",
    APPLICATION = "APPLICATION",
}
/**
 * Stores color-type constants.
 *
 * @enum {number}
 */
declare const enum ColorTypeNum
{
    rgb = 1,
    gradient = 2,
}
/**
 * Stores color-type constants.
 *
 * @enum {number}
 */
declare const enum ColorType
{
    /** RGB color type. */
    RGB = "rgb",
    /** Gradient color type. */
    GRADIENT = "gradient",
    /** Null color type. */
    NONE = "none",
}
/**
 * Stores constants for the window types supported by the CSXS infrastructure.
 *
 * @enum {number}
 */
declare const enum CSXSWindowType
{
    /** Constant for the CSXS window type Panel. */
    _PANEL = "Panel",
    /** Constant for the CSXS window type Modeless. */
    _MODELESS = "Modeless",
    /** Constant for the CSXS window type ModalDialog. */
    _MODAL_DIALOG = "ModalDialog",
}
/**
 * Stores operating-system-specific location constants for use in the \c #CSInterface.getSystemPath() method.
 *
 * @enum {number}
 */
declare const enum SystemPath
{
    /** The path to user data.  */
    USER_DATA = "userData",
    /** The path to common files for Adobe applications.  */
    COMMON_FILES = "commonFiles",
    /** The path to the user's default document folder.  */
    MY_DOCUMENTS = "myDocuments",
    /** @deprecated. Use \c #SystemPath.Extension.  */
    APPLICATION = "application",
    /** The path to current extension.  */
    EXTENSION = "extension",
    /** The path to hosting application's executable.  */
    HOST_APPLICATION = "hostApplication",
}
/**
 * Defines a version number with major, minor, micro, and special
 * value can be any string.
 *
 * @class Version
 */
declare class Version
{
    major: number;
    minor: number;
    micro: number;
    special: number;
    /**
     * The maximum value allowed for a numeric version component.
     * This reflects the maximum value allowed in PlugPlug and the manifest schema.
     *
     * @static
     * @type {number}
     * @memberof Version
     */
    static readonly MAX_NUM: number;
    /**
     * Defines a version number with major, minor, micro, and special
     * value can be any string.
     * @param {number} major The major version component, a positive integer up to nine digits long.
     * @param {number} minor The minor version component, a positive integer up to nine digits long.
     * @param {number} micro The micro version component, a positive integer up to nine digits long.
     * @param {number} special The special version component, an arbitrary string.
     * @memberof Version
     */
    constructor ( major: number, minor: number, micro: number, special: number );
}
/**
 * Defines a boundary for a version range, which associates a \c Version object with a flag for whether it is an inclusive or exclusive boundary.
 *
 * @class VersionBound
 */
declare class VersionBound
{
    version: Version;
    inclusive: boolean;
    /**
     * Defines a boundary for a version range, which associates a \c Version object with a flag for whether it is an inclusive or exclusive boundary.
     * @param {Version} version The \c #Version object.
     * @param {boolean} inclusive True if this boundary is inclusive, false if it is exclusive.
     * @memberof VersionBound
     */
    constructor ( version: Version, inclusive: boolean );
}
/**
 * Defines a range of versions using a lower boundary and optional upper boundary.
 *
 * @class VersionRange
 */
declare class VersionRange
{
    lowerBound: VersionBound;
    upperBound: VersionBound;
    /**
     * Defines a range of versions using a lower boundary and optional upper boundary.
     * @param {VersionBound} lowerBound The \c #VersionBound object.
     * @param {VersionBound} upperBound The \c #VersionBound object, or null for a range with no upper boundary.
     * @memberof VersionRange
     */
    constructor ( lowerBound: VersionBound, upperBound: VersionBound );
}
/**
 * Represents a runtime related to the CEP infrastructure. Extensions can declare dependencies on particular CEP runtime versions in the extension manifest.
 *
 * @class Runtime
 */
declare class Runtime
{
    name: any;
    versionRange: VersionRange;
    /**
     * Creates an instance of Runtime.
     * @param {*} name The runtime name.
     * @param {VersionRange} versionRange A \c #VersionRange object that defines a range of valid versions.
     * @memberof Runtime
     */
    constructor ( name: any, versionRange: VersionRange );
}
/**
 * Encapsulates a CEP-based extension to an Adobe application.
 *
 * @class Extension
 */
declare class Extension
{
    id: any;
    name: string;
    mainPath: string;
    basePath: string;
    windowType: CSXSWindowType;
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    defaultExtensionDataXml: string;
    specialExtensionDataXml: string;
    requiredRuntimeList: Runtime[];
    isAutoVisible: boolean;
    isPluginExtension: boolean;
    /**
     * Encapsulates a CEP-based extension to an Adobe application.
     * @param {*} id The unique identifier of this extension.
     * @param {string} name The localizable display name of this extension.
     * @param {string} mainPath The path of the "index.html" file.
     * @param {string} basePath The base path of this extension.
     * @param {CSXSWindowType} windowType The window type of the main window of this extension. Valid values are defined by \c #CSXSWindowType.
     * @param {number} width The default width in pixels of the main window of this extension.
     * @param {number} height The default height in pixels of the main window of this extension.
     * @param {number} minWidth The minimum width in pixels of the main window of this extension.
     * @param {number} minHeight The minimum height in pixels of the main window of this extension.
     * @param {number} maxWidth The maximum width in pixels of the main window of this extension.
     * @param {number} maxHeight The maximum height in pixels of the main window of this extension.
     * @param {string} defaultExtensionDataXml The extension data contained in the default \c ExtensionDispatchInfo section of the extension manifest.
     * @param {string} specialExtensionDataXml The extension data contained in the application-specific \c ExtensionDispatchInfo section of the extension manifest.
     * @param {Runtime[]} requiredRuntimeList An array of \c Runtime objects for runtimes required by this extension.
     * @param {boolean} isAutoVisible True if this extension is visible on loading.
     * @param {boolean} isPluginExtension True if this extension has been deployed in the Plugins folder of the host application.
     * @memberof Extension
     */
    constructor ( id: any, name: string, mainPath: string, basePath: string, windowType: CSXSWindowType, width: number, height: number, minWidth: number, minHeight: number, maxWidth: number, maxHeight: number, defaultExtensionDataXml: string, specialExtensionDataXml: string, requiredRuntimeList: Runtime[], isAutoVisible: boolean, isPluginExtension: boolean );
}
/**
 * A standard JavaScript event, the base class for CEP events.
 *
 * @class CSEvent
 */
declare class CSEvent
{
    type: string;
    scope: EventScope;
    appId: string;
    extensionId: string;
    /** Event-specific data. */
    data: any;
    /**
     * A standard JavaScript event, the base class for CEP events.
     * @param {string} type The name of the event type.
     * @param {EventScope} scope The scope of event, can be "GLOBAL" or "APPLICATION".
     * @param {string} appId The unique identifier of the application that generated the event.
     * @param {string} extensionId The unique identifier of the extension that generated the event.
     * @memberof CSEvent
     */
    constructor ( type: string, scope: EventScope, appId: string, extensionId: string );
}
/**
 * Stores an RGB color with red, green, blue, and alpha values.
 * All values are in the range [0.0 to 255.0]. Invalid numeric values are
 * converted to numbers within this range.
 *
 * @class RGBColor
 */
declare class RGBColor
{
    red: number;
    green: number;
    blue: number;
    alpha: number;
    /**
     * Creates an instance of RGBColor.
     * @param red {number} The red value, in the range [0.0 to 255.0].
     * @param green {number} The green value, in the range [0.0 to 255.0].
     * @param blue {number} The blue value, in the range [0.0 to 255.0].
     * @param alpha {number} The alpha (transparency) value, in the range [0.0 to 255.0]. The default, 255.0, means that the color is fully opaque.
     * @memberof RGBColor
     */
    constructor ( red: number, green: number, blue: number, alpha: number );
}
/**
 * A point value  in which the y component is 0 and the x component
 * is positive or negative for a right or left direction,
 * or the x component is 0 and the y component is positive or negative for
 * an up or down direction.
 *
 * @class Direction
 */
declare class Direction
{
    x: number;
    y: number;
    /**
     * A point value  in which the y component is 0 and the x component
     * is positive or negative for a right or left direction,
     * or the x component is 0 and the y component is positive or negative for
     * an up or down direction.
     * @param {number} x The horizontal component of the point.
     * @param {number} y The vertical component of the point.
     * @memberof Direction
     */
    constructor ( x: number, y: number );
}
/**
 * Stores gradient stop information.
 *
 * @class GradientStop
 */
declare class GradientStop
{
    offset: number;
    rgbColor: RGBColor;
    /**
     * Stores gradient stop information.
     * @param {number} offset The offset of the gradient stop, in the range [0.0 to 1.0].
     * @param {RGBColor} rgbColor The color of the gradient at this point, an \c #RGBColor object.
     * @memberof GradientStop
     */
    constructor ( offset: number, rgbColor: RGBColor );
}
/**
 * Stores gradient color information.
 *
 * @class GradientColor
 */
declare class GradientColor
{
    type: GradientType;
    direction: Direction;
    numStops: number;
    arrGradientStop: GradientStop[];
    /**
     * Stores gradient color information.
     * @param {GradientType} type The gradient type, must be "linear".
     * @param {Direction} direction A \c #Direction object for the direction of the gradient (up, down, right, or left).
     * @param {number} numStops The number of stops in the gradient.
     * @param {GradientStop[]} arrGradientStop An array of \c #GradientStop objects.
     * @return A new \c GradientColor object.
     * @memberof GradientColor
     */
    constructor ( type: GradientType, direction: Direction, numStops: number, arrGradientStop: GradientStop[] );
}
/**
 * Stores color information, including the type, anti-alias level, and specific color values in a color object of an appropriate type.
 * @class UIColor
 */
declare class UIColor
{
    type: ColorTypeNum;
    antialiasLevel: any;
    color: RGBColor | GradientColor;
    /**
     * Stores color information, including the type, anti-alias level, and specific color values in a color object of an appropriate type.
     * @param {ColorTypeNum} type The color type, 1 for "rgb" and 2 for "gradient". The supplied color object must correspond to this type.
     * @param {*} antialiasLevel The anti-alias level constant.
     * @param {(RGBColor | GradientColor)} color A \c #RGBColor or \c #GradientColor object containing specific color information.
     * @return A new \c UIColor object.
     * @memberof UIColor
     */
    constructor ( type: ColorTypeNum, antialiasLevel: any, color: RGBColor | GradientColor );
}
/**
 * Stores window-skin properties, such as color and font. All color parameter values are \c #UIColor objects except that systemHighlightColor is \c #RGBColor object.
 *
 * @class AppSkinInfo
 */
declare class AppSkinInfo
{
    baseFontFamily: string;
    baseFontSize: number;
    appBarBackgroundColor: UIColor;
    panelBackgroundColor: UIColor;
    appBarBackgroundColorSRGB: UIColor;
    panelBackgroundColorSRGB: UIColor;
    systemHighlightColor: RGBColor;
    /**
     * Stores window-skin properties, such as color and font. All color parameter values are \c #UIColor objects except that systemHighlightColor is \c #RGBColor object.
     * @param {string} baseFontFamily The base font family of the application.
     * @param {number} baseFontSize The base font size of the application.
     * @param {UIColor} appBarBackgroundColor The application bar background color.
     * @param {UIColor} panelBackgroundColor The background color of the extension panel.
     * @param {UIColor} appBarBackgroundColorSRGB The application bar background color, as sRGB.
     * @param {UIColor} panelBackgroundColorSRGB The background color of the extension panel, as sRGB.
     * @param {RGBColor} systemHighlightColor The operating-system highlight color, as sRGB.
     * @return AppSkinInfo object.
     * @memberof AppSkinInfo
     */
    constructor ( baseFontFamily: string, baseFontSize: number, appBarBackgroundColor: UIColor, panelBackgroundColor: UIColor, appBarBackgroundColorSRGB: UIColor, panelBackgroundColorSRGB: UIColor, systemHighlightColor: RGBColor );
}
/**
 * Stores information about the environment in which the extension is loaded.
 *
 * @class HostEnvironment
 */
declare class HostEnvironment
{
    appName: string;
    appVersion: any;
    appLocale: any;
    appUILocale: any;
    appId: string;
    isAppOnline: boolean;
    appSkinInfo: AppSkinInfo;
    /**
     * Stores information about the environment in which the extension is loaded.
     * @param {string} appName The application's name.
     * @param {*} appVersion The application's version.
     * @param {*} appLocale The application's current license locale.
     * @param {*} appUILocale The application's current UI locale.
     * @param {string} appId The application's unique identifier.
     * @param {boolean} isAppOnline True if the application is currently online.
     * @param {AppSkinInfo} appSkinInfo An \c #AppSkinInfo object containing the application's default color and font styles.
     * @return A new \c HostEnvironment object.
     * @memberof HostEnvironment
     */
    constructor ( appName: string, appVersion: any, appLocale: any, appUILocale: any, appId: string, isAppOnline: boolean, appSkinInfo: AppSkinInfo );
}
/**
 * Stores information about the host capabilities.
 *
 * @class HostCapabilities
 */
declare class HostCapabilities
{
    EXTENDED_PANEL_MENU: boolean;
    EXTENDED_PANEL_ICONS: boolean;
    DELEGATE_APE_ENGINE: boolean;
    SUPPORT_HTML_EXTENSIONS: boolean;
    DISABLE_FLASH_EXTENSIONS: boolean;
    /**
     * Stores information about the host capabilities.
     * @param {boolean} EXTENDED_PANEL_MENU True if the application supports panel menu.
     * @param {boolean} EXTENDED_PANEL_ICONS True if the application supports panel icon.
     * @param {boolean} DELEGATE_APE_ENGINE True if the application supports delegated APE engine.
     * @param {boolean} SUPPORT_HTML_EXTENSIONS True if the application supports HTML extensions.
     * @param {boolean} DISABLE_FLASH_EXTENSIONS True if the application disables FLASH extensions.
     * @return A new \c HostCapabilities object.
     * @memberof HostCapabilities
     */
    constructor ( EXTENDED_PANEL_MENU: boolean, EXTENDED_PANEL_ICONS: boolean, DELEGATE_APE_ENGINE: boolean, SUPPORT_HTML_EXTENSIONS: boolean, DISABLE_FLASH_EXTENSIONS: boolean );
}
/**
 * Stores current api version.
 *
 * Since 4.2.0
 *
 * @class ApiVersion
 */
declare class ApiVersion
{
    major: number;
    minor: number;
    micro: number;
    /**
     * Stores current api version.
     *
     * Since 4.2.0
     * @param {number} major The major version.
     * @param {number} minor The minor version.
     * @param {number} micro The micro version.
     * @return ApiVersion object.
     * @memberof ApiVersion
     */
    constructor ( major: number, minor: number, micro: number );
}
/**
 * Stores flyout menu item status
 *
 * Since 5.2.0
 *
 * @class MenuItemStatus
 */
declare class MenuItemStatus
{
    menuItemLabel: string;
    enabled: boolean;
    checked: boolean;
    /**
     * Stores flyout menu item status
     *
     * Since 5.2.0
     *
     * @param {string} menuItemLabel The menu item label.
     * @param {boolean} enabled True if user wants to enable the menu item.
     * @param {boolean} checked True if user wants to check the menu item.
     * @return MenuItemStatus object.
     * @memberof MenuItemStatus
     */
    constructor ( menuItemLabel: string, enabled: boolean, checked: boolean );
}
/**
 * Stores the status of the context menu item.
 *
 * @class ContextMenuItemStatus
 */
declare class ContextMenuItemStatus
{
    menuItemID: string;
    enabled: boolean;
    checked: boolean;
    /**
     *
     * Stores the status of the context menu item.
     *
     * Since 5.2.0
     *
     * @param  {string}  menuItemID The menu item id.
     * @param  {boolean}  enabled True if user wants to enable the menu item.
     * @param  {boolean}  checked True if user wants to check the menu item.
     * @return MenuItemStatus object.
     */
    constructor ( menuItemID: string, enabled: boolean, checked: boolean );
}
/**
 * This is the entry point to the CEP extensibility infrastructure.
 * Instantiate this object and use it to:
 * - Access information about the host application in which an extension is running
 * - Launch an extension
 * - Register interest in event notifications, and dispatch events
 *
 * @class CSInterface
 */
declare class CSInterface
{
    /**
     * User can add this event listener to handle native application theme color changes.
     * Callback function gives extensions ability to fine-tune their theme color after the
     * global theme color has been changed.
     * The callback function should be like below:
     *
     * @example
     * // event is a CSEvent object, but user can ignore it.
     * ```
     * function OnAppThemeColorChanged(event)
     * {
     *    // Should get a latest HostEnvironment object from application.
     *    var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
     *    // Gets the style information such as color info from the skinInfo,
     *    // and redraw all UI controls of your extension according to the style info.
     * }
     * ```
     */
    static readonly THEME_COLOR_CHANGED_EVENT: string;
    /** The host environment data object. */
    hostEnvironment: HostEnvironment;
    /**
     * Retrieves information about the host environment in which the extension is currently running.
     *
     * @returns {HostEnvironment} A \c #HostEnvironment object.
     * @memberof CSInterface
     */
    getHostEnvironment (): HostEnvironment;
    /**
     * Closes this extension.
     *
     * @memberof CSInterface
     */
    closeExtension (): void;
    /**
     * Retrieves a path for which a constant is defined in the system.
     *
     * @param {SystemPath} pathType The path-type constant defined in \c #SystemPath
     * @returns {string} The platform-specific system path string.
     * @memberof CSInterface
     */
    getSystemPath ( pathType: SystemPath ): string;
    /**
     * Evaluates a JavaScript script, which can use the JavaScript DOM
     * of the host application.
     *
     * @param {string} script The JavaScript script.
     * @param {( result: any ) => any} [callback] Optional. A callback function that receives the result of execution. If execution fails, the callback function receives the error message \c EvalScript_ErrMessage.
     * @memberof CSInterface
     */
    evalScript ( script: string, callback?: ( result: any ) => any ): void;
    /**
     * Retrieves the unique identifier of the application.
     * in which the extension is currently running.
     *
     * @returns {string} The unique ID string.
     * @memberof CSInterface
     */
    getApplicationID (): string;
    /**
     * Retrieves host capability information for the application
     * in which the extension is currently running.
     *
     * @returns {HostCapabilities} A \c #HostCapabilities object.
     * @memberof CSInterface
     */
    getHostCapabilities (): HostCapabilities;
    /**
     * Triggers a CEP event programmatically. Yoy can use it to dispatch
     * an event of a predefined type, or of a type you have defined.
     *
     * @param {CSEvent} event A \c CSEvent object.
     * @memberof CSInterface
     */
    dispatchEvent ( event: CSEvent ): void;
    /**
     * Registers an interest in a CEP event of a particular type, and
     * assigns an event handler.
     * The event infrastructure notifies your extension when events of this type occur,
     * passing the event object to the registered handler function.
     *
     * @param {string} type The name of the event type of interest.
     * @param {( ...args: any[] ) => any} listener The JavaScript handler function or method.
     * @param {*} [obj] Optional, the object containing the handler method, if any. Default is null.
     * @memberof CSInterface
     */
    addEventListener ( type: string, listener: ( ...args: any[] ) => any, obj?: any ): void;
    /**
     * Removes a registered event listener.
     *
     * @param {string} type The name of the event type of interest.
     * @param {( ...args: any[] ) => any} listener The JavaScript handler function or method that was registered.
     * @param {*} [obj]  Optional, the object containing the handler method, if any.Default is null.
     * @memberof CSInterface
     */
    removeEventListener ( type: string, listener: ( ...args: any[] ) => any, obj?: any ): void;
    /**
     * Loads and launches another extension, or activates the extension if it is already loaded.
     *
     * @param {string} extensionId The extension's unique identifier.
     * @param {string} [params=""]  Not currently used, pass "".
     *
     * @example
     * To launch the extension "help" with ID "HLP" from this extension, call:
     * ```requestOpenExtension("HLP", ""); ```
     * @memberof CSInterface
     */
    requestOpenExtension ( extensionId: string, params?: string ): void;
    /**
     * Retrieves the list of extensions currently loaded in the current host application.
     * The extension list is initialized once, and remains the same during the lifetime
     * of the CEP session.
     *
     * @param {string[]} [extensionIds] Optional, an array of unique identifiers for extensions of interest.
     *          If omitted, retrieves data for all extensions.
     * @returns {Extension[]} Zero or more \c #Extension objects.
     * @memberof CSInterface
     */
    getExtensions ( extensionIds?: string[] ): Extension[];
    /**
     * Retrieves network-related preferences.
     *
     * @returns {*} A JavaScript object containing network preferences.
     * @memberof CSInterface
     */
    getNetworkPreferences (): any;
    /**
     * Initializes the resource bundle for this extension with property values
     * for the current application and locale.
     * To support multiple locales, you must define a property file for each locale,
     * containing keyed display-string values for that locale.
     * See localization documentation for Extension Builder and related products.
     *
     * Keys can be in the
     * form ```key.value="localized string"```, for use in HTML text elements.
     * For example, in this input element, the localized \c key.value string is displayed
     * instead of the empty \c value string:
     *
     * ```<input type="submit" value="" data-locale="key"/>```
     *
     * @returns {*} An object containing the resource bundle information.
     * @memberof CSInterface
     */
    initResourceBundle (): any;
    /**
     * Writes installation information to a file.
     *
     * @returns {string}  The file path.
     * @memberof CSInterface
     */
    dumpInstallationInfo (): string;
    /**
     * Retrieves version information for the current Operating System,
     * See http://www.useragentstring.com/pages/Chrome/ for Chrome \c navigator.userAgent values.
     *
     * @returns {string} A string containing the OS version, or "unknown Operation System".
     * If user customizes the User Agent by setting CEF command parameter "--user-agent", only
     * "Mac OS X" or "Windows" will be returned.
     * @memberof CSInterface
     */
    getOSInformation (): string;
    /**
     * Opens a page in the default system browser.
     *
     * Since 4.2.0
     *
     * @param {string} url  The URL of the page/file to open, or the email address.
     * Must use HTTP/HTTPS/file/mailto protocol. For example:
     *   - "http://www.adobe.com"
     *   - "https://github.com"
     *   - "file:///C:/log.txt"
     *   - "mailto:test@adobe.com"
     *
     * @returns {*} One of these error codes:
     * - NO_ERROR - 0
     * - ERR_UNKNOWN - 1
     * - ERR_INVALID_PARAMS - 2
     * - ERR_INVALID_URL - 201
     * @memberof CSInterface
     */
    openURLInDefaultBrowser ( url: string ): any;
    /**
     * Retrieves extension ID.
     *
     * Since 4.2.0
     *
     * @returns {string} extension ID.
     * @memberof CSInterface
     */
    getExtensionID (): string;
    /**
     * Retrieves the scale factor of screen.
     * On Windows platform, the value of scale factor might be different from operating system's scale factor,
     * since host application may use its self-defined scale factor.
     *
     * Since 4.2.0
     *
     * @returns {number}  One of the following float number.
     * -  -1.0 when error occurs
     * -  1.0 means normal screen
     * -  >1.0 means HiDPI screen
     * @memberof CSInterface
     */
    getScaleFactor (): number;
    /**
     * Set a handler to detect any changes of scale factor. This only works on Mac.
     *
     * Since 4.2.0
     *
     * @param {( ...args: any[] ) => any} handler The function to be called when scale factor is changed.
     * @memberof CSInterface
     */
    setScaleFactorChangedHandler ( handler: ( ...args: any[] ) => any ): void;
    /**
     * Retrieves current API version.
     *
     * Since 4.2.0
     *
     * @returns {ApiVersion}  ApiVersion object.
     * @memberof CSInterface
     */
    getCurrentApiVersion (): ApiVersion;
    /**
     * Set panel flyout menu by an XML.
     *
     * Since 5.2.0
     *
     * Register a callback function for "com.adobe.csxs.events.flyoutMenuClicked" to get notified when a
     * menu item is clicked.
     * The "data" attribute of event is an object which contains "menuId" and "menuName" attributes.
     *
     * Register callback functions for "com.adobe.csxs.events.flyoutMenuOpened" and "com.adobe.csxs.events.flyoutMenuClosed"
     * respectively to get notified when flyout menu is opened or closed.
     *
     * @param {string} menu A XML string which describes menu structure.
     * An example menu XML:
     * <Menu>
     *   <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checked="false"/>
     *   <MenuItem Label="TestExample2">
     *     <MenuItem Label="TestExample2-1" >
     *       <MenuItem Label="TestExample2-1-1" Enabled="false" Checked="true"/>
     *     </MenuItem>
     *     <MenuItem Label="TestExample2-2" Enabled="true" Checked="true"/>
     *   </MenuItem>
     *   <MenuItem Label="---" />
     *   <MenuItem Label="TestExample3" Enabled="false" Checked="false"/>
     * </Menu>
     * @returns {void}
     * @memberof CSInterface
     */
    setPanelFlyoutMenu ( menu: string ): void;
    /**
     * Updates a menu item in the extension window's flyout menu, by setting the enabled
     * and selection status.
     *
     * Since 5.2.0
     *
     * @param {string} menuItemLabel	The menu item label.
     * @param {boolean} enabled		True to enable the item, false to disable it (gray it out).
     * @param {boolean} checked		True to select the item, false to deselect it.
     *
     * @returns {boolean}  false when the host application does not support this functionality (HostCapabilities.EXTENDED_PANEL_MENU is false).
     *         Fails silently if menu label is invalid.
     *
     * @see HostCapabilities.EXTENDED_PANEL_MENU
     * @memberof CSInterface
     */
    updatePanelMenuItem ( menuItemLabel: string, enabled: boolean, checked: boolean ): boolean;
    /**
     * Set context menu by XML string.
     *
     * Since 5.2.0
     *
     * There are a number of conventions used to communicate what type of menu item to create and how it should be handled.
     * - an item without menu ID or menu name is disabled and is not shown.
     * - if the item name is "---" (three hyphens) then it is treated as a separator. The menu ID in this case will always be NULL.
     * - Checkable attribute takes precedence over Checked attribute.
     * - a PNG icon. For optimal display results please supply a 16 x 16px icon as larger dimensions will increase the size of the menu item.
         The Chrome extension contextMenus API was taken as a reference.
         https://developer.chrome.com/extensions/contextMenus
     * - the items with icons and checkable items cannot coexist on the same menu level. The former take precedences over the latter.
     *
     * @param {string} menu A XML string which describes menu structure.
     * @param {( clickedMenuItemId: any ) => any} callback The callback function which is called when a menu item is clicked. The only parameter is the returned ID of clicked menu item.
     *
     * @description An example menu XML:
     * <Menu>
     *   <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checkable="true" Checked="false" Icon="./image/small_16X16.png"/>
     *   <MenuItem Id="menuItemId2" Label="TestExample2">
     *     <MenuItem Id="menuItemId2-1" Label="TestExample2-1" >
     *       <MenuItem Id="menuItemId2-1-1" Label="TestExample2-1-1" Enabled="false" Checkable="true" Checked="true"/>
     *     </MenuItem>
     *     <MenuItem Id="menuItemId2-2" Label="TestExample2-2" Enabled="true" Checkable="true" Checked="true"/>
     *   </MenuItem>
     *   <MenuItem Label="---" />
     *   <MenuItem Id="menuItemId3" Label="TestExample3" Enabled="false" Checkable="true" Checked="false"/>
     * </Menu>
     * @returns {void}
     * @memberof CSInterface
     */
    setContextMenu ( menu: string, callback: ( clickedMenuItemId: any ) => any ): void;
    /**
     * Set context menu by JSON string.
     *
     * Since 6.0.0
     *
     * There are a number of conventions used to communicate what type of menu item to create and how it should be handled.
     * - an item without menu ID or menu name is disabled and is not shown.
     * - if the item label is "---" (three hyphens) then it is treated as a separator. The menu ID in this case will always be NULL.
     * - Checkable attribute takes precedence over Checked attribute.
     * - a PNG icon. For optimal display results please supply a 16 x 16px icon as larger dimensions will increase the size of the menu item.
         The Chrome extension contextMenus API was taken as a reference.
     * - the items with icons and checkable items cannot coexist on the same menu level. The former take precedences over the latter.
         https://developer.chrome.com/extensions/contextMenus
     *
     * @param {string} menu A JSON string which describes menu structure.
     * @param {( clickedMenuItemId: any ) => any} callback The callback function which is called when a menu item is clicked. The only parameter is the returned ID of clicked menu item.
     *
     * @description An example menu JSON:
     *
     * {
     *      "menu": [
     *          {
     *              "id": "menuItemId1",
     *              "label": "testExample1",
     *              "enabled": true,
     *              "checkable": true,
     *              "checked": false,
     *              "icon": "./image/small_16X16.png"
     *          },
     *          {
     *              "id": "menuItemId2",
     *              "label": "testExample2",
     *              "menu": [
     *                  {
     *                      "id": "menuItemId2-1",
     *                      "label": "testExample2-1",
     *                      "menu": [
     *                          {
     *                              "id": "menuItemId2-1-1",
     *                              "label": "testExample2-1-1",
     *                              "enabled": false,
     *                              "checkable": true,
     *                              "checked": true
     *                          }
     *                      ]
     *                  },
     *                  {
     *                      "id": "menuItemId2-2",
     *                      "label": "testExample2-2",
     *                      "enabled": true,
     *                      "checkable": true,
     *                      "checked": true
     *                  }
     *              ]
     *          },
     *          {
     *              "label": "---"
     *          },
     *          {
     *              "id": "menuItemId3",
     *              "label": "testExample3",
     *              "enabled": false,
     *              "checkable": true,
     *              "checked": false
     *          }
     *      ]
     *  }
     * @returns {void}
     * @memberof CSInterface
     */
    setContextMenuByJSON ( menu: string, callback: ( clickedMenuItemId: any ) => any ): void;
    /**
     * Updates a context menu item by setting the enabled and selection status.
     *
     * Since 5.2.0
     *
     * @param {string} menuItemID The menu item ID.
     * @param {boolean} enabled True to enable the item, false to disable it (gray it out).
     * @param {boolean} checked True to select the item, false to deselect it.
     * @memberof CSInterface
     */
    updateContextMenuItem ( menuItemID: string, enabled: boolean, checked: boolean ): void;
    /**
     * Get the visibility status of an extension window.
     *
     * Since 6.0.0
     *
     * @returns {boolean}  true if the extension window is visible; false if the extension window is hidden.
     * @memberof CSInterface
     */
    isWindowVisible (): boolean;
    /**
     * Resize extension's content to the specified dimensions.
     * 1. Works with modal and modeless extensions in all Adobe products.
     * 2. Extension's manifest min/max size constraints apply and take precedence.
     * 3. For panel extensions
     *    3.1 This works in all Adobe products except:
     *        * Premiere Pro
     *        * Prelude
     *        * After Effects
     *    3.2 When the panel is in certain states (especially when being docked),
     *        it will not change to the desired dimensions even when the
     *        specified size satisfies min/max constraints.
     *
     * Since 6.0.0
     *
     * @param {number} width The new width
     * @param {number} height The new height
     * @memberof CSInterface
     */
    resizeContent ( width: number, height: number ): void;
    /**
     * Register the invalid certificate callback for an extension.
     * This callback will be triggered when the extension tries to access the web site that contains the invalid certificate on the main frame.
     * But if the extension does not call this function and tries to access the web site containing the invalid certificate, a default error page will be shown.
     *
     * Since 6.1.0
     *
     * @param {( ...args: any[] ) => any} callback the callback function
     * @returns
     * @memberof CSInterface
     */
    registerInvalidCertificateCallback ( callback: ( ...args: any[] ) => any ): any;
    /**
     * Register an interest in some key events to prevent them from being sent to the host application.
     *
     * This function works with modeless extensions and panel extensions.
     * Generally all the key events will be sent to the host application for these two extensions if the current focused element
     * is not text input or dropdown,
     * If you want to intercept some key events and want them to be handled in the extension, please call this function
     * in advance to prevent them being sent to the host application.
     *
     * Since 6.1.0
     *
     * @param {string} keyEventsInterest A JSON string describing those key events you are interested in. A null object or
                                     an empty string will lead to removing the interest
     *
     * This JSON string should be an array, each object has following keys:
     *
     * keyCode:  [Required] represents an OS system dependent virtual key code identifying
     *           the unmodified value of the pressed key.
     * ctrlKey:  [optional] a Boolean that indicates if the control key was pressed (true) or not (false) when the event occurred.
     * altKey:   [optional] a Boolean that indicates if the alt key was pressed (true) or not (false) when the event occurred.
     * shiftKey: [optional] a Boolean that indicates if the shift key was pressed (true) or not (false) when the event occurred.
     * metaKey:  [optional] (Mac Only) a Boolean that indicates if the Meta key was pressed (true) or not (false) when the event occurred.
     *                      On Macintosh keyboards, this is the command key. To detect Windows key on Windows, please use keyCode instead.
     * An example JSON string:
     *
     * [
     *     {
     *         "keyCode": 48
     *     },
     *     {
     *         "keyCode": 123,
     *         "ctrlKey": true
     *     },
     *     {
     *         "keyCode": 123,
     *         "ctrlKey": true,
     *         "metaKey": true
     *     }
     * ]
     *
     * @returns {void}
     * @memberof CSInterface
     */
    registerKeyEventsInterest ( keyEventsInterest: string ): void;
    /**
     * Set the title of the extension window.
     * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
     *
     * Since 6.1.0
     *
     * @param {string} title The window title.
     * @memberof CSInterface
     */
    setWindowTitle ( title: string ): void;
    /**
     * Get the title of the extension window.
     * This function works with modal and modeless extensions in all Adobe products, and panel extensions in Photoshop, InDesign, InCopy, Illustrator, Flash Pro and Dreamweaver.
     *
     * Since 6.1.0
     *
     * @returns {string} The window title.
     * @memberof CSInterface
     */
    getWindowTitle (): string;
}

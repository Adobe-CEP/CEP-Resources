## Appendix 1: UXP vs. CEP vs. ExtendScript

|**Platform** |**UXP** |  **CEP** | **ExtendScript**
|:----|:----|:----|:--- 
|Developer Tooling | UDT | Chrome Debugging; ZXP packaging and signing | ESTK (Deprecated, not supported on macOS anymore); VSCode ExtendScript Debugger
| Bundle Format | .ccx: a renamed zip folder containing manifest + code | .zxp: a custom archive format containing manifest + code + signed certificate | None but supports ZXP format
| **Security**
| Signing | No (hash is checked for integrity) | Yes (easily disabled) and allows self-signed certificates | No
| Binary representation | No | Yes | Yes (JSXBIN)
| Sandboxed | <ul><li>Access to most files requires user consent</li><li>Access to launch processes requires user consent</li></ul> | <ul><li>Arbitrary access to disk & machine resources </li><li>Arbitrary ability to launch processes (including bash scripts) </li><li>Arbitrary access to Vulcan messaging stream</li></ul> | <ul><li>Arbitrary access to disk & machine resources </li><li>Arbitrary ability to launch processes (including bash scripts) </li></ul>
| Privacy-first (consent) | Yes | No | No
| Persistent File Permissions | Yes | not needed (full access) | not needed (full access)
| Secure Storage | Yes | No | No
| Access to Vulcan | No | Yes | No
| Access to BridgeTalk | No | Yes | Yes
| Loads Native Code as External Modules | Yes (6.0+) | No | Yes
| Can be loaded from a remote location | No | Yes (not recommended) | No
| **Standards**
| JavaScript environment | v8 | Chromium, Node | ES3 (1999+) with custom Adobe additions
| XML Literal Support | No | No | Yes
| XMP Support  | Planned for 2023 | No | Yes
| HTML Support | Subset | Full | N/A
| CSS Support | Subset | Full | N/A
| SVG Support | Subset | Full | N/A
| HTML5 Canvas Support | Planned for 2022 | Full | N/A
| WebView Support  | Yes (6.0+) | Yes (iFrame) | No
| WebGL Support | Yes, via WebView | Yes (natively) | No
| WebRTC Support | Yes, via WebView | Yes | No
| HTML5 DOM Support | Subset | Full | N/A
| Localization Support | Yes | Yes, via ZString | Yes, via ZString
| **User Interface**
| Rendering Framework | UXP + Host App APIs | CEF | ScriptUI
| Panel Support | Yes | Yes | No
| Flyout Menu Support | Yes | Yes | No
| Modal Dialog Support | Yes | Yes | Yes
| Modeless Dialog Support | No | Yes | No
| Invisible Plugin Support | Known as commands | Yes | Yes
| Basic UI Dialog APIs (alert, confirm, prompt) | No; but PS has an `alert()` method | Yes | Yes
| Built-in UI Components | Native: Spectrum UXP | Browser | Native
| Render UI outside of plugin | Yes (dropdowns, popovers) | No | Yes
| Supports React | Partial support | Yes | No
| Supports Spectrum Web Components | In progress | Yes | No
| Custom Font Support | Installed fonts only | Web fonts | Installed fonts only
| Table Layout Module | Yes | Yes | No
| Flexbox Layout Module | Yes | Yes | Similar stacking model
| Grid Layout Module | No | Yes | No
| UI Definition Language | Subset of HTML, CSS, JS | HTML, CSS, JS | ScriptUI (JS)
| Drag & Drop | Planned for 2022 | Yes | No
| Theme Aware | Yes | Yes | Yes
| Multiple commands/panels in one plugin context | Yes | No, each command or panel is a separate "plugin" context, so message passing has to be used to keep things in sync | No
| **Performance**
| Startup Speed| Very quick | Slow (1s+) | Very quick
| Memory Impact | Medium | High (full browser per plugin) | Small
|Host App Size Impact| Medium | Large (CEF, Node)| Small
| **User Experience**
| Discovery Mechanism | Plugin Marketplace in CCD | Exchange | No, but can be shared via Marketplace
| Requires app restart on install | No | Yes | Yes to show up in the menu
| Register keyboard shortcuts | No for PS; Yes for XD | Yes | No
| **Other**
| Socket Client | Yes, via WebSockets | Yes, via WebSockets and Node | Yes
| Socket Server | No | Yes, via Node | Yes
| C++ Communication | Yes | Yes | Yes
| Plugin Communication within Host App | Yes | Yes (Vulcan, BridgeTalk) | yes (BridgeTalk)
| Preprocessor | No (unless dev uses webpack) | No (unless dev uses webpack) | Yes
| Scripting Support | In progress | No | Yes
| Cross Platform | Yes | Yes | Yes 




 
 



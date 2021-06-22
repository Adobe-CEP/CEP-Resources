CEP 11 Known Issues & FAQ
====================

### Following are the known issues in CEP 10.0 and above. Please keep these in mind while creating your own extension...

## Issue 1 : evalScript callback is not triggered in cross-site iFrames

From CEP-11 one can't access a `<iframe>` with a different origin (Cross-Site) using JavaScript. For the same-origin policy browsers block scripts trying to access a frame with a different origin.

Origin is considered Cross-Site if at least one of the following parts of the address isn't maintained:
`protocol://hostname:port/...`
Protocol, hostname, and port must be the same as your domain if you want to access a frame.

**Workaround**
Even though same-origin policy blocks scripts from accessing the content of sites with a different origin, if you own both the pages, you can work around this problem using window.postMessage and its relative message event to send messages between the two pages, like this:

In your Cross-Site `<iframe>` (contained in the main page):

`mainFrameWindow.postMessage(/*any variable or object or evalscript*/, 'http://your-main-site.com');`

The second argument to postMessage() can be '*' to indicate no preference about the origin of the destination. A target origin should always be provided when possible, to avoid disclosing the data you send to any other site.

In your main page:

```
window.addEventListener('message', event => {
    // IMPORTANT: check the origin of the data! 
    if (event.origin.startsWith('http://your-cross-site-iframe.com')) { 
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        console.log(event.data); 
        // We can also invoke evalScript sent from Cross-site frame [CEP]
        var script=event.data;
        CSInterface.evalScript(script);
    } 
    else {
        // The data was NOT sent from your site! 
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return; 
    } 
}); 
```

This method can be applied in both directions, creating a listener in the cross-site child frame too, and receiving responses from the Mainframe. The same logic can also be implemented for running CEP EvalScript from cross-site child frames- Pass your EvalScript as an event from Cross-Site child frame to Main Page and invoke EvalScript from Main Page/Frame
  
  


## Issues existing in CEP 9 and above  

### Issue 2 : Drag events not fired while debugging an extension. 
    
    Workaround: Deactivate the screencast by selecting the "Toggle device Toolbar" in the chrome inspect window. 
    Once done, Drag operation can be performed even while debugging the extension. 
  ![Toggle device Toolbar](./images/issues/dragDebug.png)
    
### Issue 3: 
In Windows, the API cep.fs.stat() is not able to access file of size greater than 4GB 


---

## FAQ 

*  **Refer the migration Guidelines for [CEP 10 to CEP 11](./CEP%2011.1%20HTML%20Extension%20Cookbook.md#migration-from-cep-10-to-cep-11)**

*  **If similar error is seen in debug console, confirm\verfiy the following**

    ![require not function](./images/issues/requireNotFunction.png)

    * Confirm CEPEngine_extensions.js is NOT integrated in your extension

    * Node could be crashing. Please update node_modules with CEP 11 supported [node version](./CEP%2011.1%20HTML%20Extension%20Cookbook.md#chromium-embedded-framework-cef). 

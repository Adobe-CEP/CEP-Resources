const entrypoints = require("uxp").entrypoints; 

entrypoints.setup({ 
    panels: { 
        "panel1": { 
            create(rootNode) {   
                return new Promise(function (resolve, reject) { 
                    // create panel content or setup, parameters have been changed 
                }); 
            }, 
            show(rootNode, data) { 
                return new Promise(function (resolve, reject) { 
                    // show the panel, parameters have been changed 
                }); 
            }, 
            hide(rootNode, data) { 
                return new Promise(function (resolve, reject) { 
                    // Hide panel, parameters have been changed 
                }); 
            }, 
            destroy(rootNode) { 
                return new Promise(function (resolve, reject) { 
                    // clear the panel content, parameters have been changed 
                }); 
            }, 
            invokeMenu(id) { 
                if (id === "signIn") { 
                    return new Promise(function (resolve, reject) { 
                        // command action 
                    }); 
                } 
            }, 
            menuItems: [ 
                { 
                    id: "signIn", 
                    label: "Sign In...", 
                    enabled: false, 
                    checked: true 
                }, 
                "getElementCount", 
                "-", 
                "Sign out" 
            ] 
        } 
    } 
}); 
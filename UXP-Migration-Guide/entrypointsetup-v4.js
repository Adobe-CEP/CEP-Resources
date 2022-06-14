const entrypoints = require("uxp").entrypoints; 

entrypoints.setup({ 
    panels: { 
        "panel1": { 
            create(event) { 
                // create panel content 
            }, 
            show(event) { 
                // show panel content 
            }, 
            hide(event) { 
                // hide panel content 
            }, 
            destroy(event) { 
                // clear panel content 

            }, 
            invokeMenu(id) { 
                if (id === "signIn") { 
                    // perform menu action 
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
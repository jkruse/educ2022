# EDUC2022 example custom component

This repository contains an example presented at EDUC2022, showing how to create a custom component using [dataflex-custom-component](https://github.com/jkruse/dataflex-custom-component).

## Branches

The `main` branch contains the completed example component, which is everything added to a copy of the WebOrderMobile workspace.

In addition (and not included in the repository, because it would overwrite files if you use the repo to retrace the steps of the presentation), two files from the original workspace were changed in the demo:

`AppHTML/Index.html` - three lines added:

    <script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3/minified.js"></script>
    <script src="Custom/index.js"></script>
    <link rel="stylesheet" href="Custom/index.css">

`AppSrc/WebApp.src` - one menu item added:

    Object oChangePassword_itm is a cWebMenuItem
        Set psCaption to "Change password"
        
        WebRegisterPath ntNavigateBegin oChangePassword
        
        Procedure OnClick
            Send NavigatePath
        End_Procedure
    End_Object

and the dialog included:

    Use ChangePassword.wo

The repository also includes branches `initial`, `step1`, `step2`, ..., `step9`.

These contain the state of the workspace at each step of the presentation.
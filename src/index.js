/*global df, global */

import './index.css';

class WebNewPasswordForm extends df.WebForm {
    constructor(sName, oParent) {
        super(sName, oParent);

        // Define web properties and events here
    }

    afterRender() {
        super.afterRender();

        // Insert component bootstrap code here
        console.log('Yes, this is the custom component!');
    }

}

export default global.WebNewPasswordForm = WebNewPasswordForm;
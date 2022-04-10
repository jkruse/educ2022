/*global df, global */

import './index.css';
import { PasswordStrength, commonPasswords, trigraphs } from 'tai-password-strength';

class WebNewPasswordForm extends df.WebForm {
    constructor(sName, oParent) {
        super(sName, oParent);

        // Define web properties and events here
    }

    afterRender() {
        super.afterRender();

        // Insert component bootstrap code here
        const meter = document.createElement('div');
        meter.className = 'meter';
        this._eInner.appendChild(meter);

        const tester = new PasswordStrength();
        tester.addCommonPasswords(commonPasswords);
        tester.addTrigraphMap(trigraphs);

        this.OnInput.on(
            () => {
                const { trigraphEntropyBits } = tester.check(this.get('psValue'));
                meter.style.width = `${Math.tanh(trigraphEntropyBits / 100) * 100}%`;
                meter.style.backgroundColor = 'blue';
            }
        );
    }

}

export default global.WebNewPasswordForm = WebNewPasswordForm;
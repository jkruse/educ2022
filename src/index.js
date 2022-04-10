/*global df, global */

import './index.css';
import { PasswordStrength, commonPasswords, trigraphs } from 'tai-password-strength';
import chroma from 'chroma-js';

const strengths = ['VERY_WEAK', 'WEAK', 'REASONABLE', 'STRONG', 'VERY_STRONG'];
const colors = chroma.scale(['#ff4047', '#00ff6e']).mode('lab').colors(5);

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
                const { trigraphEntropyBits, strengthCode } = tester.check(this.get('psValue'));
                const strengthIndex = strengths.indexOf(strengthCode);
                meter.style.width = `${Math.tanh(trigraphEntropyBits / 100) * 100}%`;
                meter.style.backgroundColor = colors[strengthIndex];
            }
        );
    }

}

export default global.WebNewPasswordForm = WebNewPasswordForm;
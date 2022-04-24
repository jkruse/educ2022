/*global df, global */

import './index.css';
import chroma from 'chroma-js';

const strengths = ['VERY_WEAK', 'WEAK', 'REASONABLE', 'STRONG', 'VERY_STRONG'];
const colors = chroma.scale(['#ff4047', '#00ff6e']).mode('lab').colors(5);

class WebNewPasswordForm extends df.WebForm {
    constructor(sName, oParent) {
        super(sName, oParent);

        // Define web properties and events here
        this.event('OnInputStrength');
        this.event('OnInputDetails', df.cCallModeDefault, 'OnInputDetailsProxy');
    }

    async afterRender() {
        super.afterRender();

        // Insert component bootstrap code here
        const meter = document.createElement('div');
        meter.className = 'meter';
        this._eInner.appendChild(meter);

        const { PasswordStrength, commonPasswords, trigraphs } = await import('tai-password-strength');
        const tester = new PasswordStrength();
        tester.addCommonPasswords(commonPasswords);
        tester.addTrigraphMap(trigraphs);

        this.OnInput.on(
            () => {
                const result = tester.check(this.get('psValue'));
                const strengthIndex = strengths.indexOf(result.strengthCode);
                this.fire('OnInputStrength', [strengthIndex]);
                this.fireEx({ sEvent: 'OnInputDetails', tActionData: result });
                meter.style.width = `${Math.tanh(result.trigraphEntropyBits / 100) * 100}%`;
                meter.style.backgroundColor = colors[strengthIndex];
            }
        );
    }

}

export default global.WebNewPasswordForm = WebNewPasswordForm;
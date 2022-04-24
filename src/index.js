/*global df, global */

import './index.css';
import chroma from 'chroma-js';

const strengths = ['VERY_WEAK', 'WEAK', 'REASONABLE', 'STRONG', 'VERY_STRONG'];

class WebNewPasswordForm extends df.WebForm {
    #colors;

    constructor(sName, oParent) {
        super(sName, oParent);

        // Define web properties and events here
        this.event('OnInputStrength');
        this.event('OnInputDetails', df.cCallModeDefault, 'OnInputDetailsProxy');
        this.prop(df.tString, 'psMeterColorFrom', '');
        this.prop(df.tString, 'psMeterColorTo', '');
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

        this.#colors = chroma.scale([this.psMeterColorFrom, this.psMeterColorTo]).mode('lab').colors(5);

        this.OnInput.on(
            () => {
                const result = tester.check(this.get('psValue'));
                const strengthIndex = strengths.indexOf(result.strengthCode);
                this.fire('OnInputStrength', [strengthIndex]);
                this.fireEx({ sEvent: 'OnInputDetails', tActionData: result });
                meter.style.width = `${Math.tanh(result.trigraphEntropyBits / 100) * 100}%`;
                meter.style.backgroundColor = this.#colors[strengthIndex];
            }
        );
    }

    set_psMeterColorFrom(sVal) {
        this.#colors = chroma.scale([sVal, this.psMeterColorTo]).mode('lab').colors(5);
    }

    set_psMeterColorTo(sVal) {
        this.#colors = chroma.scale([this.psMeterColorFrom, sVal]).mode('lab').colors(5);
    }

}

export default global.WebNewPasswordForm = WebNewPasswordForm;
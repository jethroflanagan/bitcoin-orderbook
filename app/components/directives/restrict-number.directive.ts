import { Directive, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

// Use without type="number" to properly restrict numbers, caret position updates on change one tick later
@Directive({
    selector: '[restrictNumber]',
    providers: [NgModel],
    host: {
        '(input)': 'onInputChange($event)'
        // '(ngModelChanged)': 'onInputChange($event)' // doesn't pass event, only value
    }
})
export class RestrictNumberDirective {
    constructor (private model:NgModel) {
    }

    // TODO fix bug where changed value moves caret
    onInputChange (event) {
        const current = event.target.value.toString();
        let valid = current.replace(/[^0-9\.]/g, '');

        // only allow first instance of dot
        const [integer, ...fractional] = valid.split('.');
        valid = integer + (fractional.length ? '.' : '') + fractional.join('');

        if (valid !== current) {
            // event.preventDefault();
            this.model.valueAccessor.writeValue(valid);
            this.model.viewToModelUpdate(valid);

            // update caret position based on first instance of change
            const firstDiffIndex = this.getFirstDiff(current, valid);
            // required to only update on first tick after this, but affecting dom so setTimeout is fine
            setTimeout(() => {
                // in case something removed the element before next tick
                if (event.target) {
                    event.target.setSelectionRange(firstDiffIndex, firstDiffIndex);
                }
            }, 0);
        }
    }

    getFirstDiff (a, b) {
        for (var i = 0; i < a.length && i < b.length; i++) {
            if (a[i] !== b[i]) {
                return i;
            }
        }
        return a.length;
    }
}

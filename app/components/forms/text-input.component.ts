import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// This isn't a proper implementation of TextInput, just good enough for preview

@Component({
    selector: 'text-input',
    template: `
        <div class="TextInput"
            [ngClass]="{
                'TextInput--focus': isAbove
            }">
            <input class="TextInput-field"
                [(ngModel)]="value"
                [type]="type">
            <span class="TextInput-bar"></span>
            <span class="TextInput-highlight"></span>
            <label class="TextInput-label">{{label}}</label>
        </div>
    `,
    // provides accessor to the parent form as though it is a normal input
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextInputComponent),
        multi: true
    }],
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() label:string;
    // @Input() name:string;
    @Input() type:string;

    @Input('value') _value:string = '';
    get value():any {
        return this._value;
    }
    set value(val:any) {
        if (val !== this._value) {
            this._value = val;
            this.isAbove = (val.length > 0);
            this.onChange(val);
        }
    }

    isAbove:boolean = true;

    constructor () {
        console.log('this', this.value);
    }

    get isAboveClass () {
        if (this.isAbove) {
            return 'TextInput--focus';
        }
        return '';
    }

    // -----------------------------------
    // ControlValueAccessor implementation

    writeValue(val:any) {
        this._value = val;
        this.onChange(val);
    }

    onChange = (_) => {};

    onTouched = () => {};
    onInvalid = () => {};

    registerOnChange(fn:(_:any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn:() => void) {
        this.onTouched = fn;
    }
}

import {Pipe, PipeTransform } from '@angular/core';

// right pad with zeros
@Pipe({name: 'amount'})
export class AmountPipe implements PipeTransform {
    transform (amount:number, precision:number = 8):string {
        if (isNaN(amount)) {
            amount = 0.0;
        }
        const parts = amount.toFixed(precision).split(".");
        const integer = parts[0];
        let fractional = parts[1] || '';
        let padded = '';

        // kill excess zeros
        fractional = fractional.substr(0, precision).replace(/0+$/, '');
        while (fractional.length + padded.length < precision) {
            padded += '0';
        }
        return `
            <span class="Amount">
                <span class="Amount-integer">${integer}</span>.
                <span class="Amount-fractional">${fractional}</span>
                <span class="Amount-padded">${padded}</span>
            </span>
        `;
    }
}

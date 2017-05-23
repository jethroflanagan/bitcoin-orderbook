import {Pipe, PipeTransform } from '@angular/core';

// Angular's currency pipe isn't supported everywhere, this is cheaper than a whole intl polyfill
@Pipe({name: 'money'})
export class MoneyPipe implements PipeTransform {
    transform (amount:number, includeDecimals:boolean = false): string {
        const parts = amount.toFixed(2).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if (!includeDecimals) {
            return parts[0];
        }

        return parts[0] + '.' + parts[1];
    }
}

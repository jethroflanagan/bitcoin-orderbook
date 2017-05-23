import { Component, Input } from '@angular/core';
import { Order } from '../../types';

@Component({
    selector: 'order-item',
    template: `
    <div class="OrderItem"
        [ngClass]="classStates"
    >
        <span class="OrderItem-price">{{order.price | money}}</span>
        <span class="OrderItem-amount" [innerHTML]="order.amount | amount"></span>
    </div>
    `,
})
export class OrderItemComponent {
    @Input() order:Order;
    @Input('isSelected')
    set isSelected (val:boolean) {
        this.classStates['OrderItem--selected'] = val;
    }

    classStates = {};

    constructor () {
    }
}

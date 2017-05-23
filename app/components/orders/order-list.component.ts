import { Component, Input, EventEmitter } from '@angular/core';
import { Order } from '../../types';

@Component({
    selector: 'order-list',
    template: `
    <div [class]="'OrderList OrderList--' + name.toLowerCase()">
        <header class="OrderList-header">
            <h3 class="OrderList-headerTitle">Price ({{currencyCode}})</h3>
            <h3 class="OrderList-headerTitle">Amount</h3>
        </header>
        <div class="OrderList-list">
            <order-item *ngFor="let order of orders; trackBy:trackByOrder"
                [order]="order"
                (click)="onSelect($event, order)"
                [isSelected]="postOrder && postOrder.id === order.id"
            ></order-item>
            <post-order *ngIf="isPostOrderShowing"
                [type]="type"
                [amount]="postOrder.amount"
                [price]="postOrder.price"
                [close]="closeEventEmitter"
            ></post-order>
        </div>
    </div>`,
})
export class OrderListComponent {
    @Input() orders:Order[] = [];
    @Input() name:string;
    @Input() type:string;
    @Input() currencyCode:string;

    // HACK as @Output isn't working as expected
    closeEventEmitter:EventEmitter<any> = new EventEmitter();

    postOrder?:Order;
    isPostOrderShowing:boolean = false;
    constructor () {
        // HACK as @Output isn't working as expected
        this.closeEventEmitter.subscribe(() => this.onCancelPostOrder());
    }

    onSelect (event, { price, amount, id }:Order) {
        console.log('selected', event.target);
        this.postOrder = {
            amount,
            price,
            id,
        };
        this.isPostOrderShowing = true;
    }

    trackByOrder (order):string {
        return order.id;
    }

    onCancelPostOrder () {
        console.log('cancel', this);
        this.isPostOrderShowing = false;
    }
}

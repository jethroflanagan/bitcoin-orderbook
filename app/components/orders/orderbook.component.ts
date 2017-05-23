import { Component } from '@angular/core';
import { OrderbookService } from '../../services/orderbook.service';
import { Orderbook } from '../../types';

@Component({
    selector: 'order-book',
    template: `
    <div class="Orderbook">
        <h1 class="Orderbook-title">Orderbook</h1>
        <div *ngIf="isLoading" class="Orderbook-loading">
            Loading
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
        <div *ngIf="!isLoading">
            <h1 class="Orderbook-header">
                <h2 class="OrderList-title OrderList-title--bids Orderbook-tab Orderbook-tab--bids"
                    [ngClass]="{
                        'Orderbook-tab--inactive': !isActiveTab('bids')
                    }"
                    (click)="setActiveTab('bids')">
                    Bids
                </h2>
                <h2 class="OrderList-title OrderList-title--asks Orderbook-tab Orderbook-tab--asks"
                    [ngClass]="{
                        'Orderbook-tab--inactive': !isActiveTab('asks')
                    }"
                    (click)="setActiveTab('asks')">
                    Asks
                </h2>
            </h1>
            <div class="Orderbook-tabContent"
                [ngClass]="{
                    'Orderbook-tabContent--inactive': !isActiveTab('bids')
                }">
                <order-list
                    [orders]="orders.bids"
                    name="Bids"
                    type="bid"
                    [currencyCode]="currencyCode"
                    (click)="setActiveTab('bids')"
                ></order-list>
            </div>
            <div class="Orderbook-tabContent"
                [ngClass]="{
                    'Orderbook-tabContent--inactive': !isActiveTab('asks')
                }">
                <order-list
                    [orders]="orders.asks"
                    name="Asks"
                    type="ask"
                    (click)="setActiveTab('asks')"
                    [currencyCode]="currencyCode"
                ></order-list>
            </div>
        </div>
    </div>`,
})
export class OrderbookComponent {
    orders:Orderbook = {
        timestamp: 0,
        bids: [],
        asks: [],
    };
    currencyCode:string;
    isLoading:boolean = true;
    activeTab:string = 'bids';
    isInit:boolean = false;
    constructor (private orderbookService:OrderbookService) {
        this.currencyCode = orderbookService.baseCurrencyCode;
        orderbookService.subscriptions.onUpdated.subscribe((result) => this.onOrderbookUpdated(result));
        orderbookService.getOrders();
        this.setActiveTab('bids');
    }

    onOrderbookUpdated ({ bids, asks, timestamp }) {
        // Bit of a HACK to ensure it's actually the stuff loaded from server
        this.isLoading = (timestamp === 0);
        this.orders.bids = bids;
        this.orders.asks = asks;
    }

    // Also used on the order lists themselves to ensure the modal is visible
    // if browser resized smaller
    setActiveTab (id:string) {
        this.activeTab = id;
    }

    isActiveTab (id:string) {
        return (this.activeTab === id);
    }
}

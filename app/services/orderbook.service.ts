import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscriber } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import { Orderbook, Order, PostLimitOrder } from '../types';

export interface OrderbookSubscriptions {
    onUpdated:BehaviorSubject<any>;
}

@Injectable()
export class OrderbookService {
    // apiUrl:string = 'https://staging.mybitx.com/api/1/';
    apiUrl:string = 'http://localhost:8080/';

    // uses subscribers in case other components or state management need to use the same response
    subscriptions:OrderbookSubscriptions;
    _orders:Orderbook = {
        timestamp: 0,
        bids: [],
        asks: [],
    };

    constructor (private http:Http) {
        this.subscriptions = {
            onUpdated: new BehaviorSubject<any>(this._orders),
        };
    }

    // would actually come from the service, this is cached
    get baseCurrencyCode ():string {
        return 'ZAR';
    }
    get btcCurrencyCode ():string {
        return 'BTC';
    }
    get btcTradeCurrencyCode ():string {
        return 'XBT';
    }

    get feesPercent ():number {
        return 0.1;
    }

    getUrl (partial:string):string {
        return this.apiUrl + partial;
    }

    // TODO update with service
    getOrders ():void {
        this.getDummyOrders();
        // this.http.get(this.getUrl('orderbook?pair=XBTZAR'))
        //     .map((res:Response) => res.json())
        //     .subscribe(
        //         (response) => {
        //             const orders:Orderbook = {
        //                 timestamp: response.timestamp,
        //                 bids: _.map(response.bids, this.parseOrder).sort(this.sortOrders),
        //                 asks: _.map(response.asks, this.parseOrder).sort(this.sortOrders),
        //             };
        //             this.subscriptions.onUpdated.next(orders);
        //             this._orders = orders;
        //         },
        //         err => console.error(err),
        //     );

    }

    getDummyOrders ():void {
        const response = {"timestamp":new Date().getTime(),
            "asks":[{"price":"8497.00","volume":"7.153359"},{"price":"8500.00","volume":"5.00"},{"price":"8505.00","volume":"0.06883"},{"price":"8515.00","volume":"0.070279"},{"price":"8546.00","volume":"0.000462"},{"price":"8550.00","volume":"0.001"},{"price":"8582.00","volume":"0.02398"},{"price":"8600.00","volume":"9.989"},{"price":"8620.00","volume":"0.0484"},{"price":"8648.00","volume":"0.010421"},{"price":"8674.00","volume":"0.0917"},{"price":"8679.00","volume":"0.027266"},{"price":"8698.00","volume":"0.059531"},{"price":"8728.00","volume":"0.042119"},{"price":"8773.00","volume":"0.097185"},{"price":"8793.00","volume":"0.080059"},{"price":"8793.00","volume":"0.034511"},{"price":"8801.00","volume":"0.042222"},{"price":"8815.00","volume":"0.06284"},{"price":"8853.00","volume":"0.027604"},{"price":"8900.00","volume":"0.075883"},{"price":"8902.00","volume":"0.026438"},{"price":"8910.00","volume":"0.077152"},{"price":"8922.00","volume":"0.078069"},{"price":"8946.00","volume":"0.023517"},{"price":"8948.00","volume":"0.035889"},{"price":"8958.00","volume":"0.010794"},{"price":"8965.00","volume":"0.023992"},{"price":"8968.00","volume":"0.021523"},{"price":"9000.00","volume":"1.00"},{"price":"9056.00","volume":"0.084972"},{"price":"9076.00","volume":"0.079612"},{"price":"9086.00","volume":"0.000938"},{"price":"9089.00","volume":"0.06682"},{"price":"9109.00","volume":"0.072054"},{"price":"9278.00","volume":"0.026583"},{"price":"9281.00","volume":"0.099482"},{"price":"9304.00","volume":"0.084742"},{"price":"9329.00","volume":"0.091386"},{"price":"9384.00","volume":"0.02496"},{"price":"9390.00","volume":"0.011801"},{"price":"9408.00","volume":"0.058194"},{"price":"9431.00","volume":"0.077586"},{"price":"9442.00","volume":"0.014001"},{"price":"9445.00","volume":"0.014152"},{"price":"9454.00","volume":"0.090845"},{"price":"9541.00","volume":"0.064193"},{"price":"9589.00","volume":"0.007036"},{"price":"10000.00","volume":"0.001"},{"price":"12000.00","volume":"0.01"},{"price":"12356.00","volume":"0.01"}],
            "bids":[{"price":"8347.00","volume":"0.035301"},{"price":"8312.00","volume":"0.043765"},{"price":"8260.00","volume":"0.054326"},{"price":"8258.00","volume":"0.014517"},{"price":"8253.00","volume":"0.006633"},{"price":"8250.00","volume":"0.10"},{"price":"8226.00","volume":"0.013959"},{"price":"8222.00","volume":"0.069105"},{"price":"8207.00","volume":"0.097801"},{"price":"8201.00","volume":"0.071437"},{"price":"8191.00","volume":"0.091916"},{"price":"8181.00","volume":"0.037581"},{"price":"8177.00","volume":"0.096283"},{"price":"8172.00","volume":"0.058602"},{"price":"8131.00","volume":"0.032765"},{"price":"8118.00","volume":"0.014717"},{"price":"8112.00","volume":"0.001"},{"price":"8111.00","volume":"0.001"},{"price":"8107.00","volume":"0.044624"},{"price":"8106.00","volume":"0.067183"},{"price":"8079.00","volume":"0.080796"},{"price":"8066.00","volume":"0.064042"},{"price":"8000.00","volume":"0.02"},{"price":"8000.00","volume":"0.001"},{"price":"8000.00","volume":"0.02"},{"price":"7985.00","volume":"0.057684"},{"price":"7923.00","volume":"0.051031"},{"price":"7911.00","volume":"0.053096"},{"price":"7889.00","volume":"0.024861"},{"price":"7887.00","volume":"0.081884"},{"price":"7822.00","volume":"0.097658"},{"price":"7810.00","volume":"0.015657"},{"price":"7810.00","volume":"0.090268"},{"price":"7809.00","volume":"0.001942"},{"price":"7805.00","volume":"0.019597"},{"price":"7750.00","volume":"0.05341"},{"price":"7718.00","volume":"0.070741"},{"price":"7699.00","volume":"0.002919"},{"price":"7653.00","volume":"0.089102"},{"price":"7647.00","volume":"0.026986"},{"price":"7598.00","volume":"0.090991"},{"price":"6000.00","volume":"0.0006"},{"price":"6000.00","volume":"0.01"},{"price":"5100.00","volume":"0.10"},{"price":"5001.00","volume":"0.10"},{"price":"5000.00","volume":"0.10"},{"price":"1233.00","volume":"0.01"},{"price":"1000.00","volume":"0.10"},{"price":"1000.00","volume":"0.01"},{"price":"1000.00","volume":"0.10"},{"price":"1000.00","volume":"0.10"},{"price":"1000.00","volume":"5.00"},{"price":"1000.00","volume":"0.10"},{"price":"500.00","volume":"5.50"},{"price":"122.00","volume":"0.008"},{"price":"100.00","volume":"2.00"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"3.00"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.001"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.10"},{"price":"100.00","volume":"0.10"},{"price":"10.00","volume":"1.00"},{"price":"10.00","volume":"1.00"}]
        };
        const orders:Orderbook = {
            timestamp: response.timestamp,
            bids: _.map(response.bids, this.parseOrder).sort(this.sortOrders),
            asks: _.map(response.asks, this.parseOrder).sort(this.sortOrders),
        };
        this._orders = orders;

        setTimeout( () => {
            this.subscriptions.onUpdated.next(orders);
        }, 1000);
    }

    sortOrders (a:Order, b:Order):number {
        return b.price - a.price;
    }

    parseOrder (order, i):Order {
        return {
            price: parseFloat(order.price),
            amount: parseFloat(order.volume),
            id: i.toString(),
        };
    }

    postLimitOrder (order:PostLimitOrder) {
        const { price, amount, isBid, currencyPair } = order;
        const data = {
            price,
            volume: amount,
            type: isBid? 'BID' : 'ASK',
            pair: currencyPair,
        };
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(this.getUrl('postorder'), JSON.stringify(data), options)
            .map((res:Response) => {
                try {
                    return res.json();
                }
                // Try handle API errors when they aren't JSON encoded, e.g:
                // "Invalid volume: Loss of precision: cannot parse more than six decimal places."
                catch (e) {
                    return {"error": (res as any)._body};
                }
            });
    }
}

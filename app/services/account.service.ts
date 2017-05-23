import { Injectable } from '@angular/core';
// import { BehaviorSubject, Subscriber } from 'rxjs/Rx';
// import { HttpModule, JsonpModule } from '@angular/http';
// import * as _ from 'lodash';

type Currency = {
    currencyCode:string;
    value:number;
};

@Injectable()
export class AccountService {
    constructor () {
        // this.subscriptions = {
        //     onUpdated: new BehaviorSubject<any>(this._orders),
        // };
    }

    // quickly added here as this isn't a full solution
    get availableFunds ():Currency {
        return {
            currencyCode: 'ZAR',
            value: 2000,
        };
    }

    get availableBtc ():Currency {
        return {
            currencyCode: 'BTC',
            value: 0.8,
        };
    }

    //
    // updateAccount () {
    //     this.updateDummy();
    // }
    //
    // updateDummy () {
    //     const response = {
    //         "timestamp":new Date().getTime(),
    //         "funds": 2000,
    //         "btc": 0.8,
    //     };
    //     this._orders = orders;
    //
    //     setTimeout( () => {
    //         this.subscriptions.onUpdated.next(orders);
    //     }, 1000);
    // }
}

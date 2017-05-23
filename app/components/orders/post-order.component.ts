import { Component, Input, EventEmitter, NgZone } from '@angular/core';
import { OrderbookService } from '../../services/orderbook.service';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Currency, PostLimitOrder } from '../../types';

const MODE_BUY:string = 'Buy';
const MODE_SELL:string = 'Sell';

interface Validation {
    notEnoughFunds:boolean;
}

@Component({
    selector: 'post-order',
    templateUrl: 'app/templates/post-order.html'
})
export class PostOrderComponent {
    @Input() amount:number = 0;

    @Input() price:number = 0;

    mode:string;
    @Input('type')
    set type (val:string) {
        this.mode = (val === 'bid'
            ? MODE_BUY
            : MODE_SELL);

        if (this.mode === MODE_BUY) {
            this.balance = this.accountService.availableFunds;
        }
        else {
            this.balance = this.accountService.availableBtc;
        }
    };

    // @Output and EventEmitter approach isn't functioning correctly, fallback to @Input version
    @Input() close:EventEmitter<any>;

    validation:Validation = {
        notEnoughFunds: false,
    };

    total:Currency;
    fees:Currency;
    balance:Currency;
    form:FormGroup;
    feesPercent:number;

    // for server comms
    isLoading:boolean = false;
    isComplete:boolean = false;
    errors:string = '';

    constructor (
        private orderbookService:OrderbookService,
        private accountService:AccountService,
        private formBuilder:FormBuilder,
        private zone:NgZone
    ) {
        const currencyCode = orderbookService.baseCurrencyCode;
        this.total = {
            value: 0,
            currencyCode
        };
        this.fees = {
            value: 0,
            currencyCode: orderbookService.btcCurrencyCode,
        };
        this.balance = accountService.availableFunds;
        this.feesPercent = orderbookService.feesPercent;

        this.form = this.formBuilder.group({
            price: [0, Validators.required ],
            amount: [0, Validators.required ],
        });
    }

    validator = Validators.required;

    onAmountChanged (val) {
        this.amount = val;
        this.updateTotal();
    }

    onPriceChanged (val) {
        this.price = val;
        this.updateTotal();
    }

    updateTotal () {
        this.total.value = this.price * this.amount;
        this.fees.value = this.amount * this.feesPercent;

        if (this.mode === MODE_BUY) {
            // exchange/currency symbols ignored since this isn't a full app
            this.validation.notEnoughFunds = this.total.value > this.balance.value;
        }
        else {
            this.validation.notEnoughFunds = this.amount > this.balance.value;
        }
    }

    onSubmit (e) {
        e.preventDefault();
        const { value, valid } = this.form;
        this.isLoading = true;
        if (valid) {
            this.orderbookService.postLimitOrder({
                price:value.price,
                amount: value.amount,
                isBid: this.mode === MODE_BUY,
                currencyPair:
                    this.orderbookService.btcTradeCurrencyCode +
                    this.orderbookService.baseCurrencyCode,
            })
            .subscribe(
                (data) => {
                    console.log('DATA', data);
                    if (data.error) {
                        this.errors = data.error;
                    }
                    this.isComplete = true;
                },
                (err) => {
                    console.log('ERR', err);
                    if (err.status === 0) {
                        this.errors = 'Can\'t connect to server.';
                    }
                    else {
                        this.errors = err;
                    }
                    this.isComplete = true;
                }
            );
            return;
        }

    }

    onReattempt (e) {
        this.isLoading = false;
        this.errors = '';
        this.isComplete = false;
        this.onSubmit(e);
    }

    onClose (e) {
        if (e) {
            e.preventDefault();
        }
        if (this.close) {
            this.close.emit();
        }
    }
}

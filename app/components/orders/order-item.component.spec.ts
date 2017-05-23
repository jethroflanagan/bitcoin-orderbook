import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { OrderItemComponent } from './order-item.component';

import { OrderbookService } from '../../services/orderbook.service';

// pipes
import { MoneyPipe }        from '../../pipes/money.pipe';
import { AmountPipe }       from '../../pipes/amount.pipe';


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('OrderItemComponent', function() {
    let de: DebugElement;
    let el: any;
    let comp: OrderItemComponent;
    let fixture: ComponentFixture<OrderItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OrderItemComponent,
                MoneyPipe,
                AmountPipe,
            ],
            providers:    [
                OrderbookService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(OrderItemComponent);
                comp = fixture.componentInstance;
                de = fixture.debugElement.query(By.css('.OrderItem'));
                el = de.nativeElement;
            });
    }));

    it('should create component', (done) => {
        expect(comp).toBeDefined();
        done();
    });

    it('should have expected price and amount text', () => {
        comp.order = {
            price: 1234,
            amount: 2.35,
            id:'0',
        };
        fixture.detectChanges();
        expect( el.querySelector('.OrderItem-price').textContent )
            .toContain('1,234');

        const amountEl = el.querySelector('.OrderItem-amount');
        expect( amountEl.querySelector('.Amount-integer').textContent )
            .toContain('2');
        expect( amountEl.querySelector('.Amount-fractional').textContent )
            .toContain('35');
        expect( amountEl.querySelector('.Amount-padded').textContent )
            .toContain('000000');
    });

});

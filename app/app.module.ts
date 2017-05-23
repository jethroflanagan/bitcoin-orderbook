import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';
import { ReactiveFormsModule,
         FormsModule,
         FormBuilder }      from '@angular/forms';

// services
import { OrderbookService } from './services/orderbook.service';
import { AccountService } from './services/account.service';

// components
import { OrderbookComponent } from './components/orders/orderbook.component';
import { OrderListComponent } from './components/orders/order-list.component';
import { OrderItemComponent } from './components/orders/order-item.component';
import { PostOrderComponent } from './components/orders/post-order.component';
import { TextInputComponent } from './components/forms/text-input.component';

// directives
import { RestrictNumberDirective } from './components/directives/restrict-number.directive';

// pipes
import { MoneyPipe }        from './pipes/money.pipe';
import { AmountPipe }       from './pipes/amount.pipe';

// main
import { AppComponent }     from './app.component';

// grouped for ease of adding/removing more, could be separated into another file
// when more components/sections are added
const orderComponents = [
    OrderbookComponent,
    OrderListComponent,
    OrderItemComponent,
    PostOrderComponent,
];

const formComponents = [
    TextInputComponent
];

@NgModule({
  imports:      [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpModule,
  ],
  declarations: [
      AppComponent,

      // components
      ...orderComponents,
      ...formComponents,

      //pipes
      MoneyPipe,
      AmountPipe,

      // directives
      RestrictNumberDirective,
  ],
  providers:    [
      OrderbookService,
      AccountService,
      FormBuilder,
  ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }

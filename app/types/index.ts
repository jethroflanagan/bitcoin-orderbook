// These would be refactored out into other places if the app grows
export type Currency = {
    currencyCode:string;
    value:number;
};

export type Order = {
    price:number;
    amount:number;
    id?:string;
};

export type Orderbook = {
    timestamp:number;
    bids:Order[];
    asks:Order[];
};

export type PostLimitOrder = {
    amount:number;
    isBid:boolean;
    currencyPair:string;
    price:number;
};

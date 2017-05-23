import { browser, element, by } from 'protractor';

describe('QuickStart E2E Tests', function() {

    let expectedMsg = 'ORDERBOOK';

    beforeEach(function() {
        browser.get('');
    });

    it('should display: ' + expectedMsg, function() {
        expect(element(by.css('.Orderbook-title')).getText()).toEqual(expectedMsg);
    });

});

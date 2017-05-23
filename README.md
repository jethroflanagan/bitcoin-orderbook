# Angular QuickStart Source

This is based on [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html).

**This is not the perfect arrangement for an application. It is not designed for production.
It exists primarily to get started quickly with Angular**

It was the simplest way to get up and running rather than spend too long getting a production ready build environment. This does mean it will load slower as it doesn't compile everything together, and mobile performance when loading will be affected.

## Prerequisites

Node.js and npm. Tested with Node 7.3.0 and npm 4.0.5

## Running

```bash
npm install
npm start
```

Open a browser with [localhost:8000](http://localhost:8000).

Shut it down manually with `Ctrl-C` twice (due to concurrent execution), or `Ctrl-Z` once.

### Changing the API endpoint and mini-server

If you aren't on VPN, there's a simple server to bypass cross-site scripting issues.

To run, run the following (in another terminal in the same directory)

```bash
npm run mini-server
```

You can choose the API endpoint in the app in `app/services/orderbook.service.ts` on lines 13-14.

## Testing

* `npm test` - compiles, runs and watches the karma unit tests.
* `npm run e2e` - run protractor e2e tests

### Unit Tests
TypeScript unit-tests are usually in the `app` folder. Their filenames must end in `.spec`.

If more are added, they are automatically run.

Just one component was used for testing as a demonstration. Wider test coverage would be needed in the real world.

The spec is here: `app/components/orders/order-item.component.spec.ts`

This test covers checking that both `pipes` format the data correctly and the component is displayed.

### End-to-end (E2E) Tests

E2E tests are in the `e2e` directory, side by side with the `app` folder.
Their filenames must end in `.e2e-spec.ts`.

That command first compiles, then simultaneously starts the Http-Server at `localhost:8080`
and launches protractor.  

The pass/fail test results appear at the bottom of the terminal window.
A custom reporter (see `protractor.config.js`) generates a  `./_test-output/protractor-results.txt` file
which is easier to read; this file is excluded from source control.

Shut it down manually with `Ctrl-C`.

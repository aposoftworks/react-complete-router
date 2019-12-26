# react-complete-router

Tired of having to implement things that should come natively? Are you the one they said that the thing you wanted is unnecessary because nobody does it? So this router is for you! I&#x27;m tired of people saying that I should implement work arounds in things that should support them, so I decided to make a router that can be fully customizable to your needs, meed RCR!

[![NPM](https://img.shields.io/npm/v/react-complete-router.svg)](https://www.npmjs.com/package/react-complete-router) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-complete-router
```

## Usage

```tsx
import * as React			from 'react';

import { Router, Route } 	from 'react-complete-router';

export default function App () {
    return (
	  <Router>
	  	<Route to={<h1>Home</h1>} path="/">
	  	<Route to={<h1>About</h1>} path="/about">
	  </Router>
    );
}
```

## Guards
Guards are what make this package unique, enabling to customize even our path algorythm, you may add and extend any behaviour inside of the router. We already come with some useful guards for you:

- when : check a simple validation inside of the route to see if it can be rendered
- path : our path check is a guard, so you can toggle with yours in case of need
- guest : check if the router is auth logged and prevent render if so
- logged : check if the router is auth logged and prevent to render if not so

Guards are separated in two categories: priority and non-priority. Priority are guards called inside of the guard prop, if they are not found inside of the router, the router will fail. Non-priority are the route props (with a few exceptions such as to and guard, that are reserved keywords) and won't cause any trouble if not found.

## License

BSD-3 © [aposoftworks](https://github.com/aposoftworks)

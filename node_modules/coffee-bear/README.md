coffee-bear
===========
[![Build Status](https://travis-ci.org/stevenschobert/coffee-bear.png?branch=master)](https://travis-ci.org/stevenschobert/coffee-bear)

Coffee measurements from [blackbearcoffee.com](http://blackbearcoffee.com/resources/83)

#### Example Data

```json
{
  "2": {
    "coffee": {
      "ounces": "0.75",
      "grams": "21.3",
      "teaspoons": "12",
      "tablespoons": "4",
      "cups": "1/4"
    },
    "water": {
      "fluidounces": "16",
      "cups": "2",
      "pints": "1",
      "quarts": "1/2",
      "halfgallons": "1/4",
      "milliliters": "473",
      "liters": "0.47"
    }
  }
}
```
## Installation

```sh
npm install --save coffee-bear
```

## Usage

```js
var coffeeBear = require('coffee-bear');

coffeeBear(function(err, data) {
  if (err) { throw err; }

  // data is an object with keys 0-12
  // correspoding to the cups of coffee
  console.log(data);
});
```

## Todo

- Translate all measurement values into floating point numbers.


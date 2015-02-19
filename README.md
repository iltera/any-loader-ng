# any-loader-ng
AngularJS loading indicator directives
> Highly customizable directives to indicate loading in your app

## Getting Started
Install via Bower:
```shell
bower install any-loader-ng --save-dev
```

Add Any Loader to your AngularJS module:
```javascript
angular.module('myApp', ['anyLoader']);
```

### Dependencies
This module depends on and tested with:
* AngularJS v1.3.3
* Font Awesome v4.2.0

## Examples
There are two directives packaged in this module: `<any-loader>` and `<loader-button>`. `<any-loader>` is a stand-alone spinner icon to be placed anywhere in your application. `<loader-button>` is an enhanced `<button>` element that indicates loading with optional success and fail messages that replace the button text.

### &lt;any-loader&gt;
`<any-loader>` utilizes a configuration object to control the size of the loading icon, icon css class and the loading boolean value.
```javascript
var loaderConfig = {
  "isLoading": false,
  "size": "3em", // optional (default = null)
  "iconClass": "fa-refresh", // optional (default = "fa-spinner")
};
```
Markup:
```html
<any-loader cfg="loaderConfig"></any-loader>
```

### &lt;loader-button&gt;
`<loader-button>` utilizes a configuration object to control the size of the loading icon, icon css class, loading boolean value, successful boolean value, failure boolean value, success message and fail message.
```javascript
var buttonConfig = {
  "label": "Load Something",
  "size": null, // optional
  "iconClass": null, // optional
  "isLoading": false,
  "isSuccess": false, // optional (but requires successMsg if used)
  "isFail": false, // optional (but requires failMsg if used)
  "successMsg": "Success!", // optional (required with isSuccess)
  "failMsg": "Failed :(", // optional (required with isFail)
  "btnClass": "special-btn-class", // optional
};
```
Markup:
```html
<loader-button cfg="buttonConfig"></loader-button>
```

#### Example Code
Check out the [example app](src/app) I created to illustrate how to use the directives.

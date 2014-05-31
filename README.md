# angular-gs-rails-form-for

[![Build Status](https://secure.travis-ci.org/garbles/angular-gs-rails-form-for.png?branch=master)](https://travis-ci.org/garbles/angular-gs-rails-form-for)

Helper directives for dealing with more traditional form submissions in a non-SPA Angular/Rails application. 

### Installing

`bower install angular-gs-rails-form-for`

### Using

Include the package in your application:

```javascript
angular.module('app', ['gs.rails-form-for']);
```

Use it in forms

```html
<form form-for='bacon' action='/bacon' method='post'>
  <input type='text' ng-model='bacon.yum'>
  <div form-for='bacon.flavors'>
    <input type='text' ng-model='bacon.flavors.color'>
  </div>
</form>
```

The resulting output will be input tags with properly labeled `name` attributes
such that they are in a form Rails expects.

```html
<input type='text' ng-model='bacon.yum' name='bacon[yum]'>
...
<input type='text' ng-model='bacon.flavors.color' name='bacon[flavors][][color]'>
```

Setting a `XSRF-TOKEN` cookie [on your server](http://stackoverflow.com/questions/14734243/rails-csrf-protection-angular-js-protect-from-forgery-makes-me-to-log-out-on) for every request will allow you to submit your forms without a security warning.
`gs.rails-form-for` automatically submits the cookie value with the form as if it were a standard rails form submission.

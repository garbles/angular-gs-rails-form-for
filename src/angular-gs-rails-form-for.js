(function(window, angular, undefined) {'use strict';

var app = angular.module('gs.rails-form-for', []);

app.directive('formFor', ['$cookies', '$compile', 'toSnakeCase', function ($cookies, $compile, toSnakeCase) {

  function isPlural (str) {
    var lastLetter = str[str.length - 1];
    return lastLetter === 's';
  }

  return {
    restrict: 'A',
    require: '?form',
    link: function (scope, el, attrs, form) {
      var hiddenDiv,
        checkInput,
        tokenInput,
        token = $cookies['XSRF-TOKEN'];
      if (!form || !token) {
        return;
      }

      hiddenDiv = $compile('<div style="display:none"></div>')(scope);
      checkInput = $compile('<input name="utf8" type="hidden" value="✓">')(scope);
      tokenInput = $compile('<input name="authenticity_token" type="hidden" value="' + token + '">')(scope);

      hiddenDiv.prepend(tokenInput);
      hiddenDiv.prepend(checkInput);
      el.prepend(hiddenDiv);
    },
    controller: ['$element', '$attrs', function ($element, $attrs) {
      var name = $attrs.formFor,
        snakeNames = toSnakeCase(name.split('.')),
        model = snakeNames[0];

      angular.forEach(snakeNames.slice(1), function (str) {
        var ending;

        if (isPlural(str)) {
          ending = '[]';
        } else {
          ending = '';
        }

        model += '[' + str + ']' + ending;
      });

      this.model = model;
    }]
  };
}]);

angular.forEach(['input', 'textarea'], function (type) {
  app.directive(type, ['toSnakeCase', function (toSnakeCase) {
    return {
      restrict: 'E',
      require: '?^formFor',
      link: function (scope, el, attrs, formForCtrl) {
        var splitModel,
          component,
          model = (attrs.ngModel || attrs.ngValue);

        if (!formForCtrl || attrs.name || !model) {
          return;
        }

        splitModel = model.split('.');
        component = toSnakeCase(splitModel[splitModel.length - 1]);
        el.attr('name', formForCtrl.model + '[' + component + ']');
      }
    };
  }]);
});

})(window, window.angular);

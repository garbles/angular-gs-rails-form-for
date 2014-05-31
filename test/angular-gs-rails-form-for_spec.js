describe('angular-gs-rails-form-for', function () {
  beforeEach(module(
    'gs.rails-form-for',
    'ngCookies',
    'gs.to-snake-case'
  ));

  var $scope,
    $compile,
    $cookies;

  beforeEach(inject(function ($rootScope, _$cookies_, _$compile_) {
    $scope = $rootScope.$new();
    $compile = _$compile_;
    $cookies = _$cookies_;
  }));

  it('sets the authentication token via a cookie', function () {
    var form,
      tokenInput,
      xsrfToken = 'gabeiscool';

    $cookies['XSRF-TOKEN'] = xsrfToken;

    form = $compile('<form form-for="g"><input ng-model="a.gabe"></form>')($scope);
    tokenInput = form.children().children()[1];

    expect(tokenInput.value).toEqual(xsrfToken);
  });

  it('sets the appropriate name attribute', function () {
    var a = $compile('<form form-for="g"><input ng-model="g.gabe"></form>')($scope),
      aInput = a.children()[0],
      b = $compile('<form form-for="g.single"><input ng-model="g.gabe"></form>')($scope),
      bInput = b.children()[0],
      c = $compile('<form form-for="g.plurals"><input ng-model="g.gabe"></form>')($scope),
      cInput = c.children()[0],
      d = $compile('<form form-for="g"><div form-for="g.nested"><input ng-model="g.gabe"></div></form>')($scope),
      dInput = d.children().children()[0];

    expect(aInput.name).toBe('g[gabe]');
    expect(bInput.name).toBe('g[single][gabe]');
    expect(cInput.name).toBe('g[plurals][][gabe]');
    expect(dInput.name).toBe('g[nested][gabe]');
  });

  it('does not change the name attribute of the input if it is already set', function () {
    var name = 'gabeiscool',
      form = $compile('<form form-for="g"><input name="' + name + '" ng-model="g.gabe"></form>')($scope),
      children = form.children()[0];

    expect(children.name).toBe(name);
  });

  it('it does not create an authentication token if one is not set on the cookie', function () {
    var form = $compile('<form form-for="g"><input ng-model="a.gabe"></form>')($scope),
      children = form.children();

    expect(children.length).toBe(1);
  });
});

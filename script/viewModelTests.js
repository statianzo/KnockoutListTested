(function(){
  var viewModel;

  function tests(){
    function setUp(){
      viewModel = new App().viewModel;
    }

    function testShouldExist(){
      assertNotUndefined(viewModel);
    }

    function testShouldAdd(){
      viewModel.addItem('item');
      assertEqual(1,viewModel.items().length);
    }

    function testShouldRemoveItem(){
      var item = 'zing';
      viewModel.addItem(item);
      viewModel.removeItem(item);
      assertEqual(0,viewModel.items().length);
    }

  }

  this.viewModelTests = tests;
}());

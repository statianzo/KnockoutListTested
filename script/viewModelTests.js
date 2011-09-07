(function(){
  var viewModel;

  function viewModelTests(){
    function setUp(){
      viewModel = new App().viewModel;
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

    function testShouldCreateItemFromCurrentText(){
      viewModel.currentText('Oh Snap');
      viewModel.createItem();
      assertEqual(1,viewModel.items().length);
    }
  }

  var todoItem;
  function todoItemTests(){
    function setUp(){
      todoItem = new TodoItem('yo');
    }

    function testDestroyInvokesRemove(){
      var hit = false;
      todoItem.remove = function(){hit = true;};
      todoItem.destroy();
      assertTrue(hit);
    }

    function testDefaultsToViewMode(){
      assertEqual('view', todoItem.mode());
    }

    function testEditChangesModeToEdit(){
      todoItem.edit();
      assertEqual('edit', todoItem.mode());
    }

    function testSaveChangesModeToView(){
      todoItem.mode('other');
      todoItem.save();
      assertEqual('view', todoItem.mode());
    }

    function testCanComplete(){
      todoItem.complete(true);
    }
  }


  this.unitTests = [viewModelTests, todoItemTests];
}());

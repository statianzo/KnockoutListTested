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

    function testShouldCreateTodoItemFromCurrentText(){
      viewModel.currentText('Oh Snap');
      viewModel.createItem();
      assertEqual(1,viewModel.items().length);
      assertInstanceOf(TodoItem, viewModel.items()[0]);
    }

    function testShouldReturnCompleteItems(){
      viewModel.addItem({complete: function(){return true;}});
      viewModel.addItem({complete: function(){return true;}});
      viewModel.addItem({complete: function(){return false;}});

      assertEqual(2, viewModel.completed().length);
    }

    function testShouldReturnRemainingItems(){
      viewModel.addItem({complete: function(){return true;}});
      viewModel.addItem({complete: function(){return true;}});
      viewModel.addItem({complete: function(){return false;}});

      assertEqual(1, viewModel.remaining().length);
    }

    function testShouldClearCompleted(){
      viewModel.addItem({complete: function(){return true;}});
      viewModel.addItem({complete: function(){return true;}});
      viewModel.addItem({complete: function(){return false;}});

      viewModel.clearCompleted();

      assertEqual(1, viewModel.items().length);
    }

    function testShouldRenderItemsAccordingToMode(){
      var result = viewModel.render({mode: function(){return 'modeName'}});
      assertEqual('modeNameItem', result);
    }

    function testShouldPluralizeTheWordItem(){
      assertEqual('items', viewModel.pluralize(0));
      assertEqual('items', viewModel.pluralize(2));
    }

    function testShouldNotPluralizeTheWordItemWhenOne(){
      assertEqual('item', viewModel.pluralize(1));
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

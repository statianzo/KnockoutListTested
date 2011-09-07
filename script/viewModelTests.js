(function(){
  var viewModel;

  function viewModelTests(){
    function setUp(){
      viewModel = new App().viewModel;
    }

    function testShouldAdd(){
      viewModel.addItem({subscribe: function(){}});
      assertEqual(1,viewModel.items().length);
    }

    function testShouldRemoveItem(){
      var item = {subscribe: function(){}};
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

    function addItem(complete)
    {
      viewModel.addItem({subscribe: function(){}, complete: function(){return complete;}});
    }

    function testShouldReturnCompleteItems(){
      addItem(true);
      addItem(true);
      addItem(false);
      assertEqual(2, viewModel.completed().length);
    }

    function testShouldReturnRemainingItems(){
      addItem(true);
      addItem(true);
      addItem(false);

      assertEqual(1, viewModel.remaining().length);
    }

    function testShouldClearCompleted(){
      addItem(true);
      addItem(true);
      addItem(false);

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

  var store;
  function storageTests(){
    function setUp(){
      localStorage = {};
      store = new Store('blah');
    }

    function testShouldStoreInLocalStorage(){
      var hit = false;
      localStorage.setItem = function(){hit = true;};
      store.persist([1,2,3], function(i){return i;});
      assertTrue(hit);
    }

    function testShouldPullFromLocalStorage(){
      var json = JSON.stringify([1,2,3]);
      localStorage.getItem = function(){return json;};
      var result = store.load(function(i){return i;});
      assertEqual([1,2,3], result);
    }
  }


  this.unitTests = [viewModelTests, todoItemTests, storageTests];
}());

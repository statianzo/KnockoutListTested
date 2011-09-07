function App() {
  var store = new Store('knockoutList');

  function persistItems() {
    store.persist(viewModel.items(), function(item){
      return ko.toJS(item);
    });
  }

  function loadItems() {
    var items = store.load(function(item){
      return new TodoItem(item.value, viewModel.removeItem, item.complete);
    });
    _.each(items, viewModel.addItem);
  }

  var viewModel = {
    items: ko.observableArray(),
    currentText: ko.observable(''),

    addItem: function(item){
      item.subscribe(persistItems);
      viewModel.items.push(item);
    },
    removeItem: function(item){
      viewModel.items.remove(item);
    },
    createItem: function(){
      var item = new TodoItem(viewModel.currentText(), viewModel.removeItem);
      viewModel.addItem(item);
      viewModel.currentText('');
    },
    remaining: function(){
      return _.select(viewModel.items(), function(i){return !i.complete();});
    },
    completed: function(){
      return _.select(viewModel.items(), function(i){return i.complete();});
    },
    clearCompleted: function(){
      _.each(viewModel.completed(), function(i){viewModel.removeItem(i);});
    },
    render: function(item){
      return item.mode() + 'Item';
    },
    pluralize: function(count){
      return count === 1 ? 'item' : 'items';
    }
  };

  this.viewModel = viewModel;

  this.run = function(){
    loadItems();
    viewModel.items.subscribe(persistItems);
    ko.applyBindings(viewModel);
  };
}

function TodoItem(value, remove, complete) {
  this.value = ko.observable(value);
  this.remove = remove;
  this.mode = ko.observable('view');
  this.complete = ko.observable(!!complete);
}

TodoItem.prototype.destroy = function(){
  this.remove(this);
};

TodoItem.prototype.edit = function(){
  this.mode('edit');
};

TodoItem.prototype.save = function(){
  this.mode('view');
};

TodoItem.prototype.subscribe = function(handler){
  this.complete.subscribe(handler);
  this.value.subscribe(handler);
};

function Store(storeName) {
  this.persist = function(items, transform) {
    var data = _.map(items, transform);
    localStorage.setItem(storeName, JSON.stringify(data));
  };

  this.load = function(itemSetup) {
    var previous = localStorage.getItem(storeName),
        items = [],
        data;
    if (previous) {
      data = JSON.parse(previous);
      items = _.map(data, itemSetup);
    }
    return items;
  }
}

function App() {

  var viewModel = {
    items: ko.observableArray(),
    currentText: ko.observable(''),

    addItem: function(item){
      viewModel.items.push(item);
    },
    removeItem: function(item){
      viewModel.items.remove(item);
    },
    createItem: function(){
      var item = new TodoItem(viewModel.currentText(), viewModel.removeItem);
      viewModel.items.push(item);
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
    ko.applyBindings(viewModel);
  };
}

function TodoItem(value, remove) {
  this.value = ko.observable(value);
  this.remove = remove;
  this.mode = ko.observable('view');
  this.complete = ko.observable(false);
}

TodoItem.prototype.destroy = function(){
  this.remove(this);
};

TodoItem.prototype.edit = function(){
  this.mode('edit');
}

TodoItem.prototype.save = function(){
  this.mode('view');
}

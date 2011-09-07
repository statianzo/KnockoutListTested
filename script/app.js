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
      var item = viewModel.currentText();
      viewModel.items.push(item);
      viewModel.currentText('');
    }
  };

  this.viewModel = viewModel;
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

function App() {

  var viewModel = {
    items: ko.observableArray(),
    addItem: function(item){
      viewModel.items.push(item);
    },
    removeItem: function(item){
    viewModel.items.remove(item);
    }
  };

  this.viewModel = viewModel;
}

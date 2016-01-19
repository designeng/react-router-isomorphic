console.log("Index");

if (module.hot) {
  console.log("HOT REPLACEMENT INITED");
  module.hot.accept();
  module.hot.dispose(function() {
      console.log("RELOADED...");
  });
}

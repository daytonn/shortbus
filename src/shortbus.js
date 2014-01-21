// Wrap the entire library in a closure,
// passing in the global context
(function(global) {
  // Attach `ShortBus` to the global context
  global.ShortBus = {
    // Create a "private" events object to store events and handlers
    __events__: {},

    // Create an alternate namespace for `ShortBus`
    //
    // ie. `ShortBus.namespace(App, "Dispatcher"); // ShortBus is now namespaced App.Dispatcher`
    namespace: function(namespace, alias) {
      // Set the alias or default to `ShortBus`
      alias = alias || "ShortBus";
      // If the first argument is a string
      // create an alias on the current scope
      if (namespace.constructor === String) {
        alias = namespace;
        namespace = global;
      }
      // Set the new `ShortBus` namespace
      namespace[alias] = this;
      // Remove `ShortBus` from the current namespace
      global.ShortBus = undefined;
    },

    // Register event handlers with the event,
    // the handler function, and an optional context
    on: function(event, handler, context) {
      // If a context is passed, bind it to the handler
      if (context) {
        var originalHandler = handler;
        handler = function() {
          originalHandler.apply(context, arguments);
        };
      }
      // Create the event namespace or get a
      // reference to the existing array of handlers
      var events = this.__events__[event] = this.__events__[event] || [];
      // Set a flag to help determine if
      // a handler is already registered
      var handlerNotRegistered = true;
      // Loop through the event's handlers
      // and check if it's already registered
      for (var func in events) {
        if (events[func] === handler) handlerNotRegistered = false;
      }
      // Add the handler if it is not registered
      if (handlerNotRegistered) events.push(handler);
    },

    // Remove event handlers
    off: function(event, handler) {
      // create an array for handlers we're keeping
      var keptHandlers = [];
      // If passed a specific handler, loop through
      // the events to find and remove it
      if (handler) {
        for (var key in this.__events__[event]) {
          if (this.__events__[event].hasOwnProperty(key) && handler !== this.__events__[event][key]) {
            keptHandlers.push(this.__events__[event][key]);
          }
        }
        this.__events__[event] = keptHandlers;
      } else {
        // Remove all events for this handler
        this.__events__[event].length = 0;
      }
    },

    // Trigger a given event
    trigger: function() {
      // Convert the arguments to an array to pass to the handler
      var args = Array.prototype.slice.call(arguments);
      // Shift off the event name
      var event = args.shift();
      // Create a reference to the event handler array
      var handlers = this.__events__[event];
      // If the event has handlers, call them all
      if (handlers) {
        for (var key in handlers) {
          if (handlers.hasOwnProperty(key)) handlers[key].apply(null, args);
        }
      }
    }
  };
})(this);

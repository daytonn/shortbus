(function(global) {
  global.ShortBus = {
    __events__: {},

    namespace: function(namespace, alias) {
      alias = alias || "ShortBus";
      if (namespace.constructor === String) {
        alias = namespace;
        namespace = global;
      }
      global.ShortBus = undefined;
      namespace[alias] = this;
    },

    on: function(event, handler) {
      var events = this.__events__[event] = this.__events__[event] || [];
      for (var func in events) {
        if (events[func] === handler) return;
      }
      events.push(handler);
    },

    trigger: function(event) {
      var events = this.__events__[event];
      if (events) {
        for (var func in events) {
          if (events.hasOwnProperty(func)) events[func]();
        }
      }
    }
  };
})(this);

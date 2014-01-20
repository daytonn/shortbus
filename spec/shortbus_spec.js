var originalShortBus = ShortBus;

describe("ShortBus", function() {
  var NS;
  var subject;
  beforeEach(function() {
    NS = {};
    subject = ShortBus;
  });

  afterEach(function() {
    ShortBus = originalShortBus;
  });

  describe("namespace", function() {
    it("it attaches itself to global scope by default", function() {
      expect(ShortBus).toBeDefined();
    });

    it("attaches itself to a given namespace", function() {
      ShortBus.namespace(NS);
      expect(NS.ShortBus).toBeDefined();
      expect(ShortBus).toBeUndefined();
    });

    it("attaches itself to a given namespace with a given alias", function() {
      ShortBus.namespace(NS, "MyShortBus");
      expect(NS.MyShortBus).toBeDefined();
      expect(ShortBus).toBeUndefined();
    });

    it("creates an alias on the global scope when a string is the first argument", function() {
      ShortBus.namespace("MyShortBus");
      expect(MyShortBus).toBeDefined();
      expect(ShortBus).toBeUndefined();
    });
  });

  describe("events", function() {
    var handler;
    var foreignContext;
    beforeEach(function() {
      foreignContext = {
        name: "foreign",
        handler: function() {
          this.name = "changed";
        }
      };
      handler = jasmine.createSpy();
      ShortBus.on("someEvent", handler);
    });

    afterEach(function() {
      ShortBus.__events__ = {};
    });

    describe("on", function() {
      it("registers a handler for an event", function() {
        expect(ShortBus.__events__.someEvent).toEqual([handler]);
      });
    });

    describe("trigger", function() {
      beforeEach(function() {
        ShortBus.on("someEvent", handler);
        ShortBus.on("boundHandler", foreignContext.handler, foreignContext);
        ShortBus.trigger("someEvent");
        ShortBus.trigger("boundHandler");
      });

      it("triggers events", function() {
        expect(handler).toHaveBeenCalled();
      });

      it("deduplicates the handlers", function() {
        expect(handler.calls.count()).toEqual(1);
      });

      it("binds a context to the event handler", function() {
        expect(foreignContext.name).toEqual("changed");
      });
    });

    describe("off", function() {
      it("removes all handlers from an event if only the event name is passed", function() {
        ShortBus.off("someEvent");
        expect(ShortBus.__events__.someEvent.length).toEqual(0);
      });

      it("removes an event handler if the hander is passed", function() {
        ShortBus.on("someEvent", foreignContext.handler, foreignContext);
        ShortBus.off("someEvent", handler);
        expect(ShortBus.__events__.someEvent.length).toEqual(1);
      });
    });
  });
});

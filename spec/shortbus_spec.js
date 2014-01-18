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
    beforeEach(function() {
      handler = jasmine.createSpy();
    });

    describe("on", function() {
      beforeEach(function() {
        // TODO: pass context and bind handler to it
        ShortBus.on("someEvent", handler);
      });

      it("registers a handler for an event", function() {
        expect(ShortBus.__events__.someEvent).toEqual([handler]);
      });
    });

    describe("trigger", function() {
      beforeEach(function() {
        ShortBus.on("someEvent", handler);
        ShortBus.on("someEvent", handler);
        ShortBus.trigger("someEvent");
      });

      it("triggers events", function() {
        expect(handler).toHaveBeenCalled();
      });

      it("deduplicates the handlers", function() {
        expect(handler.calls.count()).toEqual(1);
      });
    });
  });
});

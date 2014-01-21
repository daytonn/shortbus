ShortBus
========

`ShortBus` is a dead simple javascript event bus. Weighing in at about 1kb it's a very lightweight event system library.

Installation
------------
Simply [download](https://raw.github.com/daytonn/shortbus/master/lib/shortbus.js) the script and put it in your javascript application however you prefer.


Usage
-----
`ShortBus` allows you to attach, trigger and detach event handlers to arbitrary events.


### Overview

```js
ShortBus.on("someEvent", someEventHandler, this);
ShortBus.trigger("someEvent");
ShortBus.off("someEvent", someEventHandler);
```

### namespace

The namespace method allows you to change the `ShortBus` namespace to anything you like. `namespace` has a few simple forms in order to accomodate any desired namespace. After the namespace is created, the default global `ShortBus` namespace will be removed. To simply change the `ShortBus` global namespace simply pass the alias as a string:

```js
ShortBus.namespace("Dispatcher");
Dispatcher.on("someEvent", someEventHandler, context);
ShortBus === undefined; // true
```

To attach `ShortBus` to an existing namespace, simply pass the namespace object as the first argument:

```js
var App = {};
ShortBus.namespace(App);
App.ShortBus.on("someEvent", someEventHandler, context);
ShortBus === undefined; // true
```

To attach `ShortBus` to an existing namespace with an alias, pass the namespace object and then the desired alias:

```js
var App = {};
ShortBus.namespace(App, "Dispatcher");
ShortBus === undefined; // true
```

### on

The on method allows you to attach an event handler to a given event:

```js
ShortBus.on("eventName", eventHandler);
```

To pass a context for your event handler to execute in, pass it as the third argument:

```js
ShortBus.on("eventName", eventHandler, context);
```

### off

The off method allows you to remove a single event handler or all event handlers for a given event. To remove a single event handler, pass the event name and the specific handler to be removed:

```js
ShortBus.off("eventName", eventHandler);
```

To remove all events attached to a given event, pass only the event name:

```js
ShortBus.off("eventName");
```

### trigger

The trigger method allows you to trigger a method and call every handler attached to the given event:

```js
ShortBus.trigger("eventName");
``

To pass data to the event handlers simply pass additional arguments to the trigger method:

```js
ShortBus.trigger("eventName", "hello", "world");
```




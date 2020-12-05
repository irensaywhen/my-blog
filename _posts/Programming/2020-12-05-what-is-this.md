---
title: 'What is this?!'
description: 'The complete guide to utilize javascript this keyword'
slug: 'what-is-this'
thumbnail: 'this/what-is-this43-20.jpg'
thumbnail_preview: 'this/what-is-this11-20.jpg'
image: '/assets/img/this/what-is-this21-20.jpg'
thumbnail_alt: 'What is this'
categories:
  - web development
tags:
  - javascript
---

In this post, I want to touch upon one of the most popular and confusing topics of JavaScript - `this`. My goal here is to give you an idea of how it works, and why `this` behaves in such a manner.

<!--more-->

## TL;DR

1. `This` is an implicit function parameter - that's why it is evaluated during execution.
2. When a function is invoked as a function, `this` is either undefined or the global object (window in the browser).
3. When a function is invoked as a method, `this` is the object before the dot.
4. We can specify `this` in the first argument when invoking a function with `call` or `apply`.
5. To define context before function invocation, we can use the `bind` method.
6. Arrow functions don't have `this`.

## Common ideas behind `this`

`This` is a reserved word often called **the function context**. It is a reference to an object in which this function is invoked. No worries, we'll discuss what does it all mean in a second. Just as a warm-up, I want to show a simple example of using `this`. For now, without in-depth explanations.

```javascript
const person = {
  name: 'Iren',
  talk() {
    alert(`Hello, my name is ${this.name}`);
  },
};

person.talk(); // Hello, my name is Iren
```

Here you see `this` in action: it allows us to reference the object from inside the method when we invoke it.

But as you may have noticed, JavaScript is special. And `this` is not bound to anything.

Let me show you the problem:

```javascript
const person = {
  name: 'Iren',
  talk() {
    alert(`Hello, my name is ${this.name}`);
  },
};

person.talk(); // Hello, my name is Iren

const talk = person.talk;

talk(); //Uncaught TypeError: Cannot read property 'name' of undefined
```

After copying the `talk method` into the `talk` variable, our `this` is undefined.

If you don't know why it happens, continue reading. Don't worry if it doesn't make much sense yet.

## Before we begin: function arguments vs function parameters

You might be wondering why I want to start with such an irrelevant topic. You came here because you had decided to learn about `this`, not about that boring little words we put inside the parenthesis.

But the real trick in understanding `this` is to understand function parameters.

We usually use these two terms interchangeably despite it's two different things.

##### Definitions

- A **_Parameter_** is a _variable_ that we list as a part of a function definition
- An **_Argument_** is a _value_ that we pass to a function when we invoke it

Ehh, sounds complicated. Let's sort it out.

Suppose have a function definition:

```javascript
function sayHello(name) {
  alert(`Hello, ${name}!`);
}
```

`name` is a **_parameter_**. Parameters are always specified in the moment of a function definition.

> No function definition => no parameters.

Now, imagine we're invoking this function:

```javascript
const name = 'Iren';

sayHello(name); // Hello, Iren
```

Here, `name` is a variable containing a string. When we invoke the function, we pass this string to the function. `name` here is an **_argument_**.
Arguments are always linked to function invocation.

> No function invocation => no arguments.

Okay, now we're ready to go. I don't want to spend hours on reflexing about that.

## `This`: the definition

In our example, `name` is an **explicit** function parameter.
We declared that **parameter** during the function definition, and passed an **argument** to that function on invocation so that 'Iren' (our argument) was assigned as a value to that parameter.

> **`This`** is an implicit function parameter.

This is it. Nothing less, nothing more. But wait, what's that mean?
It means that we're not declaring that parameter during the function definition. JavaScript does it behind the scenes. And when we invoke the function, it also passes an argument to the function that will be assigned to `this`.

There are two frequently occuring ideas:

- _The value of `this` is evaluated during the run-time_.
- _`This` can be used in any function, not only in methods of objects_

And both of them make sense when you think about `this` as of an implicit parameter, because:

- The values of function parameters are assigned when the function is invoked.
- We can use function's parameters inside it independantly of where the function is defined.

> No function invocation => no **`this`**

The value of `this` depends on how we invoke the function because only at the moment of function invocation JavaScript decides what to pass as an argument to that implicit parameter.

## Different ways to invoke functions in JavaScript

Lets talk about different ways to invoke a function in JavaScript:

- As a function
- As a method
- As a constructor
- Via function's methods `call` and `apply`

### Invoking function as a function

Sounds weird, but I simply want to emphasize the case when we invoke a function as is, not as a method, not as a constructor, nor, via function's methods.

We can have three different cases.

##### Function declaration invoked as a function

```javascript
// Function declaration
function sayHello(name) {
  alert(`Hello, ${name}!`);
}

sayHello('Iren');
```

##### Function expression invoked as a function

```javascript
// Function expression
const sayHello = function (name) {
  alert(`Hello, ${name}!`);
};

sayHello('Iren');
```

##### IIFE - Immediately invoked function expression

```javascript
(function () {
  alert('Hello, Iren!');
})();
```

In all three cases, `this` is evaluated in the same way, and it depends on the current mode.
In non-strict mode, it is the global object (`window` in the browser). In strict mode, it's `undefined`.

### Invoking function as a method

First things first, let's be precise.

##### Definition

Let's say that function is invoked as a method when it is assigned to an object's property, and invocation occurs by referencing the function via the object's property.

Suppose you have an object with a name.

```javascript
const person = {
  name: 'Iren',
};
```

Then you assing a function as a property of that object, and invoke the function via calling object property:

```javascript
person.talk = function () {
  alert(`Hi! My name is ${this.name}`);
};

person.talk(); // Hi! My name is Iren
```

When the function is invoked as a method of an object, `this` becomes a reference to the object on which this method was invoked. That's why `this` is missed when you copy the object's method.

Let's cover a more complex example:

```javascript
'use strict';

const man = {
  name: 'John',
};
const woman = {
  name: 'Alice',
};

function talk() {
  alert(`Hi! My name is ${this.name}`);
}

man.talk = talk;
woman.talk = talk;

man.talk(); // Hi! My name is John
woman.talk(); // Hi! My name is Alice

talk(); // Uncaught TypeError: Cannot read property 'name' of undefined
```

Let's see what's going on here:

- Two objects are defined. Both of them have the same property `name` with different values.
- Function `talk` is defined and assigned to the object's properties.
- When `talk` is called as a method of an object, JavaScript passes an object reference to the function as an argument. `this` becomes an object before the dot.
- When `talk` is called as a function, JavaScript implicitly passes undefined to the function (in strict mode). We're getting an error then.

### Invoking function as a constructor

Let's be precise here, too, and define a constructor function before digging any deeper.

> A **constructor function** is a function invoked with the `new` keyword

Let's discuss what is going on in the case of constructors. I'm not going to talk about all the peculiarities of the constructors in JavaScript as it's a whole other topic. Reach me out if you feel you might benefit from an article about that, and I'll write one.

Now, consider the following example:

```javascript
function Person(name) {
  this.talk = function () {
    this.name = name;
    alert(`Hello! My name is ${this.name}`);
  };
}

const alice = new Person('Alice');

alice.talk(); // Hello! My name is Alice
```

The `Person` is our constructor function. When a function is invoked as a constructor, the following steps happen:

- A new empty object is created
- This object is passed to the function as the `this` parameter
- The newly created object is returned

Now, with our example:

![Diagram showcasing the flow of function invocation as a constructor](/assets/img/this/this-constructor.jpg)

And for now, this is it for invoking functions as constructors.

### Invoking function with `call` and `apply`

In this kinda crazy JavaScript world, sometimes you need to specify in which context a function must be invoked for things to work properly.

It can be especially useful when you pass a function as a callback. For example, in event handlers, JavaScript passes HTMLElement object, which triggered the event.

Consider the following example:

```html
<button id="button">Click to talk!</button>
<script>
  const button = document.getElementById('button');

  function Person(name) {
    this.talk = function () {
      this.name = name;
      alert(`Hello! My name is ${this.name}`);
    };

  const alice = new Person('Alice');

  function talk() {
    this.talk();
  }
  button.addEventListener('click', talk);
</script>
```

We have out good old constructor, a button, and a `talk` function. This function simply calls `talk` method of the current context.

Now, if we click the button, we'll see an error in the console because our this is our `<button id="button">Click to talk!</button>`

This is not what we were looking for. Our button doesn't know about talk method. And it shouldn't.

So welcome `call` and `apply` methods of a function.

They are two built-in methods of a function (functions are objects in JavaScript, remember):

```javascript
func.call(context[, a, b, c, ...])
func.apply(context[, [a, b, c, ...]])
```

They're doing the same thing: calling the `func` function with the specified context. After calling `func` this way, `this` inside this function becomes `context`.
The only difference is how arguments are passed. `call` accepts an arbitrary number of arguments and passes it to the function, while `apply` accepts an array of arguments.

Let's tweak our example a bit, and fix our context.

```html
<button id="alice-button">Talk to Alice</button>
<button id="iren-button">Talk to Iren</button>
<script>
  const aliceButton = document.getElementById('alice-button');
  const irenButton = document.getElementById('iren-button');

  function Person(name) {
    this.talk = function () {
      this.name = name;
      alert(`Hello! My name is ${this.name}.`);
    };

  const alice = new Person('Alice');
  const iren = new Person('Iren');

  const talk = function () {
    this.talk();
  }

  aliceButton.addEventListener('click', function () {
    talk.call(alice);
  })
  irenButton.addEventListener('click', function () {
    talk.apply(iren);
  });
</script>
```

Now we have two buttons, and a `talk` function.
Pay attention to how we're specifying the callbacks. For both buttons, we're passing an anonymous function.

For `aliceButton`, we're calling the `talk` function specifying `alice` as a context. In this case, the `alice` object, which was created by our constructor, becomes `this` inside `talk` function.

For `irenButton`, we're doing almost the same, but passing `iren` as a context. So when we click those buttons, corresponding methods of `alice` and `iren` are invoked.

Let's summarize function invokation in the following table:
![Diagram showcasing the flow of function invocation as a constructor](/assets/img/this/this-function-invokation.jpg)

## Dealing with function context

Now that we've talked about how functions can be invoked and what happens with the context in those cases, we can get our hands dirty in two other topics tightly coupled with `this`: **arrow functions** and **bind** method.

### Binding the context

Before knowledge about `call` and `apply` has flushed from our mind, let's talk about another guy in the family of function methods: `bind`.
It looks like the `call` method:
`func.bind(context[, a, b, ...])`
But it does a completely different thing. Instead of invoking a function, it sews a function with provided context and returns this function. Let's tweak our last example:

```html
<button id="alice-button">Talk to Alice</button>
<button id="iren-button">Talk to Iren</button>
<script>
  const aliceButton = document.getElementById('alice-button');
  const irenButton = document.getElementById('iren-button');

  function Person(name) {
    this.talk = function () {
      this.name = name;
      alert(`Hello! My name is ${this.name}.`);
    };
  }

  const alice = new Person('Alice');
  const iren = new Person('Iren');

  let talk = function () {
    this.talk();
  };

  // Bind context to talk function and override the previous function
  talk = talk.bind(alice);

  aliceButton.addEventListener('click', talk);
  irenButton.addEventListener('click', function () {
    // Call function with call method
    talk.call(iren);
  });
</script>
```

In the example above, we:

- Declare a normal `talk` function,
- Call `bind` method of this function with `alice` object passed as an argument,
- Override initial `talk` function with the function returned by `bind`,
- Pass `talk` function as a callback to the click event listener.

With that in place, we can click on the _Talk to Alice_ button and see that our context isn't lost.

So here, the `bind` method returns a function with the specified context attached to it. This function doesn't accept context anymore. `this` is `alice` forever.

Moreover, we can't talk with Iren anymore. When we click on the _Talk to Irene_ button, the alert is _Hello! My name is Alice._.

That's because the `call` method doesn't do anything in the callback we provided to the `irenButton`.

### `bind`, `call`, `apply` comparison

As we discussed earlier, the `call` and `apply` methods does pretty much the same. The `bind`, on the other hand, is whole another beast.
It's easy to grasp the difference in the comparison table:

![Bind, call and apply comparison](/assets/img/this/bind-call-apply.jpg)

### Arrow functions

I'm not going to dive deep into all the peculiarities of the arrow functions in JavaScript, hovewer, it is a powerful feature to deal with `this`.

The important difference between regular functions and arrow functions is that arrow functions don't have `this`.
Simply, they don't have this implicit parameter, hence JavaScript cannot pass anything to it.

So when an arrow function is invoked, JavaScript doesn't see `this` parameter in the lexical environment of the current function, and check the outer scope.

For example, when you use a regular function as an event handler for click events, JavaScript passes the clicked target as `this`:

```html
<button id="button">Button</button>
<script>
  const button = document.getElementById('button');

  button.addEventListener('click', function () {
    console.log(this); // <button id="button">Button</button>
  });
</script>
```

Hovewer, when we use arrow function instead, `this` is global object - the closest not-empty `this`:

```html
<button id="button">Button</button>
<script>
  const button = document.getElementById('button');

  button.addEventListener('click', () => {
    console.log(this); // Window
  });
</script>
```

That's pretty much it. This tutorial becomes extremely long, so it's time to wrap everything up.

## Summary

1. `This` is an implicit function parameter - that's why it is evaluated during execution.
2. When a function is invoked as a function, `this` is either undefined or the global object (window in the browser).
3. When a function is invoked as a method, `this` is the object before the dot.
4. We can specify `this` in the first argument when invoking a function with `call` or `apply`.
5. To define context before function invocation, we can use the `bind` method.
6. Arrow functions don't have `this`.

---
title: 'React setState: the Right Way'
description: "In this tutorial, I'll explain how to change the state in React components using built-in setState method. I'll cover in detail two different approaches of using this method, explain the differences between these approaches, and show when to use which. "
slug: react-setstate
thumbnail: 'react-set-state43-20.jpg'
thumbnail_preview: 'react-set-state11-20.jpg'
image: '/assets/img/react-set-state21-20.jpg'
thumbnail_alt: 'Baikal photo 1'
categories:
  - web development
tags:
  - react
  - javascript
---

In this tutorial, I'll explain how to change the state in React components using built-in `setState` method. I'll cover in detail two different approaches of using this method, explain the differences between these approaches, and show when to use which. In the end, I'll discuss the common pitfalls that may occur when changing the state.

<!--more-->

## TL;DR

1. Use `this.setState` function to change the state of your components
2. If you don't depend on the old state, pass in the `this.setState` method an object with the new values
3. If you want to change the state depending on the previous values, pass a function to the `this.setState` method
4. The function you pass accepts the previous state and the props as its arguments
5. If you work with objects from your state, always copy them to avoid unintended modifications

## Setting everything up

The state is simply data that you want to store in your component. In this tutorial, I'm going to use a class-based component with the following initial setup:

```jsx
class App extends Component {
  state = {
    counter: 0,
  };

  clickHandler = () => {};
  render() {
    return (
      <React.Fragment>
        <div>{this.state.counter}</div>
        <button onClick={this.clickHandler}>Click!</button>
      </React.Fragment>
    );
  }
}
```

I'm having a `<div>` and a button. For the class method, I'm using an arrow function as I'll call `this.setState` inside it, and I don't want to lose my `this`. If you want to use a `function` keyword instead, your code should be as follows:

```jsx
class App extends Component {
  constructor(props) {
    this.clickHandler = this.clickHandler.bind(this);
  }
  state = {
    counter: 0,
  };

  clickHandler = function () {};
  render() {
    return (
      <React.Fragment>
        <div>{this.state.counter}</div>
        <button onClick={this.clickHandler}>Click!</button>
      </React.Fragment>
    );
  }
}
```

or, a bit shorter:

```jsx
class App extends Component {
  constructor(props) {
    this.clickHandler = this.clickHandler.bind(this);
  }
  state = {
    counter: 0,
  };

  clickHandler() {}
  render() {
    return (
      <React.Fragment>
        <div>{this.state.counter}</div>
        <button onClick={this.clickHandler}>Click!</button>
      </React.Fragment>
    );
  }
}
```

In the code above, I'm using the `.bind` method to set up a function with `this` value attached to it. But in the following examples, I'll stick to the arrow function syntax as it is more precise and elegant.

Okay, now we're on the same page. Let's get started.

## Updating state: the basics

Let's try to generate a random number and show it in our `<div>` when the button is clicked.

The first thing to mention is that you can't update the state of your component directly. What I mean is this won't work:

```javascript
class App extends Component {
  state = {
    counter: 0,
  };

  clickHandler = () => {
    this.state.counter = Math.random();
  };
  render() {
    return (
      <React.Fragment>
        <div>{this.state.counter}</div>
        <button onClick={this.clickHandler}>Click!</button>
      </React.Fragment>
    );
  }
}
```

In addition, you'll get an annoying warning in your console if you're using [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).
Instead of messing your poor state up, you need to use `this.setState` function:

```javascript
clickHandler = () => {
  this.setState({ counter: Math.random() });
};
```

This function is a function you inherited from the `React.Component`, and it's a part of React API. It accepts a new state of your component.
An important thing to mention here is that you don't need to repeat all the properties you have in your state to change only one value. The two objects will be merged by the `this.setState` function. Consider the following example:

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  state = {
    counter: 0,
    title: 'setState tutorial',
  };

  clickHandler = () => {
    this.setState({ counter: Math.random() });
  };
  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        <div>{this.state.counter}</div>
        <button onClick={this.clickHandler}>Click!</button>
      </React.Fragment>
    );
  }
}
```

In the code above, I'm displaying the title in the `<h1>` tag which I store inside the state. When the button is clicked, the title won't disappear.

## Updating state depending on the previous state

So far, so good. But what if we want to increment our previous counter when the button is clicked?
Technically, the following code will work as intended:

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  state = {
    counter: 0,
    title: 'setState tutorial',
  };

  clickHandler = () => {
    this.setState({ counter: ++this.state.counter });
  };
  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        <div>{this.state.counter}</div>
        <button onClick={this.clickHandler}>Click!</button>
      </React.Fragment>
    );
  }
}
```

The only thing that you may have noticed (if you follow along, what I highly encourage you to do) is that annoying warning in the console. The truth is that when we call `++this.state.counter`, we're trying to change the counter in our previous state and return the value of the mathematical operation. Not so good.
Luckily, React got you covered. `this.setState` method also accepts a function, which then should return the new state.
Also, the function accepts two arguments: the previous state and the props:

```jsx
import React, { Component } from 'react';

export default class App extends Component {
  state = {
    counter: 0,
    title: 'setState tutorial',
  };

  clickHandler = () => {
    this.setState((prevState, prevProps) => {
      console.log(prevState); // {counter: 0, title: "setState tutorial"}
      return { counter: ++prevState.counter };
    });
  };
  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        <div>{this.state.counter}</div>
        <button onClick={this.clickHandler}>Click!</button>
      </React.Fragment>
    );
  }
}
```

Now it works without any warnings or so. Let's discuss what happened.

## Why should I use a function?

Maybe, you're saying: I can copy the value of a counter and increment it then. This way:

```javascript
let oldCounter = this.state.counter;
this.setState({ counter: ++oldCounter });
```

Since numbers are primitives in javascript, there won't be any warnings in the console. But this is still not the right way to go.
The truth is that React updates state asynchronously even if the `this.setState` method is called synchronously. So when you update your state this way, you can't reliably say that this is the lates version of the state.
It's not a problem here since we have a tiny application, and all the updates occur almost immediately, but in bigger apps, it may cause problems. So, use a function if you want to update your state depending on the previous values.

## What about objects?

Okay, now everything is fine, you might be thinking. You're secured by `this.setState((prevState, prevProps) => ...)`. However, there's another pitfall.
In javascript, objects are stored by references. Let's do a quick check in our `clickHandler` function:

```javascript
clickHandler = () => {
  this.setState((prevState, prevProps) => {
    console.log(prevState === this.state); // true
    return { counter: ++prevState.counter };
  });
};
```

Baam! The `prevState` object is the same object as `this.state`. It's not a problem when we're dealing with primitives. Yet consider the following example:

```jsx
// Counter.js
import React from 'react';

const Counter = ({ counter, clickHandler }) => {
  return (
    <React.Fragment>
      <div>{counter}</div>
      <button onClick={clickHandler}>Increment the counter above!</button>
    </React.Fragment>
  );
};

export default Counter;
```

```jsx
// App.js
import React, { Component } from 'react';
import Counter from './Counter';

export default class App extends Component {
  state = {
    counters: [0, 0],
  };

  clickHandler = index => {
    this.setState((prevState, prevProps) => {
      let counter = prevState.counters[index];

      const counters = prevState.counters;
      counters[index] = ++counter;
      return {
        counters,
      };
    });
  };
  render() {
    const counters = this.state.counters.map((counter, index) => (
      <Counter
        counter={counter}
        key={index}
        clickHandler={() => this.clickHandler(index)}
      />
    ));
    return <React.Fragment>{counters}</React.Fragment>;
  }
}
```

In the example above, I have two counters, and an additional component that displays a `<div>` with the current counter, and a button to increment it.
When you click the button, you see that counter is incremented two times. Not something we were looking for.

So, where's the problem?

In these lines:

```javascript
const counters = prevState.counters;
counters[index] = ++counter;
```

Here we're working with the same `counters` array as living in out state. And arrays are objects. Hence we're incrementing the counter two times.
To fix this, we simply need to copy that array:

```javascript
clickHandler = index => {
  this.setState((prevState, prevProps) => {
    let counter = prevState.counters[index];

    const counters = [...prevState.counters];
    counters[index] = ++counter;
    return {
      counters,
    };
  });
};
```

So when you're working with objects, don't forget to copy them before performing any operations.

## Conclusion

1. Use `this.setState` function to change the state of your components
2. If you don't depend on the old state, pass in the `this.setState` method an object with the new values
3. If you want to change the state depending on the previous values, pass a function to the `this.setState` method
4. The function you pass accepts the previous state and the props as its arguments
5. If you work with objects from your state, always copy them to avoid unintended modifications

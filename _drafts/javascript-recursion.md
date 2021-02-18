---
title: 'Recursion 101'
description: 'Recursion ideas and appplication in javascript'
slug: 'what-is-this'
thumbnail: 'this/what-is-this43-20.jpg'
thumbnail_preview: 'this/what-is-this11-20.jpg'
image: '/assets/img/this/what-is-this21-20.jpg'
thumbnail_alt: 'What is this'
categories:
  - web development
tags:
  - personal
  - help
---

This post will be the second part of tree-parts series about the recursion in javascript. Here I'll talk a litle bit about the concepts behind the scary word **recursion**. In the first one, I'll be talking about execution context in javascript, which allows the recursion to exist. In the third article I want to give some examples and use-cases for recursion.
Lets jump right in!

<!--more-->

In general, there can be two ways of thinking: recursive and iterative.
Iterative thinking is one of the first things we learn, starting to learn programming. It's somewhere around the `if-else` statements.
Recursion, on the other hand, is a more complex concept. Lets start with a definition of a recursive function.

> Recursive function is a function calling itself.

Let's imagine you want to write a function `pow(x, n)` that will raise the first argument to the natural power (or zero) of the second argument.
First of all lets think what we need to do.

If we would do it manually, we would have something like this for different calls:

**pow(2,0) = 1**  
**pow(2,1) = 2 \* 1 = 2**  
**pow(2,2) = 2 \* 2 = 4**  
**pow(2,3) = 2 \* 2 \* 2 = 8**  
**pow(2,4) = 2 \* 2 \* 2 \* 2 = 16...**

So it seems like in order to raise a number to the natural power, we need to perform multiplication the **power** amount of time.

Let's apply **iterative thinking** to solve the problem:

```javascript
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

And it works perfectly fine. However, recursive solution is way more elegant (at the very least people usually say that). The main idea behind the recursion is that your function should simplify the task and call itself.

There are two different steps:

1. Recursion base - the most trivial case when you should produce reliable result
2. Call the function from inside the function

The most trivial case in our example is when we don't do anything at all: **pow(2,0) = 1**.

For this particular case this will work:

```javascript
if (n === 0) {
  return 1;
} else {
  // Recursion magic will happen here
}
```

Now it's the most difficult part: we need to figure out what the recursion step should be.
To figure that out, let's try to think again about what we're trying to achieve.

Let's consider the case when `n === 1`:

If `n === 1` we want to have something like **2 \* 1** (1 here is our `recursion base`).

We know for sure that **2 <sup>1</sup> = 2**.

Let's rewrite it this way:
**2 = 2 \* 1 = 2 \* 2 <sup>0</sup>**  
Here **2 <sup>0</sup>** is our `recursion base`.  
(Don't blame me for repeating it. It's easy to loose the idea. Hang with me.)

Okay, we got it. Let's make it a bit more difficult. `n === 2` case:

What we know: **2 <sup>2</sup> = 4**

How we can rewrite it: **4 = 2 \* 2 = 2 \* 2 <sup>1</sup> = 2 \* 2 <sup>2 - 1</sup>**

Okay, too much twos... Let's see what's going on when `n === 3`

What we know: **2 <sup>3</sup> = 8**

How we can rewrite it: **8 = 2 \* 4 = 2 \* 2 <sup>2</sup> = 2 \* 2 <sup>3 - 1</sup>**

Here you can notice that we **always** return to the previous step. Our `recursion base` is just the first step so that we have something to return to.

How to think about recursion: the kettle principle.

In mathematics and physics, there's a principle called **teapot principle**. The idea behind it is that you should solve your problems based on what you already know.
Let me tell you a story about a physician and a mathematician. https://andrewsumin.livejournal.com/61846.html

// Describe kettle principle here, and then finish your article on recursion

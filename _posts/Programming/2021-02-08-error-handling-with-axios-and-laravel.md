---
title: 'Ajax requests with Laravel and Axios - 422 and 419 errors'
description: 'Figure out how to tackle 419 and 422 errors utilizing a powerful promise-based ajax library.'
slug: 'error-handling-with-axios-and-laravel'
thumbnail: 'laravel-axios-errors/laravel-axios-419-422-43.jpg'
thumbnail_preview: 'laravel-axios-errors/laravel-axios-419-422-11.jpg'
image: '/assets/img/laravel-axios-errors/laravel-axios-419-422-21.jpg'
thumbnail_alt: 'Ajax requests with Laravel and Axios - 422 and 419 errors article thumbnail'
categories:
  - web development
tags:
  - backend
  - laravel
  - axios
---

Recently I started integrating a bootstrap template with the Laravel backend. And one thing that made me suffer a lot is the ajax backend validation.
Two errors often occur when you handle ajax requests with Laravel: **419** and **422**.

<!--more-->

## The **419** code corresponds to the absence of the `csrf token`.

To tackle this issue, simply put this into your `head`:

{% raw %}

```html
<meta name="csrf-token" content="{{ csrf_token() }}" />
```

{% endraw %}

And pass it with every request you make to Laravel. (For routes in `web.php` file)
If you use axios, you can either add it to your global axios config:

```javascript
axios.defaults.headers = {
  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
},
```

Or specify when you create an axios instance:

```javascript
const instance = axios.create({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
  },
});
```

## What about `422 Unprocessable Entity`?

This error occurs when your backend validation fails.
If you let Laravel refresh your page after `POST` request, you get errors in `@errors` directive and stuff, but usually you want to handle it via ajax either because you care about user experience, or you use a frontend framework such as React or Vue. Or even both.

Here's how you can tackle the latter issue with **axios**.

Suppose you validate your form with an email and password input fields:

```php
$request->validate([
  'email' => 'required|min:4',
  'password' => 'required|min:9'
]);
```

As **axios** is a Promise-based library, you can catch errors in `catch` blocks. However, the problem is that even if you add a catch block after your `then`,
it won't help you to get the information about the error in your browser. When you try to log it, you probably get something like this instead of a neat json with errors:

![422 log error](/assets/img/laravel-axios-errors/log.png)

Fortunately, the solution is simple. When you access the error data, use `error.response` instead of `error` in your catch block, this way:

```javascript
axios
  .post(endpoint, body, headers)
  .then(response => {
    // Do fancy stuff
  })
  .catch(error => {
    console.log(error.reponse); // logs an object to the console

    // Do something with error data
  });
```

Here, `error.response` is an object with several useful properties such as `status`, `statusText`, and `data`. The latter is what we're looking for.
There you can find a `message` property with a general description, and `errors` object with detailed validation errors.
In the `error.response.data.errors` object, the keys are the input names, and the values are arrays(!) of strings that describe errors.

Now let's make a step further, and use some fancy features provided by axios.
Axios gives us an ability to add **interceptors** to our requests and responses. It allows us to modify requests and responses consistently and stick to the DRY principle.

If you're not familiar with the concept of interceptors, you can think of it as follows:

- For **requests** they modify your request data before sending it to the server,
- For **responses** they modify the response before all your `then` and `catch` blocks.

If you want to learn more, check out the [axios docs on this topic](https://github.com/axios/axios#interceptors).

Using interceptors, we can add an extra layer:

```javascript
instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response)
);
```

Notice that we're forwarding both the normal response and the error.

And basically that's it!

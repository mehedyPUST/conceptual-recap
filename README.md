## 1. Difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`

- **`getElementById(id)`**
  - Returns a single element with the matching `id`.
  - Drect & Fast  because  ID is  unique in the HTML Document.
  - Example: `document.getElementById("btn-interview-filter")`.

- **`getElementsByClassName(class-name)`**
  - Gives a  HTMLCollection of all elements with the (class-name)  class.
  - I can loop through the collection to access individual elements.
  - Example: `document.getElementsByClassName("text-red-500")`.

- **`querySelector(selector)`**
  - Gives the first element that matches a CSS selector.
  - More flexible that  can be used to complex selectors.
  - Example: `document.querySelector(".item.item-container")`.

- **`querySelectorAll(selector)`**
  - Gives a NodeList of all elements matching the selector.
  - This will not change automatically with the DOM Change.
  - Example: `document.querySelectorAll("li")`.

---

## 2. Creating and Inserting a New Element into the DOM

Steps:
1. Using `document.createElement('X')` to create the element.
  X= tagName like: div, section , li , nav , footer etc
2. Then appendChild into the DOM using methods like:
   `appendChild()`


Ex:
```js
const newDiv = document.createElement("div");
newDiv.innerHTML = "<p> Hello World! </p>";
document.body.appendChild(newDiv);
```


## 3. What is Event Bubbling? And how does it work?

Event Bubbling is a DOM event propagation process where an event triggered on a target element travels upward through its parent elements in the DOM hierarchy.

How it works:
When an event occurs on an element (like a button click), the event first runs on that element itself. Then it "bubbles up" to its parent element, then to the parent's parent, and continues until it reaches the document root (html element). Further bubbling will result null. 

For example, if I click a button inside a div, the click event will trigger on:

The button first

Then the div containing it

Then any parent elements above it

This happens automatically unless I stop the propagation by using


```js
element.addEventListener('click', function(event) { event.stopPropagation(); 
// codes 
});
```

## 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation means I don’t put event listener on every small element. Instead, I put one event listener on the parent element. When I click a child element, the event goes up to the parent (this is called bubbling). Then the parent checks which child was clicked and runs the action. This way my code is simple, faster, and it also works for new elements that I add later without writing extra listeners.

Why it is useful:

Performance Improvement: It reduces memory usage by using fewer event listeners, especially when dealing with many elements.

It handles Dynamic Content means it also work for new elements that I add later. I don’t need to add new event listener again and again. Even if the element was not there before, it will still work because the listener is already on the parent.

Cleaner Coding means the code looks simple. I don’t have to write many event listeners in many places. Everything is handled in one place, so it is easier to read, change, and fix later.

Example: Instead of adding click handlers to 100 list items individually, I add one handler to the parent `<ul>` and check which `<li>` was clicked using ```event.target```.


## 5. What is the difference between ```preventDefault()``` and ```stopPropagation()``` methods?

Difference between ```preventDefault()``` and ```stopPropagation()```

```preventDefault()``` mean stop normal browser work.
But event still go up in DOM.

Example:

- Form not submit

- Link not open new page

- Checkbox not change

```stopPropagation()``` mean stop event going parent or child.
But browser normal work still happen.

Main difference:

- ```preventDefault()``` stop browser action.

- ```stopPropagation()``` stop event moving.

```preventDefault()``` stop browser work.

```stopPropagation()``` stop event go parent.

We can use one or both together depend on need.

Example:
If I use ```preventDefault()``` on link, link not open.
If I use ```stopPropagation()``` on `<button>` inside `<div>`, click not go to `<div>`.
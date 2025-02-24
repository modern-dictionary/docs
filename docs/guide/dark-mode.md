# Dark Mode / Light Mode Support

This section explains how to implement dark mode and light mode in your application, allowing users to switch between the two modes for a better user experience.

## Steps to Implement Dark Mode / Light Mode

### Step 1: Define the Theme State

First, define a variable to store the current theme (either dark or light) in your application. You can store the state in `localStorage` so that the theme persists across page reloads.

#### Example (Vue.js)

```js
  return {
    theme: localStorage.getItem('theme') || 'light', // default to 'light'
  };
```

### Step 2: Toggle Theme
Create a method to toggle between dark and light mode. When the theme changes, update the state and save it to **localStorage**.
```javascript
methods: {
  toggleTheme()
    {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme); // Save the theme to localStorage
    this.applyTheme();
  }
  applyTheme() 
    {
    if (this.theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}
created()
{
  this.applyTheme();
}

```

### Step 3: Apply Theme to the Application
Use tailwind CSS to define the styles for both the dark and light modes. You can apply different background colors, text colors, and other UI elements based on the active theme.


```vue
 // the way of defining dark and light mode styles
<div class="dark:text-white text-black"></div>
```

### Step 4: Add a Theme Toggle Button
Add a button or switch in your application for the user to toggle between light and dark mode.

```vue
<template>
  <div>
    <h1>Welcome to the Dark Mode / Light Mode Example</h1>
    <button @click="toggleTheme">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
    </button>
  </div>
</template>
```

## Conclusion
By implementing dark mode and light mode, you provide users with a customizable experience that adapts to their preferences. This simple toggle mechanism can be extended to other parts of your app as needed, allowing a more flexible and accessible UI for all users.




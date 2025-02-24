# Multi-language Support

This section describes how to implement multi-language support using a JSON file to store language data and how to integrate it into the application using variables.

## Language JSON File

The language data is stored in a JSON file where each key corresponds to a language and the associated text values. The structure of the JSON file looks like this:

```json
{
  "en": {
    "greeting": "Hello",
    "welcome_message": "Welcome to our application!",
    "logout": "Logout"
  },
  "fa": {
    "greeting": "سلام",
    "welcome_message": "به اپلیکیشن ما خوش آمدید!",
    "logout": "خروج"
  }
}
```

### In the above JSON file:

 - The en key holds the English text.
 - The fa key holds the Persian (Farsi) text.
 - The de key holds the Arabic text.
 - Using the JSON Data in Code

::: tip
To use the multi-language data in your application, you can import the JSON file and use variables to display the appropriate text based on the user's selected language.
:::

### Step 1: Import the JSON File
import languageData from './path-to-language.json';

### Step 2: Define a Reactive Variable for the Selected Language
You can define a reactive variable to store the selected language and switch it dynamically.

```javascript
  return {
    language: 'en', // default language
    languageStrings: languageData['en']
  };
```
### Step 3: Switch Languages
You can create a method to switch between languages based on the user's choice.

```javascript
  return {
    language : lang,
    languageStrings : languageData[lang]
  };
```
### Step 4: Use Language Variables in the Template
Now, in the template, you can bind the language variables to the UI elements.

```vue
<template>
  <div>
    <h1>{{ languageStrings.greeting }}</h1>
    <p>{{ languageStrings.welcome_message }}</p>
    <button>{{ languageStrings.logout }}</button>

    <select @change="switchLanguage($event.target.value)">
      <option value="en">English</option>
      <option value="fa">فارسی</option>
      <option value="de">Arabic</option>
    </select>
  </div>
</template>
```

In the above example, the content changes dynamically based on the selected language.

Conclusion
By using a JSON file to store language data and binding it to reactive variables in the application, you can easily implement multi-language support in your project. You can extend this approach to include more languages and texts as needed.


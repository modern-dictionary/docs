
# Data Flow & State Management

In Modern Dictionary, managing data flow and state efficiently is crucial for ensuring smooth user interactions.

## Data Flow
Data flows from the **backend** (Laravel) to the **frontend** (Vue.js). The Vue app fetches words and their meanings from the backend via API requests. When a word is added, updated, or deleted, real-time updates are pushed using **WebSockets** (via Node.js + Redis) to ensure that all connected clients are updated instantly.

- **Frontend** sends API requests to Laravel.
- **Backend** handles business logic, interacts with the database, and returns the data.
- **WebSocket** ensures real-time updates across all clients.

## Axios

Axios is used for handling HTTP requests to the backend for non-UI interactions like posting form data, retrieving word lists, and more. This includes more complex requests such as submitting words with additional media (e.g., images, audio).

### Example:
When submitting a form to add a new word, the frontend sends the word's data (including images, audio, and categories) to the backend using Axios with `multipart/form-data`:

```javascript
import axios from 'axios';

const formData = new FormData();
formData.append('word', this.newWord.word);
formData.append('meaning', this.newWord.meaning);
formData.append('pronunciation', this.newWord.pronunciation);
formData.append('description', this.newWord.description);

if (this.newWord.voice) {
    formData.append('voice', this.newWord.voice);
}
if (this.newWord.image) {
    formData.append('image', this.newWord.image);
}

// Append categories as JSON string
formData.append('categories', JSON.stringify(this.newWord.selectedCategories));

axios.post('/words', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
    .then(response => {
        // Handle the response after adding the word
    })
    .catch(error => {
        console.error('Error in adding word:', error);
    });
```

---

## Socket.io for Real-Time Updates

For real-time updates, **Socket.io** is used to listen for and emit events that trigger updates to the user interface without requiring a page refresh. This allows the frontend to instantly display changes such as new words being added or updated in the dictionary, and also handle mouse movements in real-time.


### Example:
The frontend listens for events via Socket.io to receive updates about newly added words:

```javascript
// Listen for mouse-move event
this.socket.on("mouse-move", (data) => {
    console.log("📩 Received mouse move from other user:", data);
    if (data.userId !== this.userId) {
        this.cursors[data.userId] = {
            x: data.position.x,
            y: data.position.y,
            color: data.color
        };
    }
});

// Sends mouse-move
this.socket.emit("mouse_move", {
    userId,
    teamId,
    position: { x: clientX, y: clientY }
});
```

---

## Backend Communication

### Laravel & Inertia.js
The backend (Laravel) uses **Inertia.js** to process data sent from the frontend. When a request is received via Inertia.js, Laravel processes the data (e.g., adding a new word) and returns a response that updates the frontend view without a full page reload.

#### Example:
```php
public function addWord(Request $request)
{
    $word = new Word();
    $word->fill($request->all());
    $word->save();

    return Inertia::render('Words/Index', [
        'words' => Word::all(),
    ]);
}
```

---

### Socket.io (Backend)
On the backend, **Socket.io** is used in a Node.js server to emit events when specific actions occur, such as when a new word is added. This enables real-time updates on the frontend, allowing connected clients to receive the updated information instantly without needing to refresh the page.


#### Example:
```javascript
io.to(`team-${data.teamId}`).emit("mouse-move", {
       userId: data.userId,
       position: data.position,
       color: userColors[data.userId]
   });
```

---

## Data Flow Summary
- **Inertia.js** facilitates smooth communication between the frontend and backend without full-page reloads, ensuring a responsive application.
- **Axios** handles HTTP requests for form submissions and data retrieval, including multipart data for media files.
- **Socket.io** provides real-time communication, enabling instant updates across all connected clients.

By leveraging these technologies, Modern Dictionary achieves a dynamic and efficient data flow, providing users with a seamless experience in both synchronous interactions and real-time updates.

### Exercise 0.4 : New note diagram

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note left of browser: The user presses the 'Save' button on the form, <br>the POST request is made with the note as the payload

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server

    Note right of server: The server receives the request and creates a new note with the payload. <br> It returns the address of the list of notes (the "notes" page)

    server-->>browser: The address of the notes : Location: /notes <br> HTML Status Code 302
    deactivate server

    Note left of browser: The status code 302 make the browser redirect <br> to the /notes page and thus it reloads it

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS File
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript File
    deactivate server

    Note left of browser: Once the JS code is received, the browser executes it. <br> This code fetches the .json data from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server

    Note right of server: The server sends back a list of the notes in JSON <br> (my latest submission is {content: "hiya", date: "2024-09-16T18:14:14.725Z"})

    server-->>browser: The list of all notes as JSON data
    deactivate server

    Note left of browser: Once the JSON data is received, the callback function is <br> called and the list of notes is rendered





```

### Exercise 0.6 : New note in Single page app diagram

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note left of browser: When the user clicks Save, a custom callback function is called <br> 

    browser->>browser: The callback function pushes the new note in the list

    browser->>browser: The input field is cleared

    browser->>browser: The updated list of notes is redrawn on the browser page

    Note left of browser: Finally, a POST request is made by the browser, <br> with the payload containing the new note as JSON data <br> ({content: "nice", date: "2024-09-18T16:36:19.598Z"})
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    activate server

    Note right of server: The new note is stored on the server.

    server-->>browser: HTML Status Code: 201 Created <br> Console message : {"message":"note created"}
    deactivate server

```
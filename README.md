1. Difference between client-side rendering (CSR) and server-side rendering (SSR)

CSR:
i) Browser (client) renders the html content and JS generates the content dynamically 
   Eg. React with index.html and all the necessary html components are generated by App.js

ii) As a result, initial page loading tend to slow and subsequent page loading will be faster.

iii) SEO will be poor as initial page loading is slower.

SSR:
i) Server renders the complete html content to the client 
   Eg. Express with index.js (with views like index.ejs)

ii) As a result, initial page loading will be faster but subsequent page loading will be slow.

iii) SEO will be good as initial page loading is faster (Search Engine Crawlers can spot the keywords at a faster pace).

==============================================================================================================================

2. Technology Used

S.E.R.N Stack -> SQL + Express + React + NodeJS

i) SQL - SQLite(3) being lightweight has been used for this Book Application


ii) Express (Backend) - Express will connect with SQLite for CRUD Operations and output displayed as a service
    http://localhost:5005/book-service

    Express Router is being used for page routing


iii) React (Frontend) - React will be used to display the front-end interface for displaying / adding / updating / deleting books
    http://localhost:3000

    React will connect with http://localhost:5005/book-service via axios


iv) NodeJS - Backend Javascript Runtime Environment

==============================================================================================================================

3. BOOK APP APPLICATION - Deploy and Run the Application as a Container

sequenceDiagram
    participant User
    participant System
    participant Backend as Express Backend
    participant Frontend as React Frontend
    participant Browser

    User->>System: Verify Node.js v22.12.0 and NPM v10.9.0
    User->>System: Check if Podman is installed

    User->>System: Open Windows PowerShell & Navigate to Project Folder
    System-->>User: Folder Accessed

    User->>Backend: Build Express App (podman build -f Dockerfile.backend -t backend-express .)
    User->>Backend: Start Express App (podman run -d -p 5005:5005 --name express-app backend-express)
    Backend-->>System: Running Express App
    User->>System: Check if Express App is Running (podman ps)

    if Express App is Running
        User->>Browser: Open localhost:5005
    else Express App is Not Running
        User->>Backend: Remove & Restart Container (podman rm & podman run)
    end

    User->>Frontend: Build React App (podman build -f Dockerfile.frontend -t frontend-react .)
    User->>Frontend: Start React App (podman run -d -p 3000:3000 --name react-app frontend-react)
    Frontend-->>System: Running React App
    User->>System: Check if React App is Running (podman ps)
    
    if React App is Running
        User->>Browser: Open localhost:3000
    else React App is Not Running
        User->>Frontend: Restart React Container (podman start react-app)
    end
    
==============================================================================================================================

4. BOOK APP APPLICATION - Deploy and Run the Application on a local workstation (Windows)

sequenceDiagram
    participant User
    participant System
    participant Backend as Express Backend
    participant Frontend as React Frontend
    participant Browser

    User->>Frontend: npm install
    User->>Frontend: Run in Development Mode (npm start)
    Frontend-->>Browser: Open React App on localhost:3000

    User->>System: [SQLite Installation Process] - Extract sqlite.zip contents and copy 6 files to the path C:\sqlite
    User->>System: [After SQLite Installation] - System Properties > Environment Variables > Edit Path Variable - Include C:\sqlite

    User->>Backend: npm install
    User->>Backend: Run in Development Mode (node server.js OR nodemon server.js)
    Backend-->>Browser: Open Express (Node) App on localhost:5005/book-service
    
==============================================================================================================================

# Kindo App 

## Getting Started:

To run the frontend, follow these steps:

1. Change directory to the "frontend" folder:

   ```cd frontend```

2. Install the required dependencies using npm:

   ```npm install```

3. Create a `.env.local` file in the "frontend" folder and add the following line:

```REACT_APP_GOOGLE_MAPS_API_KEY=<YOUR GOOGLE MAPS API KEY> ```

Replace `<YOUR GOOGLE MAPS API KEY>` with your actual Google Maps API key.

4. Start the frontend application:

```npm run start```

This will launch the frontend application locally, and you can access it in your web browser by visiting `http://localhost:3000` (or a different port if specified).

Please ensure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) installed before running the above commands.

## Technologies Used:
- React.js
- Google Maps API for maps
- CSS modules for styling
- Chakra UI for styled components"


## Feature
- Interactive maps that allow users to search for and explore different locations.
- Search functionality/filtering that allows users to find specific locations based on their criteria.
- A CMS that allows users to create and manage the locations and their content.
- Challenges to make the locations interative and engaging
- Audio guides 

## Routing
The app is divided into three main routes: /app, /landing, and /cms.

- The ```/app``` route is the main application route, which contains the interactive maps and search functionality.
- The ```/landing``` route is the landing page for the app, which provides a brief overview of the app's features. (Currently , it redirects to ```/app```)
- The ```/cms``` route is the CMS, which allows users to create and manage their own content.


## Folder Structure 
```
frontend
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── components
    ├── Icons
    ├── media
    ├── pages
    │   ├── App
    │   │   ├── CmsPage
    │   │   └── MapsPage
    │   └── landingPage
    └── App.js
    └── .env.local
```

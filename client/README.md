# ReactWeb Toolchain
This web application is created using Express server in Node JS along with React.

## Stack:
- Express
- React
- NodeJS

## Setup:
- change the project config in `package.json`
- run `npm install`
- to run dev environment, run `npm run dev`
- to build the project, run `npm build` or run `npm build-prod` for production build

## Project Tree:
```
root
├── main.js (main javascript file which runs the program)
├── appsettings.json (config for the application)
├── public (folder to serve static content)
│   ├── js
│   └── css
└── src (source folder)
    ├── api (contains controller and content for apis)
    ├── ui (contains controller and views for web ui)
    ├── utils (contains utils)
    └── react (react source folder)
        ├── modules (react source folder for main module)
        └── components (source folder for react components)
```
# E-commerce Platform 

This is semple project for E-commerce useing MERN full stack by `MongoDB` for NoSql database, `Express.js` for backend, `React.js` for frontend using Vite build tool and `Node.js` runtime.

You know we work in this project by `JavaScript` now calling modern web development program language, next we tell you how you can configuration project plugins and modules "node_modules" to you can work in our sources.

We work in this project by `Visual Studio Code` for write code and `MongoDB Compass` for management database.

## BackEnd and Database configuration

#### We useing in backend `Express.js` framework with `Node.js` runtime, You can start work with it by this steps: 

1. Create empty folder with name `e-commerce` and open it by Visual Studio Code.

2. Open new terminal and install `package.json` by call this command:

    ```
    npm init -y
    ```

3. Install express, mongoose and typescript by call this command:

    ```
    npm i express mongoose typescript
    ```

4. Install nodemon, ts-node `useing only for dependencies` (to help us start .ts file by .js file) by call this command:

    ```
    npm i --save-dev nodemon ts-node
    ```

5. Install `tsconfig.json` by call this command:

    ```
    npx tsc --init
    ```

6. Open `tsconfig.json` after `compilerOptions` section add this two sections:

    ```js
    "include": ["src/**/*"], // all files to convert it form .ts to .js
    "exclude": ["node_modules"] // this folder not convet any files inside it.
    ```

7. Connect and create database with name `ecommerce` by MongoDB Compass.

##### Not forget to install typescript for any package the Visual Studio Code can help you for that.
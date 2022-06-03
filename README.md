# password/form demo

This is using [vite](https://vitejs.dev/) as a development tool. Vite compiles the react `jsx` code into valid Javascript, and runs a local development server.

It also compiles the various css files into a deployable css file.

## build
```
% npm run build
```

This will create a directory `/public` and write files to it that are a deployable website.

## develop
```
% npm start
```

This will start a local server that automatically compiles the code and serves it.

## test
```
% npm test
```

Run tests for the password validation logic in node.js.

## lifecycle hooks
We are using `preversion` and `postversion` hooks via `npm`.

```
    "preversion": "npm test",
    "postversion": "git push && git push --tags",
```

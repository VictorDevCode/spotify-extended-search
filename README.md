# Spotify API Showcase

Spotify extended search using its Web API.

## Developed With:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/): Node.js web application framework.
- [Pug](https://pugjs.org): Node.js template engine.
- [Bulma](https://bulma.io/): CSS Framework.
- [passport-spotify](https://github.com/jmperez/passport-spotify): Spotify authentication strategy for Passport and Node.js.
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node): A Node.js wrapper for Spotify's Web API.

## Current Features:

With this web application you can:

- Search artists and get additional information such as their genres and albums.
- Search albums and get additional information such as their artists and the countries they are available.
- Search tracks and get additional information such as ther countries the are available.

## Getting Started:
- Make sure that your computer has installed Node.js and NPM:

```
npm -v
```

```
node -v
```

- After cloning this repository is necessary to install the necessary node modules:

```
npm i
```
- Create your local environment file by copying the example contained in the repository:

```
cp config/.env.example .env
```

- It's necessary to get your own Spotify API Client ID and Secret keys. This can be done visiting the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/) website.

- Once Obtained your Spotify API Client ID and Secret keys, add them to you .env file.

- Add ``http://localhost:3000/callback`` to your Redirect URIs from your application Settings in the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/) website.

## Start the Application:

- Run the application in a development environment:
```
npm run dev
```

- Open [localhost:3000](http://localhost:3000/) in your favorite browser.

## Run Linter:

- Run eslint without automatic code fixes:
```
npm run lint
```

- Run eslint with automatic code fixes:
```
npm run lint:fix
```

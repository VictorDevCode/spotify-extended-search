# Spotify API Showcase

Spotify extended search using its Web API.

## Current Features

With this web application you can:

- Search artists and get additional information such as their genres.
- Search albums and get additional information such as the countries they are available.

## Getting Started
Make sure that your computer has installed Node.js and NPM:

```
npm -v
```

```
node -v
```

After cloning this repository is necessary to install the necessary node modules:

```
npm install
```

It's necessary to get your own Spotify API Client ID and Secret keys. This can be done visiting the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/) website. Once Obtained your Spotify API Client ID and Secret keys, add them to the [app.js](app.js) file.

Add ``http://localhost:3000/callback`` to your Redirect URIs from your Application Settings in the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/) website.

Start the application by running:

```
npm start
```

Open [localhost:3000](http://localhost:3000/) in your favorite browser.

## Built With
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/): Node.js web application framework.
- [Pug](https://pugjs.org): Node.js template engine.
- [Bulma](https://bulma.io/): CSS Framework.
- [passport-spotify](https://github.com/jmperez/passport-spotify): Spotify authentication strategy for Passport and Node.js.
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node): A Node.js wrapper for Spotify's Web API.
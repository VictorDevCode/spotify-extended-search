# Spotify Extended Search

Extended search of artists, albums and tracks using Spotify's web API.
![Home page](/screenshots/home_page.png)

## Current Features:

With this web application you can:

- Search artists and get additional information such as their genres and albums.

![Artist page](/screenshots/artist_page.png)

- Search albums and get additional information such as their artists and the countries they are available.

![Album page](/screenshots/album_page.png)

- Search tracks and get additional information such as ther countries the are available.

![Track page](/screenshots/track_page.png)

## Project's Configuration:

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

- Add `http://localhost:3000/callback` to your Redirect URIs from your application Settings in the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/) website.

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

## Run tests:

```
npm run test
```

## Generate Code Coverage Report:

```
npm run coverage
```

## Dockerize the App:

- Build the Docker image:

```
docker build -t spotify-extended-search .
```

- Run the Docker image:

```
docker run -p 3000:3000 -d spotify-extended-search
```

- Open [localhost:3000](http://localhost:3000/) in your favorite browser.

## Developed With:

- [Node.js](https://nodejs.org/en/): Javascript runtime for the development of web applications.
- [Express](https://expressjs.com/): Node.js web application framework.
- [Pug](https://pugjs.org): Template engine for Node.js.
- [Bulma](https://bulma.io/): CSS Framework.
- [passport-spotify](https://github.com/jmperez/passport-spotify): Spotify authentication strategy for Passport and Node.js.
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node): A Node.js wrapper for Spotify's Web API.
- [i18next](https://www.i18next.com/): Internationalization framework.
- [Home page's hero background image](https://www.pexels.com/photo/woman-listening-on-headphones-374703/).

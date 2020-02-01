# MERN Boilerplate

My MERN Stack Boilerplate

---

### Usage

-   Download or clone this repo.
-   Add `keys_dev.js` file in config folder with the following structure.

```js
module.exports = {
	mongoURI: 'YOUR_MONGO_URI',
	secretOrKey: 'YOUR_SECRET_KEY'
};
```

-   Install Back-end Dependencies.

```sh
yarn
```

-   Install Front-end Dependencies.

```sh
yarn run client-install
```

-   Run Development Server.

```sh
yarn run dev
```

-   To run only Back-end Server.

```sh
yarn run server
```

-   To run only Front-end Server.

```sh
yarn run client
```

---

### Details

-   `routes/api` folder contains user Registration and Login Routes.
-   `config` folder contains keys and Passport Google Strategy.
-   `utils` folder contains utility functions for input validation.
-   Sass / SCSS is used for styling.

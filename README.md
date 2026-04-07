# Crypto Lookup

Crypto Lookup is a small Express and EJS app for searching cryptocurrency market data from the WorldCoinIndex API.

The app lets you:

- search a coin by label and view a BTC market snapshot
- browse a full list of available coins
- filter the returned coin list in the browser

## Tech Stack

- Node.js
- Express
- EJS
- Axios
- HTML/CSS/JavaScript

## Features

- server-rendered UI with EJS partials
- single coin lookup by label
- formatted market data output
- full coin list view
- client-side filtering for the coin list
- static asset support for styles, images, and favicon

## Project Structure

```text
Crypto-lookup/
├── controller/
│   └── crypto-lookup-controller.js
├── public/
│   ├── favicon.ico
│   ├── images/
│   ├── js/
│   └── styles/
├── routes/
│   └── crypto-lookup-route.js
├── views/
│   ├── partials/
│   │   ├── footer.ejs
│   │   └── header.ejs
│   └── worldcoinindex.ejs
├── index.js
├── package.json
└── README.md
```

## Routes

- `GET /` renders the main lookup page
- `POST /` fetches a market snapshot for the submitted coin label
- `GET /list` fetches and renders the available coin list

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Installation

```bash
npm install
```

### Run the App

Start the app with:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## How It Works

1. The Express server starts from `index.js`.
2. Static files are served from `public`.
3. Routes are defined in `routes/crypto-lookup-route.js`.
4. Controller logic in `controller/crypto-lookup-controller.js` calls the WorldCoinIndex API with Axios.
5. The response is rendered into `views/worldcoinindex.ejs`.

## API Notes

This project uses the WorldCoinIndex API to fetch:

- ticker snapshot data for a specific coin
- the available market list in BTC

The current version is set up to work immediately after install and startup.

## Future Improvements

- add a `dev` script for local development
- add error logging and friendlier fallback states
- add tests for routes and controller logic
- support more fiat pairs beyond BTC

## License

This project is currently unlicensed unless you add a license to `package.json` and the repository.

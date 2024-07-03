# Frax Basket Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

frax-client hosts the code for frontend that can be used by users to interact with Frax Basket Smart Contracts on fraxtal chain (252). You can connect with any WalletConnect supported EVM wallet and connect with this dapp.

Users can switch to fraxtal mainnet using Wallet Connect chain option.

## Tech

- **React.js** - React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.
- **Node** - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Web3Modal** - Web3Modal is an easy-to-use library to help developers add support for multiple providers in their apps with a simple customizable configuration
- **WalletConnect** - WalletConnect gives developers the tools to build user experiences that make digital ownership effortless, intuitive, and secure.
- **ReCharts** - Recharts - Re-designed charting library built with React and D3.
- **Wagmi** - React Hooks for Ethereum. Type Safe, Extensible, and Modular by design.
- **Ethers.js** - The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.
- **Framer Motion** - Framer Motion is a simple yet powerful motion library for React.
- **Gecko API** - Use our free cryptocurrency API to get data such as live crypto prices, trading volume, trading pairs, historical information, exchanges data, and more.

## Getting Started

1. Install necessary node modules by running:
   `yarn install`
2. Start the Client by `yarn start`
3. You will find the website running on browser (tested on chrome) at localhost:3000

## Code Base

- `./src/Index.js` marks the starting point of this project, implements the configuration for WalletConnect Web3Modal and Fraxtal chain.

- `./src/App.js` hosts the Navbar Header, switchable body and Footer for the Website.

- `./src/pages` contains 4 pages for 4 Navigation Options: Landing Screen(Home), Analytics, Mint and Swap (Fund)

- `./src/components` contains major part of the website hosting multiple components to be rendered on pages. Not so efficient

Other Folders that are self explainatory:

- `./src/contants`
- `./src/assets`
- `./src/abis`
- `./src/services`
- `./src/styles`

## React Helper Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

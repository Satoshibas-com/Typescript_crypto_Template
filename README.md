# Vanilla Typescript dapp template

If you want to build a dapp without any framework like reactjs, vuejs or angularjs. This is the boilerplate for you.


# Pre-requisition
Following global npm packages are needed:
- ganache-cli (option): For testing your smart contract
- truffle: For compiling smart contract to json files.
- typescript: To transpile src/*.ts to dist/

# Modifible files
- ./src/app.ts: Main business logic of the dapp associated with ./index.html
- ./dist/asset/*: All assoicated asset files with ./index.html
- ./index.html: Where all html tempates is located

# Start the application
- Run "tsc --watch" then start editing the ts files.
- Run your own host server on root dir (ex. python -m http.server)


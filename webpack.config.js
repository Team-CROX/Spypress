const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV, //NPM RUN DEV = mode: development && NPM RUN BUILD = mode: production;
  entry: "./client/index.js", //Loading Index.js file in client

  //When using mode: dev;
  devServer: {
    contentBase: path.join(__dirname, "/public"), //Content base loads all static files from public folder.
    port: 8080, //dev post host #;
    publicPath: "/build/", //host path for our bundle & assets;
  },
  output: {
    path: path.join(__dirname, "./package"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      //Needed to use React;
      {
        test: /\.jsx?/, 
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      //Needed to use SCSS;
      {
        test: /scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};

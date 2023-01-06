const path = require("path");
// https://webpack.js.org/guides/author-libraries/
module.exports = {
  entry: {
    index: "./src/index.ts",
    demo: "./src/demo.ts"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    watchContentBase: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "browser-font-size-observer": path.resolve(__dirname, "src/index")
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist"),
    libraryExport: "default",
    libraryTarget: "umd"
  }
};

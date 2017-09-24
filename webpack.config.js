const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevelopmentEnvironment = NODE_ENV === "development";
const sourceDir = path.resolve(__dirname, "src");

const pages = [
  {
    path: "/",
    filename: "index.html",
    title: "Home"
  },
  {
    path: "/about",
    filename: "about/index.html",
    title: "About"
  },
  {
    path: "/topics",
    filename: "topics/index.html",
    title: "Topics"
  }
];

const entry = {
  client: "./src/client.js"
};

if (isDevelopmentEnvironment) {
  entry.app = "./src/markup.js";
}

const config = {
  entry,
  output: {
    filename: `[name]${isDevelopmentEnvironment ? "" : ".[hash]"}.js`,
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: sourceDir,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: sourceDir,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: sourceDir,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000
          }
        }
      },
      {
        test: /\.js$/,
        include: sourceDir,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new ExtractTextPlugin({
      filename: `[name]${isDevelopmentEnvironment ? "" : ".[hash]"}.css`,
      disable: isDevelopmentEnvironment
    })
  ]
};

for (let page of pages) {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: page.filename,
      template: "./src/template.ejs",
      title: page.title,
      isDevelopmentEnvironment
    })
  );
}

if (!isDevelopmentEnvironment) {
  config.plugins.push(new UglifyJSPlugin({ sourceMap: true }));
}

module.exports = config;

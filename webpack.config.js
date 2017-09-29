const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevEnv = NODE_ENV === "development";
const sourceDir = path.resolve(__dirname, "src");

const localIdentName = isDevEnv
  ? "[path][name]---[local]---[hash:base64:5]"
  : "[hash:base64:5]";

const styleLoader = (options = {}) => {
  let cssLoader = "css-loader";
  if (options.module) {
    cssLoader = `${cssLoader}?module&localIdentName=${localIdentName}`;
  }
  return ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [cssLoader, "postcss-loader", "sass-loader"]
  });
};

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

const config = {
  entry: {
    client: "./src/client.js",
    app: "./src/app.js"
  },
  output: {
    filename: `[name]${isDevEnv ? "" : ".[hash]"}.js`,
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: isDevEnv
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: sourceDir,
        exclude: /\.module\.scss$/,
        use: styleLoader()
      },
      {
        test: /\.module\.scss$/,
        include: sourceDir,
        use: styleLoader({ module: true })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: sourceDir,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "images/[name].[ext]"
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: sourceDir,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "fonts/[name].[ext]"
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
    new webpack.ProvidePlugin({
      React: "react"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new ExtractTextPlugin({
      filename: `[name]${isDevEnv ? "" : ".[hash]"}.css`,
      disable: isDevEnv
    })
  ]
};

for (let page of pages) {
  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      filename: page.filename,
      template: "./src/template.ejs",
      title: page.title,
      isDevEnv: isDevEnv
    })
  );
}

if (isDevEnv) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (!isDevEnv) {
  config.plugins.push(new UglifyJSPlugin({ sourceMap: true }));
  config.plugins.push(
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "src/icon.svg"),
      prefix: "/icons-[hash]/"
    })
  );
}

module.exports = config;

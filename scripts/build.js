const path = require("path");
const webpack = require("webpack");
const config = require("../webpack.config");
const ReactDOMServer = require("react-dom/server");
const replace = require("replace-in-file");

const toLocation = str => `/${str.replace(/\/?index\.html$/g, "")}`;

const renderPages = ({ hash, compilation }) => {
  const appJSPath = path.resolve(__dirname, "../dist", `app.${hash}.js`);
  const appJS = require(appJSPath);
  const htmlFiles = Object.keys(compilation.assets).filter(str =>
    str.endsWith(".html")
  );

  let renderedPages = [];
  for (let file of htmlFiles) {
    const options = {
      files: path.join("dist", file),
      from: "<!-- -->",
      to: ReactDOMServer.renderToStaticMarkup(
        appJS.renderMarkup({ location: toLocation(file), context: {} })
      )
    };
    try {
      renderedPages = renderedPages.concat(replace.sync(options));
    } catch (error) {
      throw err;
    }
  }
  console.log("Rendered pages:", renderedPages.join(", "));
};

webpack(config, (err, stats) => {
  if (err) throw err;
  renderPages(stats);
});

require("babel-register");
const path = require("path");
const webpack = require("webpack");
const config = require("../webpack.config");
const ReactDOMServer = require("react-dom/server");
const replace = require("replace-in-file");
const glob = require("glob");
const { renderMarkup } = require("../src/markup");

const toLocation = str => `/${str.replace(/\/?index\.html$/g, "")}`;

const renderPages = () => {
  const files = glob.sync("**/*.html", { cwd: "dist" });
  let renderedPages = [];
  for (let file of files) {
    const options = {
      files: path.join("dist", file),
      from: '<div id="root"></div>',
      to: ReactDOMServer.renderToStaticMarkup(
        renderMarkup({ location: toLocation(file), context: {} })
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

webpack(config, err => {
  if (err) throw err;
  renderPages();
});

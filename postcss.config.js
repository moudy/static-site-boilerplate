const config = {
  plugins: [require("autoprefixer")]
};

if (process.env.NODE_ENV !== "development") {
  config.plugins.push(require("cssnano"));
}

module.exports = config;

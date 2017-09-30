
# Static site development boilerplate

Basic configuration for developing static site. Assets are bundled by Webpack. React is used for templating. This is *NOT* a React app.

### Quickstart
```sh
git clone https://github.com/moudy/static-site-boilerplate
cd static-site-boilerplate
yarn install
yarn run dev
open http://localhost:8080/
```

### Building Site
```bash
yarn run build # builds static files into dist/
```

### Files

`scripts/build.js`  
Builds the assets and renders each page of the React app.

`webpack.config.js`  
Asset bundling configuration. Also defines the pages to generate in `const pages =  ...`.

`src/template.ejs`  
The template used by HtmlWebpackPlugin which generates the outer HTML for each page.

`src/app.js`  
Stateless React components that will be rendered to static HTML by the build script. Should import all style files which will be extarcted into 1 file with `ExtractTextPlugin` on build.

`src/client.js`  
Client-side JavaScript code.

### Why?
I'm used to building React apps. Other templating solutions are either too restrictive or too complex. I don't want to think about the templating language specific syntax for partials, control flow, etc. when I can just think in terms of plain JavaScript and JSX. Also having Webpack with Hot Module Replacement, css-loader, etc. is a nice workflow.

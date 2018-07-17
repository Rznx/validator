const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "main.js", // string    // the filename template for entry chunks
    publicPath: "/assets/", // string    // the url to the output directory resolved relative to the HTML page
    library: "hzob-validation", // string,
    // the name of the exported library
    libraryTarget: "umd", // universal module definition    // the type of the exported library
    /* Advanced output configuration (click to show) */
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
  },
};
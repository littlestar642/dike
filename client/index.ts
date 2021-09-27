const express = require('express');
const { default: GetConfig } = require('./src/utils/config');
const app = express();

const port = process.env.PORT || GetConfig("SERVER:PORT");
const devServerEnabled = (process.env.ENV || "development") == "development";

// Webpack dependencies
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

// Web dependencies
const { default: web } = require('./src/ui/controller');

// React webpack
if (devServerEnabled) {

    config.forEach((module: any) => {
        let appName = module.devServer.publicPath + "/" + module.output.filename.substr(0, module.output.filename.length - 3);
        module.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000&path=/__webpack_hmr_' + appName);
        module.plugins.push(new webpack.HotModuleReplacementPlugin());

        let compiler = webpack(module);

        //Enable "webpack-dev-middleware"
        app.use(webpackDevMiddleware(compiler, {
            publicPath: "/dist/modules"
        }));

        //Enable "webpack-hot-middleware"
        app.use(webpackHotMiddleware(compiler, {
            path: '/__webpack_hmr_' + appName
        }));
    });

} else {
    app.use('/dist', express.static('./dist'));
}

// Static
app.use(express.static('./public'));

// Web
app.use('/', web);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

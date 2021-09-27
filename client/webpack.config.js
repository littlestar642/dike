const path = require("path");
const fs = require("fs");
const appsettings = require("./appsettings.json");

const configTemplate = {
    entry: { app: [] },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env", "@babel/preset-react"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    output: {
        publicPath: "auto"
    },
    devServer: {
        lazy: true,
        port: appsettings.SERVER.PORT,
        hotOnly: true
    },
    plugins: []
};

function getTree(dirname) {
    let files = [];
    let contents = fs.readdirSync(dirname);
    contents.forEach(content => {
        let filePath = path.join(dirname, content)
        if (fs.statSync(filePath).isDirectory()) files = [...files, ...getTree(filePath)];
        else files.push(filePath);
    });
    return files;
}

function getConfig() {
    webpackConfig = [];
    reactSourcePath = path.join("./", "src/react");
    let files = getTree(path.join(reactSourcePath, "modules"));
    files = files.filter(file => /\.(ts|tsx)/.test(file));
    files.forEach(file => {
        let filename = path.basename(file);
        filename = filename.replace(".tsx", ".js");
        filename = filename.replace(".ts", ".js");
        let dir = path.dirname(path.relative(reactSourcePath, file));
        let currentConfig = JSON.parse(JSON.stringify(configTemplate));
        currentConfig.module.rules = configTemplate.module.rules;
        
        currentConfig.entry.app.push("./" + file);
        currentConfig.output.path = path.resolve(__dirname, "dist", dir);
        currentConfig.output.filename = filename;
        currentConfig.devServer.publicPath = "dist/" + dir;
        currentConfig.devServer.filename = filename;

        webpackConfig.push(currentConfig)
    });
    return webpackConfig;
}

module.exports = getConfig();
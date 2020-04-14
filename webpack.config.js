const path = require('path');

module.exports = {
    mode: 'production', // 开发模式
    entry: path.join(__dirname, "./src/index.js"), // 项目入口，处理资源文件的依赖关系
    output: {
        path: path.join(__dirname, "./lib/"),
        filename: "index.js",
        libraryTarget: 'umd', // 采用通用模块定义
        libraryExport: 'default', 
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ]
    },
    externals: { // 定义外部依赖，避免把react和react-dom打包进去
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    }
};
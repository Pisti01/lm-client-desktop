const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const node = "12.0.0";
const chrome = "73";

exports.config = {
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
}

exports.mainConfig = {
    entry: './src/main/main.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/main')
    },
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                modules: false,
                                targets: {
                                    node: node
                                }
                            }],
                            "@babel/typescript"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            }
        ]
    },
}

exports.rendererConfig = {
    entry: './src/renderer/index.ts',
    output: {
        filename: 'renderer.js',
        path: path.resolve(__dirname, 'dist/renderer')
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                modules: false,
                                targets: {
                                    chrome: chrome,
                                }
                            }],
                            "@babel/typescript"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'src/static/' }], {})
    ]
}

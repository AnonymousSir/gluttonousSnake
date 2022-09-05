const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/index.ts',
  // 打包输出目录
  output: {
    path: path.resolve(__dirname + 'dist'),
    filename: 'bundle.js',

    // 告诉webpack不使用箭头函数(webpack开头就是一个箭头函数加自执行函数
    // babel转了也没用，babel只转里面的代码)
    // 要兼容ie的话就要写这个，不然开头一个箭头函数ie直接就报错了
    environment: {
      arrowFunction: false,
      // 不使用const
      const: false
    }
  },
  mode: 'production',
  // webpack打包使用的loader
  module: {
    // 要加载的规则
    rules: [
      // 配置ts的loader
      {
        // 哪些文件
        test: /\.ts$/,
        // 使用的loader
        use: [
          // 配置babel
          {
            loader: 'babel-loader',
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      // 要兼容chrome 88版本，更多的可以接着写
                      "chrome": "88",
                      "ie": "11"
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方式，"usage"表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          // loader的执行顺序是从后往前的，需要先将ts转为js才能用js再转es5之类的
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      },
      // 设置less的loader
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // postcss(用于处理css的版本问题，如-webkit-、-ms-等前缀)
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugin: [
                  "postcss-preset-env",
                  {
                    browsers: "lase 2 version"
                  }
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 生成文件之前先清空dist文件夹
    new CleanWebpackPlugin(),
    // 自动生成html
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 设置引用模块,
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
}
class BannerWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('BannerWebpackPlugin', (compilation, callback) => {
            const extendsions = ["css", "js"];
            // 1. 获取即将输出的资源文件：compilation.assets
            // 2. 过滤只保留js和css资源
            const assets = Object.keys(compilation.assets).filter(assetPath => {
                const splitted = assetPath.split(".");
                const extension = splitted[splitted.length - 1];
                return extendsions.includes(extension);
            })
            const prefix = `/*
* Author: ${this.options.author}
*/            `;
            // 3. 遍历剩下资源加上注释
            assets.forEach(asset => {
                const source = compilation.assets[asset].source();
                
                compilation.assets[asset] = {
                    source() {
                        return prefix + source;
                    },
                    size() {
                        return content.length;
                    }
                }
            })

            callback();
        })
    }
}

module.exports = BannerWebpackPlugin;
class AnalyzeWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
            // 遍历所有文件得到大小
            const assets = Object.entries(compilation.assets);
            let content = `| 资源名称 ｜ 资源大小 ｜
| --- | --- |`;

            assets.forEach(([filename, file]) => {
                content += `\n| ${filename} | ${Math.round(file.size() / 1024)}kb |`;
            });
            // 生成一个md文件

            compilation.assets['analyze.md'] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                }
            }
        })
    }
}

module.exports = AnalyzeWebpackPlugin;
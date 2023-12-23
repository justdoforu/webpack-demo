class CleanWebpackPlugin {

    apply(compiler) {
        const outputPath = compiler.options.output.path;
        const fs = compiler.outputFileSystem;
        // 注册钩子，在打包输出之前emit
        compiler.hooks.emit.tap("CleanWebpackPlugin", (compilation)=> {

        })
        // 获取打包输出的目录

        // 通过fs删除打包输出的目录下的文件
        this.removeFiles(fs, outputPath);
    }

    removeFiles(fs, filepath) {
        // 读取当前目录的所有资源
        const files = fs.readdirSync(filepath);
        // 删除
        files.forEach(file => {
            // 判断是文件还是文件夹
            const path = `${filepath}/${file}`;
            const fileStat = fs.statSync(path);

            if(fileStat.isDirectory()) {
                this.removeFiles(fs, path);
            } else {
                fs.unlinkSync(path);
            }
        });
    }
}

module.exports = CleanWebpackPlugin;
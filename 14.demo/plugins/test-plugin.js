// 1. webpack加载webpack.config.js中所有配置，此时会new TestPlugin()，执行插件的constructor
// 2. webpack创建compiler对象
// 3. 遍历所有plugins中插件，调用插件的apply方法，
// 4. 执行剩下编译流程（触发各个hooks事件）
class TestPlugin {
    constructor() {
        console.log("TestPlugin constructor");
    }

    apply(compiler){
        debugger;
        console.log("TestPlugin apply");
        // environment 同步钩子，使用tab注册
        compiler.hooks.environment.tap("TestPlugin", ()=>{
            console.log("TestPlugin environment");
        })

        // emit 是异步串行钩子
        compiler.hooks.emit.tap("TestPlugin", (compilation)=>{
            console.log("TestPlugin emit");
        })

        compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback)=>{
            setTimeout(() => {
                console.log("TestPlugin emit callback");
                callback()
            })
        })

        compiler.hooks.emit.tapPromise("TestPlugin", (compilation)=>{
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("TestPlugin emit Promise");
                    resolve()
                }, 1000)
            })
        })

        // make是异步并行钩子
        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback)=>{
            setTimeout(() => {
                console.log("TestPlugin make callback111");
                callback()
            }, 3000)
        })

        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback)=>{
            setTimeout(() => {
                console.log("TestPlugin make callback222");
                callback()
            }, 1000)
        })

        compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback)=>{
            setTimeout(() => {
                console.log("TestPlugin make callback333");
                callback()
            }, 2000)
        })
    }
}

module.exports = TestPlugin;
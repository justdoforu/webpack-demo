// 同步loader
// module.exports = function(content) {
//     return content;
// }

// 方法二：如果有第二个loader要继续处理
module.exports = function(content, map, meta) {
    console.log("test1");
    // 第一个参数：err代表返回是否有错误
    this.callback(null, content, map, meta);
}
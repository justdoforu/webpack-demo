// raw loader 接收到的content是个buffer数据
module.exports = function(content) {
    console.log(content);
    return content;
}

module.exports.raw = true;
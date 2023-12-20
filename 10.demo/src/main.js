import { sum } from "./math";

console.log("hello main");
console.log(sum(1, 2, 3, 4, 5));

document.getElementById("btn").onclick = function () {
    // eslint会对动态导入语法报错，需要修改eslint配置文件
    // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
    // "math"将来就会作为[name]的值显示。
    import(/* webpackChunkName: "count" */ "./count.js").then(res => {
        console.log(res.default(2,1));
    }).catch(err => {
        console.log(err);
    });
};

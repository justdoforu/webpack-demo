module.exports = function (content) {
    // const script = `
    //     const styleEl = document.createElement('style');
    //     styleEl.innerHTML = ${JSON.stringify(content)};
    //     document.head.appendChild(styleEl);
    // `;

    // return script;
}

module.exports.pitch = function (remainingRequest) {
    // remainingRequest 剩下还需要处理的loader

    /*
        最终我们需要将remainingRequest中的路径转化成相对路径，webpack才能处理
        希望得到：../../node_modules/css-loader/dist/cjs.js!./index.css

        所以：需要将绝对路径转化成相对路径
        要求：
        1. 必须是相对路径
        2. 相对路径必须以 ./ 或 ../ 开头
        3. 相对路径的路径分隔符必须是 / ，不能是 \
    */
    console.log(remainingRequest);
    const relativeRequest = remainingRequest
        .split("!")
        .map((part) => {
            // 将路径转化为相对路径
            const relativePath = this.utils.contextify(this.context, part);
            return relativePath;
        })
        .join("!");

    const script = `
        import style from "!!${relativeRequest}"
        const styleEl = document.createElement('style')
        styleEl.innerHTML = style
        document.head.appendChild(styleEl)
      `;

    return script;
}
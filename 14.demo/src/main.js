import './index.css';
console.log("main js");

const sum = (...args) => {
    return args.reduce((a, b) => a + b, 0);
}
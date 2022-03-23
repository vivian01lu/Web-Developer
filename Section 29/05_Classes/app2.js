//---------------------My practice version:-----
//JavaScript Classes:
class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }

    innerRGB() {
        const { r, g, b } = this;
        return `${r},${g},${b}`;
    }
    //在class 中定义的方法：类似于：Color.prototype.greet =
    // greet() {
    //     return `Hello From ${this.name}!`
    // }
    rgb() {
        const { r, g, b } = this;
        return `rgb(${this.innerRGB()})`;
    }
    hex() {
        const { r, g, b } = this;
        return (
            '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    }
    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }

    //---------------if we do on console:  red.hex === white.hex then it's true
    //becasue then are the same function in prototype,而不是在individual instances


}

const c1 = new Color(255, 67, 89, 'tomatoes');
const white = new Color(255, 255, 255, 'white');


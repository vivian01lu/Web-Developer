class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
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
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h},${s}%,${l}%)`
    }
    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }

    //---------------if we do on console:  red.hex === white.hex then it's true
    //becasue then are the same function in prototype,而不是在individual instances
    calcHSL() {
        let { r, g, b } = this;//这里不能用const,因为the way the function is written,it is updating
        //这里应该要用let

        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.h = h;
        this.s = s;
        this.l = l;
    }
    opposite() {
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;//----------------！logic:
        return `hsl(${newHue},${s}%,${l}%)`
    }
    fullySaturated() {
        const { h, l } = this;//------------------为什么这里只用h和l:因为此时saturated是变量

        return `hsl(${h},100%,${l}%)`;
    }



}

const red = new Color(255, 67, 89, 'tomatoes');
const white = new Color(255, 255, 255, 'white');
const orange = new Color(230, 126, 34, 'Carrot');




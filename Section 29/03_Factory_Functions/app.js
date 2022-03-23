//-----------------------
// function hex(r, g, b) {
// 	return `rgb(${r},${b},${g})`;
// }
// function rgb(r, g, b) {
// 	return `rgb(${r},${g},${b})`;
// }
//-------------------------------------------------

function makeColor(r, g, b) {
	const color = {};//1：在方法内部建立一个对象
	color.r = r;
	color.g = g;
	color.b = b;
	//2：added some properties for this object

	//added some methods for this object
	color.rgb = function () {
		const { r, g, b } = this;
		//extract or destructure from r,g,b
		return `rgb(${r},${g},${b})`;
	};
	color.hex = function () {//Stored the method in the object
		const { r, g, b } = this;
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	return color;//3：最后返回这个对象
}
const firstColor = makeColor(35, 255, 150);
firstColor.rgb();

//这样的话就不用写成 hex( , , )无需传参数而是直接用firstColor.hex()直接调用方法了
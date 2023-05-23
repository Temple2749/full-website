const hueInput = document.getElementById('hue');
const saturationInput = document.getElementById('saturation');
const lightnessInput = document.getElementById('lightness');
const generateBtn = document.getElementById('generate-btn');
const colorBox = document.getElementById('color-box');

generateBtn.addEventListener('click', generateColor);

function generateColor() {
	const hueValue = hueInput.value;
	const saturationValue = saturationInput.value;
	const lightnessValue = lightnessInput.value;
	const color = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;

	colorBox.style.backgroundColor = color;
}

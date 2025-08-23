import { circumference } from "./src/utils/mathUtils.js";
const radius = document.getElementById("radius");
const result = document.getElementById("result");
document.getElementById("calculate").addEventListener("click", () => {
    const r = parseFloat(radius.value);
    result.textContent = `Circumference: ${circumference(r).toFixed(2)}`;
});
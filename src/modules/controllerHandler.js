import { particleCount } from "./globalVariables";

document.getElementById("particle-count").addEventListener('input', () => {
    const input = document.getElementById("particle-count");
    updateOutput(input);
    particleCount = input.value;
});

function updateOutput(input) {
    const output = document.querySelector(`output[for=${input.id}]`);
    output.value = input.value;
}
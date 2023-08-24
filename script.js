const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
let targetElement = null;

document.addEventListener('mousedown', (event) => {
    if (event.target === hourHand || event.target === minuteHand) {
        targetElement = event.target;
    }
});

document.addEventListener('mousemove', (event) => {
    if (targetElement) {
        const clock = targetElement.closest('svg');
        const rect = clock.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const atan = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        const deg = atan * (180 / Math.PI);
        targetElement.setAttribute('transform', `rotate(${deg + 90}, 50, 50)`);
    }
});

document.addEventListener('mouseup', () => {
    targetElement = null;
});

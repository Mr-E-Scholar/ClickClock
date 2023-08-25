const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
let targetElement = null;
let dragging = false;

document.addEventListener('mousedown', (event) => {
    if (event.target === hourHand || event.target === minuteHand) {
        targetElement = event.target;
        dragging = true;
    }
});

document.addEventListener('mousemove', (event) => {
    if (dragging && targetElement) {
        const clock = targetElement.closest('svg');
        const rect = clock.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const atan = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        const deg = atan * (180 / Math.PI);
        targetElement.setAttribute('transform', `rotate(${deg + 90}, 50, 50)`);
    }
});

function endDrag() {
    dragging = false;
    if (targetElement) {
        const hour = getCurrentTimeFromRotation(hourHand);
        const minute = getCurrentTimeFromRotation(minuteHand);
        
        if (hour === 3 && minute === 15) {
            alert("The time is set to 3:15!");
        }
    }
    targetElement = null;
}

window.addEventListener('mouseup', endDrag);

function getCurrentTimeFromRotation(element) {
    const transformString = element.getAttribute('transform');
    const match = /rotate\(([^,]+),/.exec(transformString);
    let rotation = parseFloat(match[1]) % 360;
    if (rotation < 0) rotation += 360;
    if (element === hourHand) {
        return Math.round(rotation / 30) % 12;
    } else if (element === minuteHand) {
        return Math.round(rotation / 6) % 60;
    }
}


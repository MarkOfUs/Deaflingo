document.addEventListener('DOMContentLoaded', () => {
    const moveArea = document.querySelector('.green_monkey_move-area');
    const eyes = Array.from(document.querySelectorAll('.green_monkey_eye'));

    if (!moveArea || eyes.length === 0) {
        return;
    }

    moveArea.addEventListener('mousemove', (event) => {
        for (const eye of eyes) {
            const rect = eye.getBoundingClientRect();
            const x = rect.left + (rect.width / 2);
            const y = rect.top + (rect.height / 2);
            const rad = Math.atan2(event.clientX - x, event.clientY - y);
            const rot = (rad * (180 / Math.PI) * -1) + 45;
            eye.style.transform = `rotate(${rot}deg)`;
        }
    });
});

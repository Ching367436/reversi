let img = document.querySelector('img'),
    current = 0;
const imgs = ['./images/1.webp', './images/2.webp', './images/3.webp', './images/4.webp', './images/5.webp', './images/6.webp', './images/7.webp', './images/8.webp', './images/9.webp'];

img.addEventListener('click', function (e) {
    if (e.offsetX >= this.offsetWidth / 2) {
        if (++current >= imgs.length) { current = 0; }
        img.src = imgs[current];
    } else {
        if (--current < 0) { current = imgs.length - 1; }
        img.src = imgs[current];
    }
});

// keyboard
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (++current >= imgs.length) { current = 0; }
        img.src = imgs[current];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (--current < 0) { current = imgs.length - 1; }
        img.src = imgs[current];
    }
});

for (let i = 1; i < imgs.length; ++i) {
    const tmp = document.createElement("link");
    tmp.rel = "preload";
    tmp.href = imgs[i];
    tmp.as = "image";
    tmp.type = "image/webp";
    document.head.appendChild(tmp);
}
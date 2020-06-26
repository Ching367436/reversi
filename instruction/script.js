let img = document.querySelector('img'),
    current = 0;
const imgs = ['./alpha_beta_pruning/1.webp', './alpha_beta_pruning/2.webp', './alpha_beta_pruning/3.webp', './alpha_beta_pruning/4.webp', './alpha_beta_pruning/5.webp', './alpha_beta_pruning/6.webp', './alpha_beta_pruning/7.webp', './alpha_beta_pruning/8.webp', './alpha_beta_pruning/9.webp'];

img.addEventListener('click', function (e) {
    if (e.offsetX >= this.offsetWidth / 2) {
        if (++current >= imgs.length) { current = 0; }
        img.src = imgs[current];
    } else {
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
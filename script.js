const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
        mouse.y = e.clientY;
});


class Shape {
    constructor(id, ease, mode) {
        this.el = document.getElementById(id);
        this.x = 0; this.y = 0;
        this.ease = ease;
        this.mode = mode;
        this.originX = this.el.offsetLeft + this.el.offsetWidth / 2;
        this.originY = this.el.offsetTop + this.el.offsetHeight / 2;
    }

    update() {
        let targetX, targetY;

        if (this.mode === 'follow') {
            targetX = mouse.x - this.originX;
            targetY = mouse.y - this.originY;
        } 
        else if (this.mode === 'elastic') {
            targetX = (mouse.x - window.innerWidth / 2) * 0.3;
            targetY = (mouse.y - window.innerHeight / 2) * 0.3;
        }
        else if (this.mode === 'axial') {
            let dist = (mouse.x - window.innerWidth / 2) * 0.5;
            targetX = dist;
            targetY = dist * -0.5;
        }
        else if (this.mode === 'flee') {
            const dx = mouse.x - (this.originX + this.x);
            const dy = mouse.y - (this.originY + this.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
            targetX = this.x - (dx / distance) * 100;
            targetY = this.y - (dy / distance) * 100;
        } else {
            targetX = 0;
            targetY = 0;
            }
        }

        this.x += (targetX - this.x) * this.ease;
        this.y += (targetY - this.y) * this.ease;

        this.el.style.transform = `translate(${this.x}px, ${this.y}px) ${this.el.style.transform.replace(/translate\(.*?\)/, '')}`;
    }   
}

shapes = [
    new Shape('circle', 0.02, 'follow'),
    new Shape('square', 0.1, 'elastic'),
    new Shape('plank1', 0.05, 'axial'),
    new Shape('plank2', 0.04, 'axial'),
    new Shape('tri1', 0.15, 'flee'), 
    new Shape('tri2', 0.12, 'flee'),
    new Shape('tri3', 0.18, 'flee'),
    new Shape('tri4', 0.2, 'flee')
];

//reintialize shapes when dom size changes
window.addEventListener('resize', () => {
    shapes = [
        new Shape('circle', 0.02, 'follow'),
        new Shape('square', 0.1, 'elastic'),
        new Shape('plank1', 0.05, 'axial'),
        new Shape('plank2', 0.04, 'axial'),
        new Shape('tri1', 0.15, 'flee'), 
        new Shape('tri2', 0.12, 'flee'),
        new Shape('tri3', 0.18, 'flee'),
        new Shape('tri4', 0.2, 'flee')
    ];
});

function animate() {
    shapes.forEach(s => s.update());
    requestAnimationFrame(animate);
}

document.getElementById('statement-btn').onclick = () => {
    document.getElementById('modal').style.display = 'block';
};

animate();

// Initialize values
let sweat = 64.0;
let temp = 37.0;
let heart = 80;
let impedance = 450;

// Gather DOM nodes
document.addEventListener('DOMContentLoaded', () => {
    const sweatEl = document.getElementById("sweatVal");
    const tempEl = document.getElementById("tempVal");
    const heartEl = document.getElementById("heartVal");
    const impedanceEl = document.getElementById("impedanceVal");
    
    const statusVal = document.getElementById("statusVal");
    const warningIcon = document.getElementById("warningIcon");
    const criticalAlert = document.getElementById("criticalAlert");

    // Dynamic state evaluation logic
    function evaluateHealthLimits() {
        if (sweat > 80 || temp > 38) {
            statusVal.innerText = "SEVERE DEHYDRATION";
            statusVal.className = "status-value status-severe";
            warningIcon.classList.remove("hidden");
            criticalAlert.classList.add("show");
        } else if (sweat > 65 || temp > 37.5) {
            statusVal.innerText = "MILD DEHYDRATION";
            statusVal.className = "status-value status-mild";
            warningIcon.classList.add("hidden");
            criticalAlert.classList.remove("show");
        } else {
            statusVal.innerText = "NORMAL";
            statusVal.className = "status-value status-normal";
            warningIcon.classList.add("hidden");
            criticalAlert.classList.remove("show");
        }
    }

    // Interval to actively change random simulations smoothly triggering limits appropriately
    setInterval(() => {
        sweat += (Math.random() * 2.0 - 0.5);   
        temp += (Math.random() * 0.2 - 0.05);   
        heart += Math.floor(Math.random() * 5 - 2); 
        impedance -= Math.floor(Math.random() * 15);
        
        // Looping variables if limit achieved so user can enjoy full test spectrum
        if (sweat > 85) sweat = 60.0;
        if (temp > 38.6) temp = 36.6;
        if (heart > 115) heart = 72;
        if (heart < 60) heart = 72;
        if (impedance < 150) impedance = 550;

        sweatEl.innerText = sweat.toFixed(1);
        tempEl.innerText = temp.toFixed(1);
        heartEl.innerText = heart;
        impedanceEl.innerText = impedance;
        
        evaluateHealthLimits();
    }, 2000);

    evaluateHealthLimits();
    setupCanvas();
});

// Clean floating red particles system script running un-intrusively in canvas
function setupCanvas() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(255, 26, 26, ${Math.random() * 0.2 + 0.05})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 60; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}

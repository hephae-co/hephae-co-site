import React, { useEffect, useRef, useState } from 'react';

export const OptimizationBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [isPopping, setIsPopping] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        let particles: Packet[] = [];
        let effects: (ParticleExplosion | FloatingText)[] = [];
        let animationFrameId: number;
        const gridSize = 60;

        // Define Bubble Types
        const bubbleTypes = [
            { color: 'rgba(59, 130, 246, 0.6)', value: 10, speedMult: 1, weight: 0.7 },   // Blue
            { color: 'rgba(16, 185, 129, 0.6)', value: 25, speedMult: 1.5, weight: 0.9 }, // Green
            { color: 'rgba(168, 85, 247, 0.6)', value: 50, speedMult: 2.2, weight: 1.0 }  // Purple
        ];

        class Packet {
            x: number = 0;
            y: number = 0;
            color: string = '';
            value: number = 0;
            speedMult: number = 0;
            direction: 'X' | 'Y' = 'X';
            speed: number = 0;
            life: number = 0;
            maxLife: number = 0;
            size: number = 0;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;

                const rand = Math.random();
                let type = bubbleTypes[0];
                if (rand > 0.9) type = bubbleTypes[2];
                else if (rand > 0.7) type = bubbleTypes[1];

                this.color = type.color;
                this.value = type.value;
                this.speedMult = type.speedMult;

                this.direction = Math.random() > 0.5 ? 'X' : 'Y';
                this.speed = ((Math.random() * 0.5) + 0.2) * this.speedMult;

                this.life = 0;
                this.maxLife = Math.random() * 200 + 100;
                this.size = Math.random() * 3 + 3;
            }

            update() {
                this.life++;
                if (this.direction === 'X') this.x += this.speed;
                else this.y += this.speed;

                if (this.life > this.maxLife || this.x > width || this.y > height) {
                    this.reset();
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                ctx.moveTo(this.x, this.y);
                const trailLen = this.speed * 15;
                if (this.direction === 'X') ctx.lineTo(this.x - trailLen, this.y);
                else ctx.lineTo(this.x, this.y - trailLen);
                ctx.stroke();
            }
        }

        class ParticleExplosion {
            x: number;
            y: number;
            color: string;
            particles: { x: number; y: number; vx: number; vy: number; life: number }[];
            done: boolean = false;

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.particles = [];
                for (let i = 0; i < 8; i++) {
                    this.particles.push({
                        x: 0,
                        y: 0,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        life: 1.0
                    });
                }
            }

            update() {
                let activeCount = 0;
                this.particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.05;
                    if (p.life > 0) activeCount++;
                });
                if (activeCount === 0) this.done = true;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                this.particles.forEach(p => {
                    if (p.life <= 0) return;
                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                });
                ctx.restore();
            }
        }

        class FloatingText {
            x: number;
            y: number;
            text: string;
            color: string;
            life: number = 1.0;
            done: boolean = false;

            constructor(x: number, y: number, text: string, color: string) {
                this.x = x;
                this.y = y;
                this.text = text;
                this.color = color.replace('0.6)', '1)');
            }

            update() {
                this.y -= 1;
                this.life -= 0.02;
                if (this.life <= 0) this.done = true;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.font = 'bold 16px Inter, sans-serif';
                ctx.fillText(this.text, this.x + 10, this.y);
                ctx.restore();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.floor((width * height) / 12000);
            for (let i = 0; i < count; i++) {
                particles.push(new Packet());
            }
        };

        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.lineWidth = 1;

            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            drawGrid();

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            for (let i = effects.length - 1; i >= 0; i--) {
                effects[i].update();
                // @ts-ignore - Common method
                effects[i].draw(ctx);
                if (effects[i].done) {
                    effects.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            let isHovering = false;
            particles.forEach(p => {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                if (dx * dx + dy * dy < 400) isHovering = true;
            });

            canvas.style.cursor = isHovering ? 'pointer' : 'default';
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            particles.forEach(p => {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                if (dx * dx + dy * dy < 900) {
                    effects.push(new ParticleExplosion(p.x, p.y, p.color));
                    effects.push(new FloatingText(p.x, p.y, `+${p.value}`, p.color));
                    p.reset();

                    setScore(prev => prev + p.value);
                    setIsPopping(true);
                    setTimeout(() => setIsPopping(false), 100);
                }
            });
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full bg-white overflow-hidden">
            <div className="absolute top-24 right-8 pointer-events-none select-none z-10 flex flex-col items-end gap-1">
                <div className="text-slate-400 text-xs font-bold tracking-[0.2em]">OPTIMIZATION SCORE</div>
                <div
                    className={`text-blue-600 text-3xl font-black transition-transform duration-100 ${isPopping ? 'scale-150' : 'scale-100'}`}
                >
                    {score.toLocaleString()}
                </div>
            </div>
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

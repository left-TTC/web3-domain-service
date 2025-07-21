export interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
}

export class Starfield {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    stars: Star[] = [];
    width: number;
    height: number;
    maxStars: number;
    speedMultiplier: number = 1;
    animationId: number | null = null;
    isAnimating: boolean = true;

    constructor(container: HTMLElement, width: number, height: number, maxStars = 100) {
        this.width = width;
        this.height = height;
        this.maxStars = maxStars;

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        container.appendChild(this.canvas);

        const ctx = this.canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context not supported');
        this.ctx = ctx;

        this.initStars();
        this.startAnimation();
    }

    private initStars() {
        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push(this.createStar(Math.random() * this.width));
        }
    }

    private createStar(x: number): Star {
        return {
            x,
            y: Math.random() * this.height,
            size: Math.random() * 3 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
        };
    }

    public changeSpeed(multiplier: number) {
        this.speedMultiplier = multiplier;
    }

    private startAnimation() {
        if (!this.isAnimating) return;
        
        const animate = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);

            for (let i = this.stars.length - 1; i >= 0; i--) {
                const star = this.stars[i];
                star.x -= star.speed * this.speedMultiplier;

                if (star.x + star.size < 0) {
                    this.stars.splice(i, 1);
                    this.stars.push(this.createStar(this.width + Math.random() * 50));
                    continue;
                }

                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(
                    star.x - star.size/2,  
                    star.y - star.size/2,  
                    star.size,             
                    star.size             
                );
            }

            this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
    }

    public destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.canvas.remove();
    }
}
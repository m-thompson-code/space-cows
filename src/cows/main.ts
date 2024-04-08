import { loadedAssets } from "./assets";
import { canvas } from "./canvas";
import { Cow, cows } from "./cow";
import { setupCanvas } from "./render";

export let limit = 50;

// source: https://quickref.me/check-if-a-point-is-inside-a-rectangle.html
const pointIsInRectangle = (point: { x: number; y: number }, rect: { top: number; left: number; right: number; bottom: number }) =>
    point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom;

const getPosition = (image: HTMLImageElement, cow: Cow) => {
    const width = image.width * cow.scale;
    const height = image.height * cow.scale;

    const x = -width + (width + canvas.width) * cow.x;
    const y = -height + (height + canvas.height) * cow.y;

    return { x, y, width, height };
};

export const renderCows = (onClick?: (event: MouseEvent, cow: Cow) => void) => {
    loadedAssets.then(([image]) => {
        canvas.addEventListener("click", (event) => {    
            // // Ignore double clicks
            // if (event.buttons !== 1) {
            //     return;
            // }
    
            const cow = cows.find((cow) => {
                const { x: cowX, y: cowY, width, height } = getPosition(image, cow);
    
                const rectangle = {
                    left: cowX,
                    top: cowY,
                    right: cowX + width,
                    bottom: cowY + height,
                };
    
                return pointIsInRectangle(event, rectangle);
            });
    
            if (cow) {
                limit = limit + 5;
                onClick?.(event, cow);
            }
        });
    });

    while (cows.length < limit) {
        new Cow(Math.random()); // Cows are added to array naturally through constructor
    }

    setupCanvas(canvas, (ctx: CanvasRenderingContext2D, assets: HTMLImageElement[]) => {
        const [image] = assets;

        while (cows.length < limit) {
            new Cow(); // Cows are added to array naturally through constructor
        }

        [...cows]
            .sort((a, b) => {
                return a.scale - b.scale;
            })
            .forEach((cow) => {
                if (cow.should.delete()) {
                    cow.delete();
                } else {
                    cow.move();

                    const { x, y, width, height } = getPosition(image, cow);

                    ctx.drawImage(image, x, y, width, height);
                }
            });
    });
};

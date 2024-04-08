import { loadedAssets } from "./assets";

let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;
// let frame = 0;

const animate = async (canvas: HTMLCanvasElement, render: () => void) => {
    window.requestAnimationFrame(() => animate(canvas, render));

    const msNow = window.performance.now();
    const msPassed = msNow - msPrev;

    if (msPassed < msPerFrame) return;

    const excessTime = msPassed % msPerFrame;
    msPrev = msNow - excessTime;

    // frame++;

    render();
};

export const setupCanvas = async (
    canvas: HTMLCanvasElement,
    render: (ctx: CanvasRenderingContext2D, assets: HTMLImageElement[]) => void,
) => {
    const ctx = canvas.getContext("2d")!;

    const assets = await loadedAssets;

    animate(canvas, () => {
        ctx.reset();

        render(ctx, assets);
    });
};

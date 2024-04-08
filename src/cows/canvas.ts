export const canvas = document.getElementById("cows-canvas") as HTMLCanvasElement;

const setCanvasSize = (canvas: HTMLCanvasElement): void => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const initializeCanvas = (canvas: HTMLCanvasElement): void => {
    setCanvasSize(canvas);

    window.addEventListener('resize', () => {
        setCanvasSize(canvas);
    });
};

void initializeCanvas(canvas);

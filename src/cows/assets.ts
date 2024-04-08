const filenames = ["spaceship.png"];

const images = filenames.map((filename) => {
    const image = new Image();

    image.src = filename;

    return image;
});

const loadAssets = (): Promise<HTMLImageElement[]> => {
    return Promise.all(
        images.map(
            (image) =>
                new Promise((resolve: (value: HTMLImageElement) => void) => {
                    image.addEventListener("load", () => {
                        resolve(image);
                    });
                }),
        ),
    );
};

export const loadedAssets = loadAssets();

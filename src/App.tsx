import { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import { Cow, limit, renderCows } from "./cows";
import { canvas } from "./cows/canvas";
import { WhitUrl } from "./whit-url/WhitUrl";

const moo = (scale: number) => {
    const moo = document.getElementById("moo-audio") as HTMLAudioElement;

    moo.volume = 0.15 + .25 * scale;
    moo.currentTime = 0;
    moo.play();
};

let forceUpdate: null | (() => void) = null;

const onClick = (event: MouseEvent, cow: Cow) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("moo");
    moo(cow.scale);
    forceUpdate?.();
};

renderCows(onClick);

const Canvas = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // const wrapper = document.getElementById('wrapper')!;
        wrapperRef.current!.appendChild(canvas);
    });
    return <div ref={wrapperRef}></div>;
};

const Count = () => {
    const [, updateState] = useState<unknown>();
    forceUpdate = useCallback(() => updateState({}), []);

    return <span>{limit}</span>;
};

const App = () => {
    return (
        <>
            <Count />
            <WhitUrl />
            <img style={{ zIndex: -1, top: `5%`, right: `5%` }} className="earth" src="/earth.png" />
            <Canvas />
        </>
    );
};

export default App;

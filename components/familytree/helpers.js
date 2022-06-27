import { useCallback, useState } from "react";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const [dimensions, setDimensions] = useState();
    console.log('In Function')
    // const temp = document.getElementById("foo").getBoundingClientRect();
    const isBrowser = typeof window !== "undefined";

    console.log('Bounding Element Values ', isBrowser)
    const containerRef = useCallback((containerElem) => {
        console.log('Container Element', containerElem)
        if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        console.log('Width & heigth :', width, height)
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 2 });
        }
    }, []);
    console.log('In functions : ', dimensions)
    return [dimensions, translate, containerRef];
};
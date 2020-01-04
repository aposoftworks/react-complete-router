//core
import React from '../node/react';

//helpers
import Trail    from "./Trail";
import Vector2  from "./Vector2";

export default function Digital () {

    //----------------------------
    // Properties
    //----------------------------

    //states
    const [canvasElement, setCanvasElement] = React.useState();
    const [canvas, setCanvas]               = React.useState();
    const [trails, settrails]               = React.useState([]);
    
    //----------------------------
    // Callback
    //----------------------------

    const renderFrame = React.useCallback(() => {
        if (!canvas || !canvasElement || trails.length === 0) return;

        //Clear canvas
        canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

        //Call all stars to update their animation
        for (let i = 0; i < trails.length; i++) {
            trails[i].draw();
        }

        //Loop function
        setTimeout(renderFrame, 30);
    }, [canvas, canvasElement, trails]);

    //----------------------------
    // Effects
    //----------------------------

    //On mount
    React.useEffect(() => {
        setCanvasElement(document.querySelector("canvas"));
        setCanvas(document.querySelector("canvas").getContext("2d"));
    }, []);

    //Start canvas
    React.useEffect(() => {
        if (!canvas || !canvasElement) return;

        let temptrails = [];

        //Spawn stars
        for (let i = 0; i < 80; i++) {
            const size      = 1;
            const colorUsed = "lightgray";
            const position  = new Vector2(window.innerWidth * Math.random(), window.innerHeight * Math.random());
            const booldir   = Math.random() > 0.5;
            const booldird  = (Math.random() > 0.5) ? 2 : -2;
            const direction = new Vector2(booldir === true ? booldird : 0, booldir === false ? booldird : 0);
            const speed     = Math.random() / 2 + 2;
            const trailSize = Math.random() * 30 + 5;

            //Instantiate trail
            temptrails.push(new Trail(size, colorUsed, position, direction, trailSize, speed, canvas, canvasElement));
        }

        settrails(temptrails);

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ///                                          ///
        ///               Initialize                 ///
        ///                                          ///
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        //Set canvas size
        document.querySelector("canvas").width = window.innerWidth - 1;
        document.querySelector("canvas").height = window.innerHeight - 1;
    }, [canvas, canvasElement]);

    //Wait for trails to be ready
    React.useEffect(() => {
        if (trails.length === 0) return;

        //Start animation
        renderFrame();
    }, [trails]);

    //----------------------------
    // Render
    //----------------------------

    return (
        <canvas id="canvas" />
    );
}
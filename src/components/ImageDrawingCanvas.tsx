import React, {useRef, useState} from 'react';
import {ImageDrawingCanvasProps} from "../types/ImageDrawingCanvas.types.ts";
import "../styles/ImageDrawingCanvas.css"

const ImageDrawingCanvas = ({ imgSrc }: ImageDrawingCanvasProps) => {
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null)

    if (!imgSrc) return <p className="no-imgSrc-message">No image source passed, please add an image source to draw</p>

    function handleImageLoad() {
        const canvas = canvasRef.current;
        if (!canvas) throw new Error(canvasErrorMsg)

        const context = canvas.getContext("2d");
        if (!context) throw new Error(contextErrorMsg)

        if (!imageRef.current) throw new Error(imageErrorMsg)

        const {
            top,
            bottom,
            left,
            right
        } = imageRef.current.getBoundingClientRect()

        canvas.style.top = top.toString()
        canvas.style.bottom = bottom.toString()
        canvas.style.left = left.toString()
        canvas.style.right = right.toString()
        canvas.width = imageRef.current.clientWidth
        canvas.height = imageRef.current.clientHeight

        context.lineWidth = 4;
        context.lineCap = "square";
        context.strokeStyle = "yellow";

        contextRef.current = context;
    }

    function startDrawing (mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if (!contextRef.current) throw new Error(contextErrorMsg)

        const { nativeEvent } = mouseEvent
        nativeEvent.preventDefault();

        const { offsetX, offsetY } = nativeEvent;

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();

        setIsDrawing(true);
    }

    function draw (mouseEvent: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        if (!contextRef.current) throw new Error(contextErrorMsg)

        if (!isDrawing) return

        const { nativeEvent } = mouseEvent
        nativeEvent.preventDefault();

        const { offsetX, offsetY } = nativeEvent;

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    function stopDrawing () {
        if (!contextRef.current) throw new Error(contextErrorMsg)

        contextRef.current.closePath();
        setIsDrawing(false);
    }

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                className="canvas-styles"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />

            <img
                ref={imageRef}
                src={imgSrc}
                className="img-styles"
                alt="canvas-image"
                width="50%"
                height="50%"
                onLoad={handleImageLoad}
            />
        </div>
    )
}

const canvasErrorMsg = "Could not get canvas, please try again!"
const contextErrorMsg = "Could not get canvas context, please try again!"
const imageErrorMsg = "Image ref not available, please try again!"

export default ImageDrawingCanvas;
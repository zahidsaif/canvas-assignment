import ImageDrawingCanvas from "./ImageDrawingCanvas.tsx";
import roofImage from "../assets/roof.webp"
import "../styles/App.css"

function App() {
    return (
        <>
            <h1 className="main-heading">Canvas Assignment</h1>
            <ImageDrawingCanvas imgSrc={roofImage} />
        </>
    )
}

export default App

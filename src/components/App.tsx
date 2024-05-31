import ImageDrawingCanvas from "./ImageDrawingCanvas.tsx";
import "../styles/App.css"

function App() {
    return (
        <>
            <h1 className="main-heading">Canvas Assignment</h1>
            <ImageDrawingCanvas imgSrc="/src/assets/roof.webp" />
        </>
    )
}

export default App

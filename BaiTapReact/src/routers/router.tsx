import { Routes, Route } from "react-router-dom";
import ColorBars from "../pages/CanvasBars";
import CanvasCircle from "../pages/CanvasCircle";
import NavBar from "../layouts/commponets/navBar";

const TeacherRoutes = () => {
  return (
    <>
    
    <NavBar />
    <Routes>
            
        <Route path="/video1" element={<CanvasCircle />} />
        <Route path="/video2" element={<ColorBars />} />
     
    </Routes>
    </>
  );
};

export default TeacherRoutes;
import Vender from "./pages/Vender";
import Home from "./pages/Home";
import Navigation from "./components/Navbar";
import { BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Vender" element={<Vender />}/>
      </Routes>
      </BrowserRouter>      
    </>
  );
}

export default App;

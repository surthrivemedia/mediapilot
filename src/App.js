import { BrowserRouter as Router } from "react-router-dom"; 
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AnimatedRoutes from "./Pages/AnimatedRoutes";
import "./Styles/Main.scss";

function App() {
  return (
    <div className="App">
    
    <Router>
      
      <Navbar />

          <AnimatedRoutes />

      <Footer />

    </Router>

    </div>
  );
}

export default App;

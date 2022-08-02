import "./App.css";
import Customer from "./pages/customer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/customers" element={<Customer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

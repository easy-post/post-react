import "./scss/App.scss";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

import ApiAdress from "./constants/ApiAddress";
import axios from "axios";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      axios.get(`${ApiAdress.LOCAL}/logout`);
    });
  }, []);

  


  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

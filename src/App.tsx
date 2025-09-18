import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MultistepForm from "./components/MultistepForm/MultistepForm";


function App() {
  const itemHeader = [
    "Share details",
    "Get quotes",
    "Compare"
  ]
  const [headerActive, setHeaderActive] = useState(0);
  return (
    <>
      <Header itemHeader={itemHeader} headerActive={headerActive} />
      <MultistepForm setHeaderActive={setHeaderActive} />
      <Footer />
    </>
  );
}

export default App;

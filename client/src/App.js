import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PirateList from "./components/PirateList";
import PirateForm from "./components/PirateForm";
import Details from "./components/Details";

const App = (props) => {
  const [pirate, setPirate] = useState([]);
  const [update, setUpdate] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PirateList
                pirate={pirate}
                setPirate={setPirate}
                update={update}
              />
            }
            path="/"
            default
          />
          <Route
            element={
              <PirateForm
                pirate={pirate}
                setPirate={setPirate}
                update={update}
                setUpdate={setUpdate}
              />
            }
            path="/pirates/new"
          />
          <Route
            element={
              <Details
                pirate={pirate}
                setPirate={setPirate}
                update={update}
                setUpdate={setUpdate}
              />
            }
            path="/pirates/:id"
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App; // Bruno Skëndaj

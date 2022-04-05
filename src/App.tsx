import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/Home";

const RoutesMap = [
  {
    path: "/",
    element: <HomePage />,
  },
];

function App() {
  return (
    <React.Fragment>
      <Routes>
        {RoutesMap.map((item, i) => (
          <Route
            key={`${item.path}_${i}`}
            path={item.path}
            element={item.element}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App;

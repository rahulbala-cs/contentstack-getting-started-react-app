import "./styles/App.css";
import React from "react";
import AppRoutes from "./routes";
import LivePreviewStatus from "./components/VisualExperience";

function App() {
  return (
    <>
      <AppRoutes />
      {/* Live Preview Status Panel - shows debugging information */}
      <LivePreviewStatus />
    </>
  );
}

export default App;

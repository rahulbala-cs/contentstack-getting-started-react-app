import "./styles/App.css";
import React from "react";
import AppRoutes from "./routes";
import VisualExperience from "./components/VisualExperience";

function App() {
  return (
    <>
      <AppRoutes />
      {/* Visual Experience Panel - only shows in development or when Live Preview is active */}
      {(process.env.NODE_ENV === 'development' || (window as any).__CONTENTSTACK_LIVE_PREVIEW_INITIALIZED__) && (
        <VisualExperience />
      )}
    </>
  );
}

export default App;

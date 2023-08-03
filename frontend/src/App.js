import React, { useState } from "react";
import "./App.css";
import HeaderSearchBar from "./Components/HeaderSearchBar";
import PhotoGallery from "./Components/PhotoGallery";

function App() {
  const [imgs, setImgs] = useState("");
  return (
    <div className="App">
      <HeaderSearchBar
        onImgRecive={(e) => {
          setImgs(e);
        }}
      />
      {imgs && <PhotoGallery imgGallery={imgs} />}
    </div>
  );
}

export default App;

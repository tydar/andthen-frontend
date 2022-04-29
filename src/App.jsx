import MenuDrawer from "./Components/MenuDrawer.jsx";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <MenuDrawer loggedIn={loggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </div>
  );
}

export default App;

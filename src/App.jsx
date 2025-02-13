import { useState } from "react";
import "./App.css";
import PostsList from "./components/PostsList";

function App() {

  const [Toggle,setToggle] = useState(true);

  return (
    <div>
      <h1>Tanstack Query </h1>
      <button onClick={()=>setToggle(!Toggle)} >Toggle</button>
      {Toggle && <PostsList/>}
    </div>
  );
}

export default App;

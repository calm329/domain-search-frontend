import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main_Page from "./modules";
import Search from "./modules/Search/search";

function App() {
  return (
    <div className=""  >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_Page/>}/>
          <Route path="/search/:keyword?" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

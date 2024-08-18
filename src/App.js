import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./modules";
import Search from "./modules/Search/search";

function App() {
  return (
    <div className=""  >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search/:keyword?" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

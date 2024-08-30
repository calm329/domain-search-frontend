import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./modules";
import Search from "./modules/Search/search";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search/:keyword?" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;

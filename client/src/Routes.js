import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Homepage from "./pages/Homepage/Homepage"
import Navbar from "./components/Navbar/Navbar"
import CreateDog from "./pages/CreateDog/CreateDog"
import DetailsDog from "./pages/DetailsDog/DetailsDog"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <LandingPage /> } />
        <Route path='/' element={ <Navbar /> }>
          <Route path='home' element={ <Homepage /> } />
          <Route path='create' element={ <CreateDog /> } />
          <Route path='details/:id' element={ <DetailsDog /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

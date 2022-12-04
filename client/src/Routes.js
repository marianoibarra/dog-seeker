import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Homepage from "./components/Homepage/Homepage"
import Navbar from "./components/Navbar/Navbar"
import CreateDog from "./components/CreateDog/CreateDog"
import DetailsDog from "./components/DetailsDog/DetailsDog"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <LandingPage /> } />
        <Route path='/' element={ <Navbar /> }>
          <Route index element={ <Homepage /> } />
          <Route path='home' element={ <Homepage /> } />
          <Route path='create' element={ <CreateDog /> } />
          <Route path='details/:id' element={ <DetailsDog /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

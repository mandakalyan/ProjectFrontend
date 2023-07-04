import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CalendarComponent from "./components/Wfo/Wfo";
import { ArchievedEntries } from "./components/Wfo/ArchievedEntries";
import RequestsPage from "./components/Wfo/Request";
import { WfoPage } from "./pages/WfoPage/WfoPage";
import Datatable from "./components/datatable/Datatable";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />}
             />
              <Route path="/wfo" element={<WfoPage/>}/>
          <Route path="/archievedlist" element={<ArchievedEntries/>}></Route>
          <Route path="/requests" element={<RequestsPage/>}></Route>

            <Route path="dashboard" element={<Home />} />
            <Route path="details" element={<Datatable/>}/>
             
            {/* <Route path="users">
              <Route path="list"  element={<List />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

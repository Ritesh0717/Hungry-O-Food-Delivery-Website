import *as React from "react";

import { Route, Routes} from "react-router-dom";
import {Header} from "./components";
import {MainContainer, CreateContainer} from './components';
import {AnimatePresence} from "framer-motion";

const App = () =>{
  return (
  <AnimatePresence exitBeforeEnter>
  <div className="w-screen h-auto flex flex-col bg-primary">
    <Header />
    <main className="mt-20 px-16 py-4 w-full ">
      <Routes>
        <Route path="/*" element={<MainContainer />} />
        <Route path="/createItem" element={<CreateContainer />} />
      </Routes>

    </main>
  </div>;
  </AnimatePresence>);

};

export default App;
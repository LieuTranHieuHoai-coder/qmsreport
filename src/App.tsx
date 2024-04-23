import React, { useState } from "react";
import Logo from "./QMSLogo.png";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { MegaMenu } from "primereact/megamenu";
import Navbar from "./types/Navbar";
import DataTablePrime from "./Pages/DataTablePrime";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "jquery/dist/jquery";

const App: React.FC = () => {

  return (
    <>
      <MegaMenu 
        model={Navbar}
      />
      <DataTablePrime />
    </>
  );
};

export default App;

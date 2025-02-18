import React from "react";
import Header from "../components/Header";

function MainLayout({ Children }) {
  return (
    <div className="max-w-1440 mx-auto flex">
      <Header />
      {Children}
    </div>
  );
}

export default MainLayout;

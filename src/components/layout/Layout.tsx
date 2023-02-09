import React, { useState } from "react";

function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div>
      <div
        style={{
          width: 100,
          height: "100%",
          position: "fixed",
          background: "#000",
        }}
      >
        <button
          style={{
            width: 100,
            // transition: "0.5s ease-in-out",
          }}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          Toggle Sidebar
        </button>
      </div>
      <div
        style={{
          width: "20%",
          height: "100%",
          background: "lightgray",
          position: "fixed",
          left: sidebarVisible ? 100 : "-20%",
          top: 0,
          bottom: 0,
          transition: "0.5s ease-in-out",
        }}
      >
        Sidebar
      </div>
    </div>
  );
}

export default Layout;

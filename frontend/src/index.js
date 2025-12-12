import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import router from "./routes";
import React from "react";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

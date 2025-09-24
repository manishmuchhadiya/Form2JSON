import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DynamicForm from "./DynamicForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DynamicForm />
  </StrictMode>
);

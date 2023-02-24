import "./main.css";

import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("children-app");
const root = createRoot(container as HTMLDivElement);
root.render(<App />);

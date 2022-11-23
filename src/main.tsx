import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(<App />);

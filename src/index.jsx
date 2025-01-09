import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view"; // Import main-view component
import "./index.scss"; // Import the main SCSS file for styling

// Main application component
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <main-view /> {/* Render the main-view component */}
    </div>
  );
};

// Find the root element in the DOM
const container = document.getElementById("root");
const root = createRoot(container);

// Render the main application component into the root DOM element
root.render(<MyFlixApplication />);


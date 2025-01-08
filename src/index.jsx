import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/MainView"; // Import MainView component
import "./index.scss"; // Import the main SCSS file for styling

// Main application component
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <MainView /> {/* Render the MainView component */}
    </div>
  );
};

// Find the root element in the DOM
const container = document.getElementById("root");
const root = createRoot(container);

// Render the main application component into the root DOM element
root.render(<MyFlixApplication />);


import { createRoot } from "react-dom/client";
// Import the main SCSS file for styling
import "./index.scss";

// Main component for the app
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <h1>Welcome to MyFlix</h1>
      <p>Good Morning! Explore your favorite movies here.</p>
    </div>
  );
};

// Find the root element in the DOM
const container = document.getElementById("root");
const root = createRoot(container);

// Render the main application component into the root DOM element
root.render(<MyFlixApplication />);


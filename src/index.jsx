import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap"; // Import Bootstrap Container
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const MyFlixApplication = () => {
  return (
    // Wrap the application in a Bootstrap Container for consistent spacing and responsiveness
    <Container fluid className="my-flix">
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApplication />);

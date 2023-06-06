import "./App.css";
import Container from "./components/Container";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
    <CityProvider>
      <Container />
    </CityProvider>
  );
}

export default App;

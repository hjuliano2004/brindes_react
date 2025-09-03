import { Routes, Route } from "react-router-dom";

import EnvioForm from "./pages/Envios/EnvioForm/EnvioForm";
import EnvioList from "./pages/Envios/EnviosList/EnviosList";
import { CadastroProduto } from "./pages/Envios/cadastroProduto/CadastroProduto";
import { TelaListagem } from "./pages/telaListagem/TelaListagem";

function App() {
  return (
    <Routes>
      <Route path="/" Component={EnvioForm} />
      <Route path="/envios" Component={EnvioList} />
      <Route path="/cadastroProduto" Component={CadastroProduto} />
      <Route path="/telaListagem" Component={TelaListagem} />
    </Routes>
  );
}

export default App;

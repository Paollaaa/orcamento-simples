import { useState } from "react";
import Formulario from "./components/Formulario/formulario";
import OrcamentoPDF from "./components/Orcamento/orcamento";

function App() {

  const [dados, setDados] = useState(() => {

    try {

      const dadosSalvos = localStorage.getItem("dadosFormulario");

      if (dadosSalvos) {
        return JSON.parse(dadosSalvos);
      }

    } catch (erro) {

      console.log("Erro ao carregar dados:", erro);

    }

    return {
      empresa: "",
      cnpj: "",
      cliente: "",
      endereco: "",
      bairro: "",
      complemento: "",
      orcamento: "",
      email: "",
      telefone: "",
      validoAte: "",
      desconto: "",
      total: "",
      totalComDesconto: "",
      descricao: ""
    };

  });

  const [dadosPDF, setDadosPDF] = useState(null);

  return (
    <div>

      <Formulario
        dados={dados}
        setDados={setDados}
        setDadosPDF={setDadosPDF}
      />

      {dadosPDF && (
        <OrcamentoPDF
          key={dadosPDF.atualizadoEm}
          dados={dadosPDF}
        />
      )}

    </div>
  );
}

export default App;
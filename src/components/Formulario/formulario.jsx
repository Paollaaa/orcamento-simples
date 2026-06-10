import "./index.scss";

function Formulario({
  dados,
  setDados,
  setDadosPDF
}) {

  function atualizarCampo(e) {

    const novosDados = {
      ...dados,
      [e.target.name]: e.target.value
    };

    const total = Number(novosDados.total) || 0;
    const desconto = Number(novosDados.desconto) || 0;

    novosDados.totalComDesconto = (
      total - (total * desconto / 100)
    ).toFixed(2);

    setDados(novosDados);

    localStorage.setItem(
      "dadosFormulario",
      JSON.stringify(novosDados)
    );
  }

  return (

    <div className="formulario">

      <input
        type="text"
        name="empresa"
        placeholder="Empresa"
        value={dados.empresa}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="cnpj"
        placeholder="CNPJ"
        value={dados.cnpj}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="cliente"
        placeholder="Cliente"
        value={dados.cliente}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="endereco"
        placeholder="Endereço"
        value={dados.endereco}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="bairro"
        placeholder="Bairro"
        value={dados.bairro}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="complemento"
        placeholder="Complemento"
        value={dados.complemento}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="orcamento"
        placeholder="Orçamento nº"
        value={dados.orcamento}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="email"
        placeholder="E-mail"
        value={dados.email}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={dados.telefone}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="validoAte"
        placeholder="Válido até"
        value={dados.validoAte}
        onChange={atualizarCampo}
      />

      <input
        type="number"
        name="desconto"
        placeholder="Desconto (%)"
        value={dados.desconto}
        onChange={atualizarCampo}
      />

      <input
        type="number"
        name="total"
        placeholder="Total"
        value={dados.total}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="totalComDesconto"
        placeholder="Total com desconto"
        value={dados.totalComDesconto}
        readOnly
      />

      {/* DESCRIÇÃO */}
      <textarea
        name="descricao"
        placeholder="Descrição do orçamento"
        value={dados.descricao}
        onChange={atualizarCampo}
        className="descricao"
      />

      {/* NOVOS CAMPOS */}
      <input
        type="text"
        name="formadepgto"
        placeholder="Forma de pagamento"
        value={dados.formadepgto}
        onChange={atualizarCampo}
      />

      <input
        type="text"
        name="prazoEntrega"
        placeholder="Prazo de entrega"
        value={dados.prazoEntrega}
        onChange={atualizarCampo}
      />

      <button
        type="button"
        onClick={() => {

          setDadosPDF({
            ...dados,
            dataOrcamento: new Date().toLocaleDateString("pt-BR"),
            atualizadoEm: Date.now()
          });

        }}
      >
        Gerar orçamento
      </button>

    </div>

  );
}

export default Formulario;
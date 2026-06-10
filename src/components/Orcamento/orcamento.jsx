import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./index.scss";
import Logo from "../../assets/Logo.jpg";

function OrcamentoPDF({ dados }) {

  async function gerarPDF() {
    const areaPDF = document.getElementById("pdf");

    const canvas = await html2canvas(areaPDF, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    let imgWidth = pdfWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = (canvas.width * imgHeight) / canvas.height;
    }

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );

    return pdf;
  }

  async function compartilharPDF() {
    try {
      const pdf = await gerarPDF();

      const pdfBlob = pdf.output("blob");

      const arquivo = new File(
        [pdfBlob],
        "orcamento.pdf",
        {
          type: "application/pdf",
        }
      );

      if (
        navigator.canShare &&
        navigator.canShare({ files: [arquivo] })
      ) {
        await navigator.share({
          title: "Orçamento",
          text: "Segue o orçamento em PDF",
          files: [arquivo],
        });
      } else {
        pdf.save("orcamento.pdf");
      }

    } catch (erro) {
      console.error(erro);
      alert("Não foi possível compartilhar o PDF.");
    }
  }

  async function baixarPDF() {
    try {
      const pdf = await gerarPDF();
      pdf.save("orcamento.pdf");
    } catch (erro) {
      console.error(erro);
      alert("Não foi possível gerar o PDF.");
    }
  }

  return (
    <div className="container-pdf">

      <div id="pdf" className="pdf">

        <div className="topo-pdf">

          <div className="lado-esquerdo">
            <img src={Logo} alt="Logo" className="logo" />
          </div>

          <div className="centro">
            <h1>ORÇAMENTO</h1>
          </div>

          <div className="lado-direito"></div>

        </div>

        <div className="duas-colunas">

          <div className="coluna">

            <p><span className="label">Empresa:</span><span className="valor">{dados.empresa}</span></p>
            <p><span className="label">CNPJ:</span><span className="valor">{dados.cnpj}</span></p>
            <p><span className="label">Cliente:</span><span className="valor">{dados.cliente}</span></p>
            <p><span className="label">Telefone:</span><span className="valor">{dados.telefone}</span></p>
            <p><span className="label">E-mail:</span><span className="valor">{dados.email}</span></p>
            <p><span className="label">Endereço:</span><span className="valor">{dados.endereco}</span></p>
            <p><span className="label">Bairro:</span><span className="valor">{dados.bairro}</span></p>

          </div>

          <div className="coluna">

            <p><span className="label">Complemento:</span><span className="valor">{dados.complemento}</span></p>
            <p><span className="label">Orçamento nº:</span><span className="valor">{dados.orcamento}</span></p>
            <p><span className="label">Válido até:</span><span className="valor">{dados.validoAte}</span></p>
            <p><span className="label">Desconto:</span><span className="valor">{dados.desconto}%</span></p>
            <p><span className="label">Total:</span><span className="valor">R$ {dados.total}</span></p>
            <p><span className="label">Total c/ desconto:</span><span className="valor">R$ {dados.totalComDesconto}</span></p>

            <p><span className="label">&nbsp;</span><span className="valor"></span></p>

          </div>

        </div>

        <div className="descricao-pdf">
          <h2>Descrição do Orçamento</h2>
          <p className="descricao-texto">{dados.descricao}</p>
        </div>

        <div className="forma-de-pagamento">

          <h2>Forma de Pagamento e Prazo de Entrega</h2>

          <p>
            <span className="label">Forma de pagamento:</span>
            <span className="valor">{dados.formadepgto}</span>
          </p>

          <p>
            <span className="label">Prazo de entrega:</span>
            <span className="valor">{dados.prazoEntrega}</span>
          </p>

          <p>
            <strong className="data">Biguaçu:</strong> {dados.dataOrcamento}
          </p>

        </div>

      </div>

      <div className="botoes-pdf">

        <button
          className="botao-compartilhar"
          onClick={compartilharPDF}
        >
          Compartilhar PDF
        </button>

        <button
          className="botao-baixar"
          onClick={baixarPDF}
        >
          Baixar PDF
        </button>

      </div>

    </div>
  );
}

export default OrcamentoPDF;
const formRequerimento = document.querySelector(".formRequerimento");

formRequerimento.addEventListener("submit", function (e) {
  e.preventDefault();

  const selectElement = document.getElementById("requerimento");
  const selectedIndex = selectElement.selectedIndex;
  const tipoRequerimento = selectElement.options[selectedIndex].value;

  const selectElement2 = document.getElementById("motivo");
  const selectedIndex2 = selectElement2.selectedIndex;
  const motivoRequerimento = selectElement2.options[selectedIndex2].value;

  const documentoRequerimento = document.getElementById("documento").value;

  const solicitacao = {
    tipo: tipoRequerimento,
    motivo: motivoRequerimento,
    dataSolicitacao: ano + "/" + mes + "/" + dia,
    disciplinas: diciplinasAdicionadas,
    documento: documentoRequerimento == null || documentoRequerimento == undefined ? null : documentoRequerimento,
    status: "pendente",
    idAluno: aluno().alunoId,
  };

  if (solicitacao.disciplinas.length > 0) {
    const xhr = new XMLHttpRequest();
    const url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/enviarSolicitacao.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const resposta = JSON.parse(xhr.responseText);
          console.log(resposta);
          if (resposta.status === "ok") {
            if (resposta.disciplinasNaoEnviadas && resposta.disciplinasNaoEnviadas.length > 0) {
              criaTelaStatusSolicitacao('../../img/status-ok.png', resposta.resposta, resposta.disciplinasNaoEnviadas);
            } else {
              criaTelaStatusSolicitacao('../../img/status-ok.png', resposta.resposta);
            }
          } else {
            if (resposta.disciplinasNaoEnviadas && resposta.disciplinasNaoEnviadas.length > 0) {
              criaTelaStatusSolicitacao('../../img/status-erro.png', resposta.resposta, resposta.disciplinasNaoEnviadas);
            } else {
              criaTelaStatusSolicitacao('../../img/status-erro.png', resposta.resposta);
            }          }
        } else {
          criaTelaStatusSolicitacao('../../img/status-erro.png', "Erro de comunicação com o servidor");
        }
      }

      buscaSolicitacao();
    };

    xhr.send(JSON.stringify(solicitacao));
  }

  console.log(solicitacao);
});

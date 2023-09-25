function atualizaSolicitacao(resposta, dataAvaliacao, horaAvaliacao, id) {
  const novaDataAvaliacao = converteData(dataAvaliacao);

  const dados = {
    dataAvaliacao: novaDataAvaliacao,
    statusSolicitacao: resposta,
    horaAvaliacao: horaAvaliacao,
    id: id
  };
  console.log(dados);
  const codificaDados = JSON.stringify(dados);
  const xhr = new XMLHttpRequest();
  const url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/atualizaStatusSolicitacao.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Resposta bem-sucedida
        console.log(xhr.responseText);
        const resposta = JSON.parse(xhr.responseText);
        console.log(resposta);
        if (resposta.status == "ok") {
          if (resposta.dataAvaliacao) {
            criaTelaStatusSolicitacao(
              "../../img/status-ok.png",
              resposta.message,
              resposta.dataAvaliacao
            );
          } else {
            criaTelaStatusSolicitacao(
              "../../img/status-ok.png",
              resposta.message
            );
          }

          buscaSolicitacao();
        } else if (resposta.status == "erro") {
          criaTelaStatusSolicitacao(
            "../../img/status-erro.png",
            resposta.message
          );
        }
      } else {
        // Erro de conexão ou resposta não esperada
        criaTelaStatusSolicitacao(
          "../../img/status-erro.png",
          resposta.message
        );
      }

    } else {
      console.log('erro');
    }
  };

  xhr.send(codificaDados);
}
function modalInfoSolicitacao(solicitacao) {
  abreModal();
  const modal = document.querySelector(".modal > section > section");
  const nome_aluno = (modal.querySelector("#nomeAluno").textContent =
    "Nome: " + solicitacao.querySelector(".nomeAluno").textContent);
  const email_aluno = (modal.querySelector("#emailAluno").textContent =
    "Email: " + solicitacao.querySelector(".email").textContent);
  const curso_aluno = (modal.querySelector("#cursoAluno").textContent =
    "Curso: " + solicitacao.querySelector(".curso").textContent);
  const turma_aluno = (modal.querySelector("#turmaAluno").textContent =
    "Turma: " + solicitacao.querySelector(".turma").textContent);
  const disciplina = (modal.querySelector("#disciplina").textContent =
    "Disciplina: " + solicitacao.querySelector(".disciplina").textContent);
  const nome_professor = (modal.querySelector("#nomeProfessor").textContent =
    "Professor(a): " + solicitacao.querySelector(".nomeProfessor").textContent);
  const status_solicitacao = (modal.querySelector(
    "#statusSolicitacao"
  ).textContent =
    "Status: " + solicitacao.querySelector(".status").textContent);
  const data_solicitacao = (modal.querySelector(
    "#dataSolicitacao"
  ).textContent =
    "Data da Solicitação: " +
    solicitacao.querySelector(".dataPedido").textContent);

  const form = document.querySelector(".modal form");
  form.innerHTML = "";

  const label = document.createElement("label");
  label.setAttribute("for", "dataAvaliacao");
  label.textContent = "Selecione a data e a Hora da Avaliação";
  label.setAttribute("class", "label");

  const inputData = document.createElement("input");
  inputData.type = "date";
  inputData.name = "dataAvaliacao";
  inputData.title = "selecione a data da avaliacao";

  const inputHora = document.createElement("input");
  inputHora.type = "time";
  inputHora.name = "horaAvaliacao";
  inputHora.title = "selecione a hora da avaliacao";

  const botaoAprovarSolicitacao = document.createElement("button");
  botaoAprovarSolicitacao.setAttribute("type", "button");
  botaoAprovarSolicitacao.setAttribute("class", "botaoAprovar");
  botaoAprovarSolicitacao.textContent = "Aprovar Solicitação";
  botaoAprovarSolicitacao.onclick = () => {
    atualizaSolicitacao(
      "Aprovado",
      form.dataAvaliacao.value,
      form.horaAvaliacao.value,
      solicitacao.querySelector(".id").textContent
    );
  };

  const botaoReprovarSolicitacao = document.createElement("button");
  botaoReprovarSolicitacao.setAttribute("type", "button");
  botaoReprovarSolicitacao.setAttribute("class", "botaoReprovar");
  botaoReprovarSolicitacao.textContent = "Reprovar Solicitação";
  botaoReprovarSolicitacao.onclick = () => {
    atualizaSolicitacao(
      "Recusado",
      null,
      null,
      solicitacao.querySelector(".id").textContent
    );
  };
  form.appendChild(label);
  form.appendChild(inputData);
  form.appendChild(inputHora);
  form.appendChild(botaoAprovarSolicitacao);
  form.appendChild(botaoReprovarSolicitacao);
}

function abreModal() {
  document.querySelector(".modal").style.display = "block";
}

function fecharModal() {
  document.querySelector(".modal").style.display = "none";
}

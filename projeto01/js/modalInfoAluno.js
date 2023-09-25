function modalInfoAlunoSolicitacao(solicitacao) {
  abreModal();
  const modal = document.querySelector(".modal > section > section");
  const tagP = modal.querySelectorAll('p');
  limpaValores(tagP);
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
  
    if (solicitacao.querySelector('.status').textContent == "Aprovado") {
      const dataAvaliacao = modal.querySelector('#dataAvaliacao').textContent = 'Data da Avaliação: ' +
      solicitacao.querySelector('.dataAvaliacao').textContent;

      const horaAvaliacao = modal.querySelector('#horaAvaliacao').textContent = 'Hora da Avaliação: ' +
      solicitacao.querySelector('.horaAvaliacao').textContent;

      const campus = modal.querySelector('#nomeCampus').textContent = 'Local da Prova: ' +
      solicitacao.querySelector('.campus').textContent;
    }

  const form = modal.querySelector(".form");
  form.innerHTML = "";
  if (
    solicitacao.querySelector(".status").textContent == "Pendente" ||
    solicitacao.querySelector(".status").textContent == null
  ) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Cancelar Solicitação";
    button.classList.add("botaoCancelarSolicitacao");
    button.onclick = function () {
      cancelaSolicitacao({
        id: solicitacao.querySelector(".id").textContent,
        statusSolicitacao: "Cancelado",
      });
    };

    form.appendChild(button);
  } else if (solicitacao.querySelector(".status").textContent == "Cancelado") {
    const tagP = document.createElement("p");
    tagP.textContent =
      "Esta solicitação foi Cancelada";
    form.appendChild(tagP);
  } else {
    const tagP = document.createElement("p");
    tagP.textContent =
      "Esta solicitação não pode ser Cancelada, pois já foi respondida!";
    form.appendChild(tagP);
  }
}

function abreModal() {
  document.querySelector(".modal").style.display = "block";
}

function fecharModal() {
  document.querySelector(".modal").style.display = "none";
}

function limpaValores(p){
  p.forEach(element => {
    element.textContent = '';
  });
}

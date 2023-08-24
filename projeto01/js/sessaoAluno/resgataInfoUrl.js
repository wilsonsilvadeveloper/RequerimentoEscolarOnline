// Obtém o parâmetro da URL e decodifica a informação do aluno
var alunoEncoded = getUrlParameter("aluno");
var alunoDecoded = JSON.parse(atob(alunoEncoded));

// Use as informações do aluno como necessário

const infoAluno = {
  matricula: alunoDecoded.matricula,
  nome: alunoDecoded.nome_aluno,
  alunoId: alunoDecoded.id_aluno,
  curso: alunoDecoded.curso,
  turma: alunoDecoded.turma
}

function aluno(){
  return infoAluno;
}

// Função para obter parâmetros da URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

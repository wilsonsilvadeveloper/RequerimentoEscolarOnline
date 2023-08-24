function deletarSolicitacao(id) {
  const confirma = prompt(
    "Você realmente deseja cancelar essa solicitação? Responda com sim oiu não."
  );
  console.log(id);

  if (confirma == "sim" || confirma == "SIM" || confirma == "Sim") {
    const xhr = new XMLHttpRequest();
    const url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/deletarSolicitacao.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const resposta = JSON.parse(xhr.responseText);
          if(resposta.status == 'ok'){
            criaTelaStatusSolicitacao('../../img/status-ok.png', resposta.message);
            buscaSolicitacao();
          } else {
            criaTelaStatusSolicitacao('../../img/status-erro.png', resposta.message);
          }
        } 
      }
    };

    xhr.send(JSON.stringify({ idSolicitacao: id }));
  } else {
    return
  }
}

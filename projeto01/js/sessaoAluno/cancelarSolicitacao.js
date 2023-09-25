function cancelaSolicitacao(solicitacao) {
    console.log(solicitacao);
    const dadosSolicitacao = JSON.stringify(solicitacao);
    const xhr = new XMLHttpRequest();
    const url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/cancelarSolicitacao.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText)
          const resposta = JSON.parse(xhr.responseText);
          console.log(resposta);
          if(resposta.status == 'ok'){
            criaTelaStatusSolicitacao(
            "../../img/status-ok.png",resposta.message
            );
            atualizarPesquisa(resposta.email);
          } else if (resposta.status == 'erro'){
            criaTelaStatusSolicitacao(
                "../../img/status-erro.png",resposta.message
            );
          }
        }
      }
    };

    xhr.send(dadosSolicitacao);
}
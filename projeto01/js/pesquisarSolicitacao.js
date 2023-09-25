const buttonPesquisarSolicitacao = document.querySelector("#pesquisarSolicitacao");
buttonPesquisarSolicitacao.addEventListener("click", procurarSolicitacao);

function procurarSolicitacao() {
  const email = prompt("Digite seu Email:");

  if (email != null) {
    const validarEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (validarEmail.test(email)) {
      const xhr = new XMLHttpRequest();
      const url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/pesquisarSolicitacao.php";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const resposta = JSON.parse(xhr.responseText);
            if(resposta.status == 'ok'){
              const urlComDadosCodificados = resposta.url;
              window.open(urlComDadosCodificados, "_blank");
            } else if (resposta.status == 'erro'){
              criaTelaStatusSolicitacao('../../img/status-erro.png', resposta.message);
            }
          }
        }
      };

      xhr.send(JSON.stringify({ email: email }));
    } else {
      alert("O endereço de e-mail não é válido.");
    }
  }
}

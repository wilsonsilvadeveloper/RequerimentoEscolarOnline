function atualizarPesquisa(email) {
  const emailAluno = email;

  if (emailAluno != null) {
    const validarEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (validarEmail.test(emailAluno)) {
      const xhr = new XMLHttpRequest();
      const url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/pesquisarSolicitacao.php";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const resposta = JSON.parse(xhr.responseText);
            console.log(resposta);
            const urlComDadosCodificados = resposta.url;
            atualizaUrl(urlComDadosCodificados);
          }
        }
      };

      xhr.send(JSON.stringify({ email: email }));
    } else {
      alert("O endereço de e-mail não é válido.");
    }
  }
}

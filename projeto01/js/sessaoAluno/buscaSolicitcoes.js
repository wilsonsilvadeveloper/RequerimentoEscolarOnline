function buscaSolicitacao(){
    const idAluno = aluno().alunoId;

    const xhr = new XMLHttpRequest();
    const url = "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/buscaSolicitacao.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const resposta = JSON.parse(xhr.responseText);
          console.log(resposta);
          const sectionTabela = document.querySelector('.listaSolicitacoes');
          if(resposta.length > 0){
            sectionTabela.style.display = 'block';
            imprimeSolicitacoes(resposta);
          } else {
            sectionTabela.style.display = 'none';
          }
        }
      }
    };

    xhr.send(JSON.stringify({ aluno: idAluno })); // Envie o idAluno como parte de um objeto JSON
}

buscaSolicitacao();
function enviarDados() {
    const form = document.querySelector(".formRequerimento");
    const formData = new FormData(form);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/enviarSolicitacao2.php", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const resposta =  JSON.parse(xhr.responseText);
            if(resposta.status == 'ok'){
                criaTelaStatusSolicitacao('../../img/status-ok.png', resposta.response, resposta.statusArquivo);
            } else {
                criaTelaStatusSolicitacao('../../img/status-erro.png', resposta.response, resposta.statusArquivo);
            }
        }
    };

    xhr.send(formData);
}

// Intercepta o envio do formulário e envia os dados via AJAX
document.querySelector(".formRequerimento").addEventListener("submit", function(e) {
    e.preventDefault();
    enviarDados();
});
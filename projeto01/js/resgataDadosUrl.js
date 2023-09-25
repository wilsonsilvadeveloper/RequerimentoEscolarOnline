window.onload = function () {
  decodificaUrl();
};

function decodificaUrl(){
    // Obtenha os parâmetros da URL da nova aba
    const urlParams = new URLSearchParams(window.location.search);
    const dadosCodificados = urlParams.get("dados");
  
    // Decodifique os dados
    const dadosDecodificados = JSON.parse(decodeURIComponent(dadosCodificados));
  
    // Agora, você pode usar os dados na nova página
    imprimeSolicitacoes(dadosDecodificados);
}
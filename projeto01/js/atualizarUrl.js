function atualizaUrl(url) {
  // Suponha que você tenha uma nova URL com dados atualizados
  const novaURL = url;

  // Use window.history.pushState para atualizar a URL da aba atual
  window.history.pushState(null, null, novaURL);
  decodificaUrl();

  // Isso atualizará a URL na aba do navegador sem recarregar a página
}

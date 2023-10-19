const formProfessor = document.querySelector(".form-login-professor > form");

formProfessor.addEventListener("submit", (e)=> {
  e.preventDefault();

  let formData = new FormData(formProfessor);

  // Criando uma instância do objeto XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Configurando a requisição
  xhr.open(
    "POST",
    "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/loginProfessor.php",
    true
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if(response.status == 'ok'){
        eval(response.aba);
      } else if(response.status == 'error'){
        alert(response.error);
      }
    }
  };

  // Enviando a requisição
  xhr.send(formData);
});

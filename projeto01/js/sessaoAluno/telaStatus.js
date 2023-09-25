function criaTelaStatusSolicitacao(imgStatus, textoStatus, arquivoStatus){
    const elementoPai = document.querySelector('.statusSolicitacao');
    elementoPai.innerHTML = '';

    const img = document.createElement('img');
    img.setAttribute('src', imgStatus)
    elementoPai.appendChild(img);

    const p = document.createElement('p');
    p.textContent = textoStatus;
    elementoPai.appendChild(p);

    const pAlerta = document.createElement('p');
    pAlerta.textContent = arquivoStatus;
    elementoPai.appendChild(pAlerta);

    const botaoFecharTela = document.createElement('button');
    botaoFecharTela.textContent = 'X'
    botaoFecharTela.setAttribute('type', 'button')
    botaoFecharTela.addEventListener('click', () =>{
        botaoFecharTelaStatusSolicitacao(elementoPai);
    })
    elementoPai.appendChild(botaoFecharTela);
    elementoPai.style.display = 'flex';
}

function botaoFecharTelaStatusSolicitacao(tela){
    tela.style.display = 'none';
}
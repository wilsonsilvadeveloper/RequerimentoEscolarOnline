function imprimeSolicitacoes(solicitacoes){
    console.log(solicitacoes);
    const table = document.querySelector('.tabelaSolicitacoes');
    table.innerHTML = '';
    // criando cabeçalho da tabela
    const thead = document.createElement('thead');
    // criando a linha
    const tr = document.createElement('tr');

    // criando as colunas
    const coluna1 = criaTh('Id', tr);
    const coluna2 = criaTh('Status', tr);
    const coluna3 = criaTh('Cod', tr);
    const coluna4 = criaTh('Disciplina', tr);
    const coluna5 = criaTh('Professor(a)', tr);
    const coluna6 = criaTh('Data', tr);
    const coluna7 = criaTh('Justificativa', tr);

    thead.appendChild(tr);

    // criando o corpo da tabela

    const tbody = document.createElement('tbody');

    solicitacoes.forEach(solicitacao => {
        const tbodyTr = document.createElement('tr');
        criaTd(solicitacao.solicitacao_id, solicitacao.solicitacao_status, solicitacao.disciplina_codigo,
        solicitacao.disciplina_nome, solicitacao.professor_nome, solicitacao.data_pedido, solicitacao.justificativa, tbodyTr);
        tbody.appendChild(tbodyTr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
}

function criaTh(nomeColuna, tr){
    const criaTh = document.createElement('th');
    criaTh.textContent = nomeColuna;
    tr.appendChild(criaTh);
}

function criaTd(id, status, codigo, disciplina, professor, data, Justificativa, tr){
    const tdId = document.createElement('td');
    tdId.textContent = id;
    tr.appendChild(tdId);

    const tdStatus = document.createElement('td');
    tdStatus.textContent = status;
    tr.appendChild(tdStatus);

    const tdCod = document.createElement('td');
    tdCod.textContent = codigo;
    tr.appendChild(tdCod);

    const tdDisdiplina = document.createElement('td');
    tdDisdiplina.textContent = disciplina;
    tr.appendChild(tdDisdiplina);

    const tdProfessor = document.createElement('td');
    tdProfessor.textContent = professor;
    tr.appendChild(tdProfessor);

    const tdData = document.createElement('td');
    tdData.textContent = data;
    tr.appendChild(tdData);

    const tdJustificativa = document.createElement('td');
    tdJustificativa.textContent = Justificativa;
    tr.appendChild(tdJustificativa);

    const tdButton = document.createElement('td');
    const button = document.createElement('button');
    button.setAttribute('class', 'deletarSolicitacao');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () =>{
        deletarSolicitacao(id);
    });
    const backgroundButton = document.createElement('img');
    backgroundButton.setAttribute('src', '../../img/deletar.png')
    button.appendChild(backgroundButton);
    tdButton.appendChild(button);
    tr.appendChild(tdButton);
}
let infoSolicitacao;

function imprimeSolicitacoes(solicitacoes){
    infoSolicitacao = solicitacoes;
    console.log(infoSolicitacao);
    const table = document.querySelector('.tabelaSolicitacoes');
    table.innerHTML = '';
    // criando cabeçalho da tabela
    const thead = document.createElement('thead');
    // criando a linha
    const tr = document.createElement('tr');

    // criando as colunas
    const coluna0 = criaTh('Id', tr);
    const coluna1 = criaTh('Aluno', tr);
    const coluna2 = criaTh('Email', tr);
    const coluna3 = criaTh('Curso', tr);
    const coluna4 = criaTh('Turma', tr);
    const coluna5 = criaTh('Disciplina', tr);
    const coluna6 = criaTh('Professor(a)', tr);
    const coluna7 = criaTh('Data da avaliação', tr);
    const coluna8 = criaTh('Data do Pedido', tr);
    const coluna9 = criaTh('Status', tr);
    const coluna10 = criaTh('Arquivo', tr);


    thead.appendChild(tr);

    // criando o corpo da tabela

    const tbody = document.createElement('tbody');

    solicitacoes.forEach(solicitacao => {
        const tbodyTr = document.createElement('tr');
        criaTd(solicitacao.id, solicitacao.nome_aluno, solicitacao.email_aluno, solicitacao.curso, solicitacao.turma,
        solicitacao.nome_diciplina, solicitacao.nome_professor, solicitacao.data_avaliacao, solicitacao.data_pedido, solicitacao.status, solicitacao.arquivo, tbodyTr);
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

function criaTd(id, nome_aluno, email, curso, turma, disciplina, professor, dataAvaliacao, dataPedido, status, Justificativa, tr){
    const tdId = document.createElement('td');
    tdId.setAttribute('class', 'id');
    tdId.textContent = id;
    tr.appendChild(tdId);
    
    const tdAluno = document.createElement('td');
    tdAluno.setAttribute('class', 'nomeAluno');
    tdAluno.textContent = nome_aluno;
    tr.appendChild(tdAluno);

    var decodeEmail = atob(email);
    const tdEmail = document.createElement('td');
    tdEmail.setAttribute('class', 'email');
    tdEmail.textContent = decodeEmail;
    tr.appendChild(tdEmail);

    const tdCurso = document.createElement('td');
    tdCurso.setAttribute('class', 'curso');
    tdCurso.textContent = curso;
    tr.appendChild(tdCurso);

    const tdTurma = document.createElement('td');
    tdTurma.setAttribute('class', 'turma');
    tdTurma.textContent = turma;
    tr.appendChild(tdTurma);

    const tdDisdiplina = document.createElement('td');
    tdDisdiplina.setAttribute('class', 'disciplina');
    tdDisdiplina.textContent = disciplina;
    tr.appendChild(tdDisdiplina);

    const tdProfessor = document.createElement('td');
    tdProfessor.setAttribute('class', 'nomeProfessor');
    tdProfessor.textContent = professor;
    tr.appendChild(tdProfessor);

    const tdDataAvaliacao = document.createElement('td');
    tdDataAvaliacao.setAttribute('class', 'dataAvaliacao');
    tdDataAvaliacao.textContent = converteData(dataAvaliacao);
    tr.appendChild(tdDataAvaliacao);

    const tdDataPedido = document.createElement('td');
    tdDataPedido.setAttribute('class', 'dataPedido');
    const novaData = converteData(dataPedido);
    tdDataPedido.textContent = novaData;
    tr.appendChild(tdDataPedido);

    const tdStatus = document.createElement('td');
    tdStatus.setAttribute('class', 'status');
    tdStatus.textContent = status;
    tr.appendChild(tdStatus);

    
    const tdLink = document.createElement('td');
    tdLink.setAttribute('class', 'link');
    const linkArquivo = document.createElement('a');
    if(Justificativa != null) {
        let url = 'http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/' + Justificativa;
        var novaUrl = url.replace(/(\.\.\/)+/g, "");
        linkArquivo.setAttribute('href', novaUrl)
        linkArquivo.setAttribute('target', '_blank');
        linkArquivo.textContent = "Abrir documento";
    } else if (Justificativa == null) {
        linkArquivo.textContent = "Sem Arquivo";
    }
    tdLink.appendChild(linkArquivo)
    tr.appendChild(tdLink);

    const tdEditarInfoAluno = document.createElement('td');
    tdEditarInfoAluno.setAttribute('class', 'editar-info');
    const img = document.createElement('img');
    img.setAttribute('src', '../../img/editar.png');
    tdEditarInfoAluno.appendChild(img);
    if(status === 'Pendente' || status === null){
        img.addEventListener('click', function(e){
            modalInfoSolicitacao(e.target.parentNode.parentNode)
        })
    } else {
        img.style.cursor = 'not-allowed';
    }
    
    tr.appendChild(tdEditarInfoAluno);
}
function imprimeSolicitacoes(solicitacoes){
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
    const coluna8 = criaTh('Hora da avaliação', tr);
    const coluna9 = criaTh('Local', tr);
    const coluna10 = criaTh('Data do Pedido', tr);
    const coluna11 = criaTh('Status', tr);


    thead.appendChild(tr);

    // criando o corpo da tabela

    const tbody = document.createElement('tbody');

    solicitacoes.forEach(solicitacao => {
        const tbodyTr = document.createElement('tr');
        criaTd(solicitacao.id, solicitacao.nome_aluno, solicitacao.email_aluno, solicitacao.curso, solicitacao.turma,
        solicitacao.nome_diciplina, solicitacao.nome_professor, solicitacao.data_avaliacao, solicitacao.hora_avaliacao ,solicitacao.data_pedido, solicitacao.status, solicitacao.arquivo, solicitacao.campus, tbodyTr);
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

function criaTd(id, nome_aluno, email, curso, turma, disciplina, professor, dataAvaliacao, horaAvaliacao, dataPedido, status, Justificativa, campus, tr){
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

    const tdHoraAvalicao = document.createElement('td');
    tdHoraAvalicao.setAttribute('class', 'horaAvaliacao');
    tdHoraAvalicao.textContent = horaAvaliacao;
    tr.appendChild(tdHoraAvalicao);

    const tdCampus = document.createElement('td');
    tdCampus.setAttribute('class', 'campus');
    tdCampus.textContent = campus;
    tr.appendChild(tdCampus);

    const tdDataPedido = document.createElement('td');
    tdDataPedido.setAttribute('class', 'dataPedido');
    const novaData = converteData(dataPedido);
    tdDataPedido.textContent = novaData;
    tr.appendChild(tdDataPedido);

    const tdStatus = document.createElement('td');
    tdStatus.setAttribute('class', 'status');
    tdStatus.textContent = status;
    tr.appendChild(tdStatus);


    const tdEditarInfoAluno = document.createElement('td');
    tdEditarInfoAluno.setAttribute('class', 'editar-info');
    const img = document.createElement('img');
    img.setAttribute('src', '../../img/procurar.png');
    tdEditarInfoAluno.appendChild(img);
    img.addEventListener('click', function(e){
        modalInfoAlunoSolicitacao(e.target.parentNode.parentNode)
    })
    
    tr.appendChild(tdEditarInfoAluno);
}


window.addEventListener('load', ()=> {
    const alunoInfo = aluno();
    imprimiInfoAluno(alunoInfo.matricula, alunoInfo.nome, alunoInfo.curso, alunoInfo.turma)
})


function imprimiInfoAluno(matricula, nome, curso, turma){
    const sessionPai = document.querySelector('.infoAluno > div');

    const p1 = document.createElement('p');
    p1.textContent = 'Nome: ' + nome;
    sessionPai.appendChild(p1);

    const p2 = document.createElement('p');
    p2.textContent = 'Matricula: ' + matricula;
    sessionPai.appendChild(p2);

    const p3 = document.createElement('p');
    p3.textContent = 'Curso: ' + curso;
    sessionPai.appendChild(p3);

    const p4 = document.createElement('p');
    p4.textContent = 'Turma: ' + turma;
    sessionPai.appendChild(p4);
}
function impimiDiciplina(diciplina){
    let elementoPai = document.querySelector('.selecionaDiciplina')
    diciplina.forEach(d => {
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        div2.setAttribute('class', 'diciplina');

        let pCodDiciplina = document.createElement('p');
        pCodDiciplina.textContent = d.cod;
        pCodDiciplina.setAttribute('id', 'codDiciplina');
        div2.appendChild(pCodDiciplina);

        let pNomeDiciplina = document.createElement('p');
        pNomeDiciplina.textContent = 'Diciplina: ' + d.disciplina;
        div2.appendChild(pNomeDiciplina);

        let pNomeProfessor = document.createElement('p');
        pNomeProfessor.textContent = 'Professor(a): ' + d.nome_professor;
        div2.appendChild(pNomeProfessor);
        div1.appendChild(div2)

        div2.addEventListener('click', function(){
            selecionaDiciplina(this)
        })

        elementoPai.appendChild(div1);
    });

    let botao = criaBotao();
    elementoPai.appendChild(botao);
}

function criaBotao(){
    let button = document.createElement('button');
    button.textContent = 'Enviar Requerimento';
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'enviarRequerimento');
    return button;
}
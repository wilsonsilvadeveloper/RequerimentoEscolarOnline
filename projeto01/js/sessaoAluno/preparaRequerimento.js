let disciplinaInfo;
let diciplinasAdicionadas = [];

let dataAtual = new Date();

// Formatar a data no formato desejado (por exemplo, "AAAA-MM-DD")
let formato = "yyyy-MM-dd HH:mm:ss";
let dia = dataAtual.getDate().toString().padStart(2, '0');
let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0!
let ano = dataAtual.getFullYear();

function selecionarRequerimento() {
    let selectElement = document.getElementById("requerimento");
    let selectedOption = selectElement.options[selectElement.selectedIndex];

    if (selectedOption.value) {
        let xhr = new XMLHttpRequest();
        let id = aluno().alunoId;
        let motivoRequerimento = document.querySelector('.motivoRequerimento');
        motivoRequerimento.style.display = 'flex';
        xhr.open("GET", "http://localhost/trabalho/RequerimentoEscolarOnline/projeto01/php/buscaDiciplina.php?id=" + id);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = xhr.responseText;
                disciplinaInfo = JSON.parse(response);
                impimiDiciplina(disciplinaInfo);
            }
        };
        xhr.send();
    }
}

function retornaDiciplina(){
    return disciplinaInfo;
}

function selecionaDiciplina(diciplina){
    let diciplinasAtual = diciplina;
    const codDiciplina = diciplinasAtual.querySelector('#codDiciplina').textContent;
    
    if(diciplinasAtual.classList.contains('selecionado')){
        diciplinasAtual.classList.remove('selecionado');
        manipulaDiciplina('remover', codDiciplina);
    } else {
        diciplinasAtual.classList.add('selecionado');
        manipulaDiciplina('add', codDiciplina);
    }
}

function manipulaDiciplina(metodo, codigo){
    if(metodo == 'add'){
        diciplinasAdicionadas.push(codigo);
    } else if (metodo == 'remover'){
        const index = diciplinasAdicionadas.indexOf(codigo);
        if (index !== -1) {
            diciplinasAdicionadas.splice(index, 1);
        }
    }

    console.log(diciplinasAdicionadas);
}

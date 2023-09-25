function converteData(data) {
    if(data != null || data != undefined) {
        const partesData = data.split('-');
        const dia = partesData[2];
        const mes = partesData[1];
        const ano = partesData[0];
        const dataConvertida = dia + '/' + mes + '/' + ano;

        return dataConvertida;
    } else {
        return 'Indefenido'
    }
    
}

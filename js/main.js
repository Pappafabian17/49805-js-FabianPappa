const cantidad = Number(prompt("Cuantas materias queres calcular?(Maximo 7 materias )"))

function calcularPromedio(materia, promedioNotas){
    
    alert("te sacaste un " + " " +  promedioNotas +  " " +  "en" + " " + materia )
    if (promedioNotas >= 7 && promedioNotas <= 10) {
        alert("Felicitaciones Aprobaste" + " " + materia )
    }else{
        alert("Vas a tener que estudiar mas, desaprobaste" + " " + materia + " " + "Nos vemos en diciembre" )
    }
}

function calcularMaterias(cantidad){
    if(cantidad >=1 && cantidad <=7){
        for(let i =0; i < cantidad;i++){
            let materia = prompt("Ingresa el nombre de la materia N° : " + (i + 1) + "?" );
            let nota1 = Number(prompt("ingresa la nota que te sacaste en el primer cuatrimestre de " + " " + materia));
            let nota2 = Number(prompt("ingresa la nota que te sacaste en el segundo cuatrimestre de  " + " " + materia));
            let nota3 = Number(prompt("ingresa la nota que te sacaste en el tercer cuatrimestre de "+ " " + materia));
            let promedio = parseInt((nota1 + nota2 + nota3 )/3,10);
            calcularPromedio(materia, promedio);
        }
    }else if (cantidad < 1 ){
        alert("No existe esa cantidad de materias, minimo 1");
        cantidad = Number(prompt("Cuantas materias queres calcular?(Maximo 7 materias )"))
        calcularMaterias(cantidad);
    
    }else{
        alert("Son muchas Materias, podes calcular hasta 7");
        cantidad = Number(prompt("Cuantas materias queres calcular?(Maximo 7 materias )"))
        calcularMaterias(cantidad);
    }

}
calcularMaterias(cantidad);
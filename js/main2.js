/* //creo el objeto Materia
function Materia(nombre) {
  this.nombre = nombre;
  this.notas = [];
  this.agregarNota = function (nota) {
    this.notas.push(nota);
  };
  this.calcularPromedio = function () {
    let suma = this.notas.reduce((a, b) => a + b, 0);
    return suma / this.notas.length;
  };
}

// declaro un array vacio para llenarlo de materias
let materias = [];

//funciones

function agregarMateria(nombre) {
  let materia = new Materia(nombre);
  materias.push(materia);
}
function buscarMateria(nombre) {
  for (let i = 0; i < materias.length; i++) {
    if (materias[i].nombre === nombre) {
      return materias[i];
    }
  }
  return null;
}

function filtrarMaterias(promedio) {
  let materiasFiltradas = materias.filter(
    (materia) => materia.calcularPromedio() >= promedio
  );
  return materiasFiltradas;
}

function mostrarMaterias() {
  let mensaje = "Tus materias y notas son:\n";
  for (let i = 0; i < materias.length; i++) {
    mensaje += materias[i].nombre + ": " + materias[i].notas.join(", ") + "\n";
  }
  alert(mensaje);
}
// la funcion calcular Materias se encarga de obtener la cantidad de materias y ejecutar en base a lo seleccionado. se encarga de nombrar las materias y la nota promedio
function calcularMaterias(cantidad) {
  if (cantidad >= 1 && cantidad <= 7) {
    for (let i = 0; i < cantidad; i++) {
      let nombre = prompt("Ingresa el nombre de la materia N° : " + (i + 1));
      agregarMateria(nombre);
      let materia = buscarMateria(nombre);
      for (let n = 0; n < 3; n++) {
        let nota = Number(
          prompt(
            "ingresa la nota que te sacaste en el cuatrimestre N°" +
              " " +
              (n + 1) +
              " " +
              "de " +
              " " +
              nombre
          )
        );
        materia.agregarNota(nota);
      }
      let promedio = materia.calcularPromedio();
      alert(
        "El promedio de " + " " + nombre + " " + "es" + " " + parseInt(promedio)
      );
    }
  } else if (cantidad < 1) {
    alert("No existe esa cantidad de materias, minimo 1");
    cantidad = Number(
      prompt("Cuantas materias queres calcular?(Maximo 7 materias )")
    );
    calcularMaterias(cantidad);
  } else {
    alert("Son muchas Materias, podes calcular hasta 7");
    cantidad = Number(
      prompt("Cuantas materias queres calcular?(Maximo 7 materias )")
    );
    calcularMaterias(cantidad);
  }
}

const cantidad = Number(
  prompt("Cuantas materias queres calcular?(Maximo 7 materias )")
);
calcularMaterias(cantidad);

mostrarMaterias();
 */

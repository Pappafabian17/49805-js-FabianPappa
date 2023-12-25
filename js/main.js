// creo el objeto de materia
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
//declaro un array vacio para ponerle materias
let materias = [];

//functiones:

function agregarMateriaDesdeFormulario() {
  const nombre = document.querySelector("#nombreMateria").value;
  const nota1 = Number(document.querySelector("#nota1").value);
  const nota2 = Number(document.querySelector("#nota2").value);
  const nota3 = Number(document.querySelector("#nota3").value);

  //verifico si la materia ya existe

  let materiaExistente = buscarMateria(nombre);

  if (materiaExistente) {
    alert(
      "Ya existe esa materia por favor agrega otra nueva o reinicia la lista"
    );
  } else {
    agregarMateria(nombre);
    const materia = buscarMateria(nombre);
    materia.agregarNota(nota1);
    materia.agregarNota(nota2);
    materia.agregarNota(nota3);
  }

  mostrarMaterias();
  guardarEnLocalStorage();

  document.getElementById("nombreMateria").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("nota3").value = "";
}

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
  let mensaje = "Tus materias y notas son: \n";
  for (let i = 0; i < materias.length; i++) {
    mensaje += materias[i].nombre + ":" + materias[i].notas.join(", ") + "\n";
  }
  document.querySelector("#resultados").innerText = mensaje;
}

function guardarEnLocalStorage() {
  localStorage.setItem("materias", JSON.stringify(materias));
}

function cargarDesdeLocalStorage() {
  const materiasGuardadas = localStorage.getItem("materias");
  if (materiasGuardadas) {
    materias = JSON.parse(materiasGuardadas);
    mostrarMaterias();
  }
}

cargarDesdeLocalStorage();

function borrarLocalStorage() {
  localStorage.removeItem("materias");
  alert("LocalStorage borrado ");
  document.getElementById("resultados").innerText = "";
  materias = [];
}

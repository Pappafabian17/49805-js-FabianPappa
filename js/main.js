// creo el objeto de materia
function Materia(nombre) {
  this.nombre = nombre;
  this.notas = [];
  this.agregarNota = function (nota) {
    this.notas.push(nota);
  };
  this.calcularPromedio = function () {
    let suma = this.notas.reduce((a, b) => a + b, 0);
    return Math.round(suma / this.notas.length);
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

  if (nombre === "" || nota1 === "" || nota2 === "" || nota3 === "") {
    Swal.fire({
      title: "Error!",
      text: "No agregaste ninguna materia, ingresa una materia por favor",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }
  //verifico si la materia ya existe

  let materiaExistente = buscarMateria(nombre);

  if (materiaExistente) {
    Swal.fire({
      title: "Atencion!",
      text: "Ya existe esa materia por favor agrega otra nueva o reinicia la lista",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  } else {
    agregarMateria(nombre);
    const materia = buscarMateria(nombre);
    materia.agregarNota(nota1);
    materia.agregarNota(nota2);
    materia.agregarNota(nota3);

    const promedio = materia.calcularPromedio();
    materia.promedio = promedio;

    Swal.fire({
      title: "Materia agregada con éxito!",
      text: `${nombre} agregada correctamente`,
      icon: "success",
      confirmButtonText: "Ok",
    });
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
  const resultadosContainer = document.querySelector("#resultados");
  resultadosContainer.innerHTML = ""; // Limpio el contenedor antes de agregar las materias

  for (let i = 0; i < materias.length; i++) {
    const materiaDiv = document.createElement("div");
    materiaDiv.setAttribute("class", "contenedor-materia");
    materiaDiv.innerHTML =
      `<p>${materias[i].nombre}: ${materias[i].notas.join(", ")}` +
      `Promedio: ${materias[i].promedio} ` +
      `<button class="deleteButton" onclick="eliminarMateria(${i})">Eliminar</button></p>`;

    resultadosContainer.appendChild(materiaDiv);
  }
}

function eliminarMateria(index) {
  const materiaEliminada = materias.splice(index, 1)[0];
  mostrarMaterias();
  guardarEnLocalStorage();

  Swal.fire({
    title: "Materia eliminada!",
    text: `${materiaEliminada.nombre} eliminada correctamente`,
    icon: "success",
    confirmButtonText: "Ok",
  });
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

async function cargarMateriasAnteriores() {
  await fetch("materias.JSON")
    .then((response) => response.json())
    .then((data) => {
      const materiasAnterioresList = document.querySelector(
        "#materiasAnterioresList"
      );

      data.forEach((materia) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${materia.nombre}   : ${materia.notas.join(
          ","
        )}    Promedio : ${materia.promedio}`;
        materiasAnterioresList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error al cargar materias anteriores", error);
      Swal.fire({
        title: "Error!",
        text: "No se pudieron cargar las materias anteriores.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
}

cargarDesdeLocalStorage();
cargarMateriasAnteriores();
//borramos todas las materias del localStorage
function borrarLocalStorage() {
  localStorage.removeItem("materias");
  Swal.fire({
    title: "éxito!",
    text: `Materias eliminadas correctamente`,
    icon: "success",
    confirmButtonText: "Ok",
  });
  document.getElementById("resultados").innerText = "";
  materias = [];
}

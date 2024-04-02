/// DECLARACION DE VARIABLES GENERALES Y ARREGLO DE INICIO
let newTask = document.getElementById('input-newtask');
const btnNewTask = document.getElementById('btn-newtask');
let taskList = [
  { id: 1, taskName: 'Pasear al perro', estado: true },
  { id: 2, taskName: 'Cargar audifonos ', estado: true },
  { id: 3, taskName: 'Recibir pedido', estado: false },
];

// FUNCION QUE RENDERIZA EN EL HTML
const renderizarTaskList = (taskList) => {
  let html = '';

  taskList.forEach((task) => {

    const statusBtnIcon = task.estado ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill';
    html += `<tr>
                <td>${task.id}</td>
                <td>${task.taskName}</td>
                <td><i class="${statusBtnIcon}" onclick="changeStatusTask(${task.id})"></i></td>
                <td><i class="bi bi-trash-fill" onclick="deleteTask(${task.id})"></i></td>
            </tr>`;
  });

  document.getElementById('task-list').innerHTML = html;
  document.getElementById('task-total').innerHTML = taskList.length;
  document.getElementById('task-closed').innerHTML = taskList.filter((task) => task.estado === true).length;
};

// FUNCION QUE CAMBIA EL ESTADO DE LA TAREA
const changeStatusTask = (id) => {

  const task = taskList.find((task) => task.id === id);
  
  if (task) {
    task.estado = !task.estado;
  } else {
    console.log('Error al cambiar el estado de la tarea 😥');
  }

  renderizarTaskList(taskList);
};

// FUNCION QUE ELIMINA UNA TAREA
const deleteTask = (id) => {
  const index = taskList.findIndex((task) => task.id === id);

  if (index != -1) {
    taskList.splice(index, 1);
  } else {
    console.log('Error al borrar 😥');
  }

  renderizarTaskList(taskList);
};

// FUNCION QUE ME GENERA ID
const generarId = (taskList) => {
  return taskList.length ? taskList[taskList.length - 1].id + 1 : 1;
};

// EVENTO QUE GENERA UNA NUEVA TAREA Y LA CARGA AL ARRAY
btnNewTask.addEventListener('click', () => {
 
  if (newTask.value.trim() !== '') {
    const task = {
      id: generarId(taskList),
      taskName: newTask.value,
      estado: false,
    };
    
    taskList.push(task);
    renderizarTaskList(taskList);
    newTask.value = '';
    newTask.focus();

  } else {
    newTask.classList.add('is-invalid');
  }
});

// EVENTO QUE AL HACER CLICK EN EL INPUT REMUEVE EL ERROR
newTask.addEventListener('click', () => {
  newTask.classList.remove('is-invalid');
});

// RENDERIZA LA LISTA DE TAREAS INICIAL
renderizarTaskList(taskList);

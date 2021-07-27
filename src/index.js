document.addEventListener('DOMContentLoaded', () => {

  //Variables

  //Creates connections to all DOM elements I need

  const formSubmit = document.getElementById('new-task-description');
  const list = document.getElementById('list');
  const tasks = document.getElementById('tasks');
  const wholeForm = document.getElementById('create-task-form');

  //Creates sort button and the drop down priority selector

  const sortButton = document.createElement('button');
  sortButton.textContent = 'SORT by priority'
  sortButton.style.fontSize = '15px';
  const dropDown = document.createElement('select');
  
  //creates object to be used in sort function

  const sorter = {};
  wholeForm.appendChild(dropDown);
  list.appendChild(sortButton);

  //Sets options and colours for drop down priority selector

  dropDown.setAttribute('id', 'dropDownBox');
  let dropDownValue = document.getElementById('dropDownBox')
  const priorities = ['Low', 'Medium', 'High'];
  const priorityColors = ['green', 'orange', 'red']
  for (const val of priorities) {
    let option = document.createElement('option');
    option.value = val;
    option.text = val;
    switch(option.value) {
      case 'Low':
        option.style.color = priorityColors[0];
        break;
      case 'Medium':
        option.style.color = priorityColors[1];
        break;
      case 'High':
        option.style.color = priorityColors[2];
        break;
      default:
        console.log('Failed')
    }
    dropDown.appendChild(option);
}
  //Functions/Methods
  let addTask = (event) => {
    event.preventDefault();
    let identifier = 0;
    //Checks to see if form is empty so it wont display empty strings
    if (formSubmit.value !== '') {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = 'X'
    //Assigns colours and priority numbers to each element
    switch(dropDownValue.value) {
      case 'Low':
        item.style.color = priorityColors[0];
        identifier = 1;
        break;
      case 'Medium':
        item.style.color = priorityColors[1];
        identifier = 2;
        break;
      case 'High':
        item.style.color = priorityColors[2];
        identifier = 3;
        break;
    }
    //Fills element with text and appends it to the tasks section
    item.textContent = formSubmit.value + ' ';
    tasks.appendChild(item)
    item.appendChild(button)
    sorter[formSubmit.value] = identifier;
    //Gives function to delete button (couldnt get it to work outside the function)
    let delButton = () => {
      button.parentNode.remove();
    }
    button.addEventListener('click', delButton)
    //Once form is submitted, all text boxes and selectors are reset
    wholeForm.reset();
    
  }
}
  let sorterButton = () => {
    //sorts 'sorter' array by identifier number so all lower identifiers are first
    var sortable = [];

    for (var id in sorter) {
      sortable.push([id, sorter[id]]);
    }

    sortable.sort(function(a, b) {
      return a[1] - b[1];
    });
    //concats sortable so it's a single array rather than an array of arrays of objects
    let flattened = [].concat.apply([],sortable);

    tasks.innerHTML = '';
    let taskIdentifiers = [];
    //Retrieves all identifiers in 'flattened' and stores them in 'taskIdentifiers'
    for (const i of flattened) {
      if (typeof i === 'number'){
        taskIdentifiers.push(i);
      }
    }
    let num = 0;
    console.log(taskIdentifiers);
    console.log(flattened)
    //Assigns colours to tasks before creating them in the DOM again - in order
    let flattenedMapped = flattened.map( (i) => {
        if (typeof i === 'number') {
          num += 1;
          
        } else {
          let color = taskIdentifiers[num];
          
          let newItem = document.createElement('li');
          var button = document.createElement('button');

          newItem.style.color = priorityColors[(color - 1)];
          newItem.textContent = i + ' ';
          button.textContent = 'X'

          tasks.appendChild(newItem);
          newItem.appendChild(button)

          button.addEventListener('click', () =>{
            let textDelete = newItem.textContent.replace(' X', '')
            delete sorter[textDelete];
            tasks.removeChild(newItem);
            })
        }
      }
  )
}
  
  
  //Event Listeners
  wholeForm.addEventListener('submit', addTask)
  sortButton.addEventListener('click', sorterButton)
  
   
  })

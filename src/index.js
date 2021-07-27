document.addEventListener('DOMContentLoaded', () => {
  let test = 0;
  const formSubmit = document.getElementById('new-task-description');
  const list = document.getElementById('list');
  const tasks = document.getElementById('tasks');

  const sortButton = document.createElement('button');
  sortButton.textContent = 'SORT by priority'
  sortButton.style.fontSize = '15px';
  const dropDown = document.createElement('select');
  const wholeForm = document.getElementById('create-task-form');

  
  const sorter = {};
  wholeForm.appendChild(dropDown);
  list.appendChild(sortButton);

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
  

  wholeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let identifier = 0;
    if (formSubmit.value !== '') {
    const item = document.createElement('li');
    let button = document.createElement('button');
    button.textContent = 'X'

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
    item.textContent = formSubmit.value + ' ';
    tasks.appendChild(item)
    item.appendChild(button)
    sorter[formSubmit.value] = identifier;

    console.log(sorter)
    
    sortButton.addEventListener('click', () => {
      
      if (test === 0) {
        var sortable = [];
        test += 1;
        for (var id in sorter) {
          sortable.push([id, sorter[id]]);
        }
        sortable.sort(function(a, b) {
          return a[1] - b[1];
        });
        let flattened = [].concat.apply([],sortable);
        tasks.innerHTML = '';
        let newArr = [];
        for (const i of flattened) {
          if (typeof i === 'number'){
            newArr.push(i);
          }
        }
        let num = 0;
        console.log(newArr);
        console.log(flattened)
        flattened.map( (i) => {
          if (typeof i === 'number') {
            num += 1;
            console.log('This is i',i)
          } else {
            let color = newArr[num];
            console.log('This is i',i)
            let newItem = document.createElement('li');
            newItem.style.color = priorityColors[(color - 1)];
            newItem.textContent = i + ' ';
            let button = document.createElement('button');
            button.textContent = 'X'
            tasks.appendChild(newItem);
            newItem.appendChild(button)
            button.addEventListener('click', () =>{
              let textDelete = item.textContent.replace(' X', '')
              delete sorter[textDelete];
              tasks.removeChild(newItem);
              })
          }
          }
            
      )
    }
    })
    button.addEventListener('click', (event) =>{
      event.preventDefault();
      let textDelete = item.textContent.replace(' X', '')
      delete sorter[textDelete];
      tasks.removeChild(item);
    })
    wholeForm.reset(); 
  }
  })
})
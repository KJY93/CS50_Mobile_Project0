const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  // a prompt asking user to key in their todos
  const todo = prompt("What needs to be done?");

  // create li element (container) to contain todo items
  let todo_item_container = document.createElement('li');
  addCssStyling(classNames.TODO_ITEM, todo_item_container);

  // create span element to contain the todo-items text
  let todo_item_text = document.createElement('span');
  addCssStyling(classNames.TODO_TEXT, todo_item_text);

  // create an input element and set its type to checkbox
  let todo_item_checkbox = document.createElement('input');
  todo_item_checkbox.setAttribute('type', 'checkbox');
  addCssStyling(classNames.TODO_CHECKBOX, todo_item_checkbox);

  // create a delete button
  let del_button = document.createElement('button');
  let del_button_text = document.createTextNode('Delete');
  del_button.appendChild(del_button_text);
  addCssStyling(classNames.TODO_DELETE, del_button);

  // if the CANCEL button is clicked on
  if (todo === null) {
    alert('No new todo-item is added. The CANCEL button was clicked.');
    return false;
  }

  // else if no input is given
  else if (todo.length === 0) {
    alert('You must enter something in the todo-item input box before clicking the OK button.');
    return false;
  }

  // input given and the OK button is clicked
  else {
    todo_item_container.appendChild(todo_item_checkbox);
    todo_item_text.appendChild(document.createTextNode('' + todo));
    todo_item_container.appendChild(todo_item_text);
    todo_item_container.appendChild(del_button);
    list.appendChild(todo_item_container);  

    // get the total count of todos in the todos list
    getTodosCount(itemCountSpan);

    // get the total unchecked todos in the todos list
    getUncheckedTodosCount(uncheckedCountSpan);

    // get the input checkbox
    let todosChecked = todo_item_container.firstChild;

    // bind checkbox to the onchange event
    todosChecked.addEventListener('change', function(event) {
      // if checkbox is checked, then decrease the unchecked todo items total count
      if (event.target.checked) {
        let count = uncheckedCountSpan.innerHTML;
        count--;
        uncheckedCountSpan.innerHTML = count;
      }
      // if checkbox is not checked, then increase the unchecked todo items total count
      else if (!event.target.checked) {
        let count = uncheckedCountSpan.innerHTML;
        count++;
        uncheckedCountSpan.innerHTML = count;
      }
    });

    // get delete button for the todo item
    let todosDeleteButton = todo_item_container.lastChild;

    // bind delete button to the onclick event
    todosDeleteButton.addEventListener('click', function(event) {
      
      // delete the associated todo item
      todosDeleteButton.parentElement.remove();

      // get all the todos items list
      let getAllTodos = document.querySelectorAll('li');

      // get all the checked todo items
      let todoItemListStatus = document.querySelectorAll('input:checked'); 
      
      // get the remaining unchecked todo items
      let remainingUncheckedTodo = getAllTodos.length - todoItemListStatus.length;

      // update uncheckCountSpan
      uncheckedCountSpan.innerHTML = remainingUncheckedTodo;

      // update total todos count
      itemCountSpan.innerHTML = getAllTodos.length;
    });
  }
}

// get todos count
function getTodosCount(todoItemCount) {
  let count = todoItemCount.innerHTML;
  count ++;
  itemCountSpan.innerHTML = count;
}

// get unchecked todos count
function getUncheckedTodosCount(uncheckedTodoItemCount) {
  let count = uncheckedTodoItemCount.innerHTML
  count ++;
  uncheckedCountSpan.innerHTML = count;
}

// style todos
function addCssStyling(selector, property) {
  property.setAttribute('class', selector)
}
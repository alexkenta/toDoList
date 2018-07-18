var toDoList = {
    todos: [],
      addTodo: function(todoText) {
        this.todos.push({
          todoText: todoText,
          completed: false
        });
        view.displayTodos();
      },
      changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
      },
      deleteTodo: function(position) {
        this.todos.splice(position, 1);
      },
      toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
      },
      toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        this.todos.forEach(function(todo) {
          if(todo.completed === true) {
            completedTodos++;
          }
        })

        this.todos.forEach(function(todo) {
          if(completedTodos === totalTodos) {
            todo.completed = false;
          } else {
            todo.completed = true;
          }
        })
      }
  }; 
  
  var handlers = {
    addTodo: function() {
      var addTodoTextInput = document.getElementById('addTodoTextInput');
      toDoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    },
    changeTodo: function() {
      var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
      var changeTodoTextInput = document.getElementById('changeTodoTextInput');
      toDoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
      changeTodoPositionInput.value = '';
      changeTodoTextInput.value = '';
      view.displayTodos();
  
    },
    deleteTodo: function(position) {
      toDoList.deleteTodo(position);
      view.displayTodos();
  
    },
    toggleCompleted: function() {
      var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
      toDoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
      toggleCompletedPositionInput.value = '';
      view.displayTodos();
  
    },
    toggleAll: function() {
      toDoList.toggleAll();
      view.displayTodos();
    },
  };
  
  var view = {
    displayTodos: function() {
      var todosUl = document.querySelector('ul');
      todosUl.innerHTML = '';
      for (var i = 0; i < toDoList.todos.length; i++) {
        var todoLi = document.createElement('li');
        var todo = toDoList.todos[i];
        var todoTextWithCompletion = '';
        
        
        if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
        }
        
        todoLi.id = i;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton())
        todosUl.appendChild(todoLi);
      }
    },
    createDeleteButton: function(){
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';
      return deleteButton;
    },
    setUpEventListeners: function() {
      var todosUl = document.querySelector('ul');

      todosUl.addEventListener('click', function(event){
        // console.log(event.target.parentNode.id);
        var elementClicked = event.target; //gets the clicked element
        if(elementClicked.className === 'deleteButton'){
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        }
      });
    }
};

view.setUpEventListeners(); 
  
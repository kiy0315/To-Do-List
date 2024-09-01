document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', function(e) {
        // submit 버튼 클릭시 창을 새로고침 해주는 기능 
        e.preventDefault(); 
        
        const taskText = input.value.trim();
        if (taskText === '') return;

        const li = document.createElement ('li');
        const checkboxes = document.createElement('input');
        checkboxes.type='checkbox';
        //checkbox를 css 적용하기 위해 클래스에 추가
        checkboxes.classList.add('checkbox');

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
 
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');  
        //delete 버튼을 클래스에 추가하여 css 적용

        li.appendChild(checkboxes);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);

        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            todoList.removeChild(li);
        });

        checkboxes.addEventListener('click', function() {
            if (checkboxes.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
        });

        todoList.appendChild(li);
        input.value = '';
    });
});

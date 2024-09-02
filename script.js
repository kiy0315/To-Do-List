document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // 페이지 로드 시 localStorage에서 저장된 할 일 불러오기
    loadTodos();

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const taskText = input.value.trim();
        if (taskText === '') return;

        // 새로운 할 일을 리스트에 추가
        addTodo(taskText);
        input.value = '';

        // 할 일 목록을 localStorage에 저장
        saveTodos();
    });

    // 할 일 항목 추가 함수
    function addTodo(taskText, isCompleted = false) {
        const li = document.createElement('li');

        //checkbox를 만들기 위해 input과 type으로 check 박스로 지정 및 클래스를 만들어 css 적용
        const checkboxes = document.createElement('input');
        checkboxes.type = 'checkbox';
        checkboxes.classList.add('checkbox');
        checkboxes.checked = isCompleted; // 할 일 완료 상태 설정

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        
        //Delete 버튼을 클릭했을 시 이벤트가 발생하여 todoList에서 삭제
        deleteButton.addEventListener('click', function() {
            todoList.removeChild(li);
            saveTodos(); // 할 일이 삭제되면 localStorage에 저장
        });

        //Checkbox를 클릭시 checked 이벤트 발생
        checkboxes.addEventListener('click', function() {
            if (checkboxes.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTodos(); // 상태 변경 시에도 localStorage에 저장
        });

        li.appendChild(checkboxes);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);

        if (checkboxes.checked) {
            li.classList.add('completed');
        }

        todoList.appendChild(li);
    }

    // 할 일 목록을 localStorage에 저장하는 함수
    function saveTodos() {
        // JSON 형식으로 변환하기 위해 빈 배열 생성
        const todos = [];

        // todoList 안에 있는 모든 <li> 요소들을 선택
        todoList.querySelectorAll('li').forEach(li => {
            const checkbox = li.querySelector('input[type="checkbox"]');
            const text = li.querySelector('span').textContent;
            // 배열에 객체 형태로 추가합니다. 객체는 텍스트와 체크박스의 상태를 포함합니다.
            todos.push({ text, completed: checkbox.checked });
        });

        // Key : Value 형식으로 저장하기 위해 JSON 문자열로 변환하고 localStorage에 저장합니다.
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 페이지 로드 시 할 일 목록을 localStorage에서 불러오는 함수
    function loadTodos() {
        // localStorage에서 'todos' 키로 저장된 JSON 문자열을 가져온다
        // JSON 문자열을 자바스크립트 객체로 변환한다.
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            // todos 배열의 각 항목을 순회하며 addTodo 함수를 호출하여 페이지에 할 일 목록을 복원합니다.
            todos.forEach(todo => addTodo(todo.text, todo.completed));
        }
    }
});

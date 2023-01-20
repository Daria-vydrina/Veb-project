function addListElement(){
    let ul = document.getElementById('table_ul');
    let li = document.createElement('li');
    li.innerHTML = `
    <form class="list_element">
        <div class="checked">
            <input type="checkbox" name="checked" id="checked">
        </div>
        <input type="text" name="task" id="task" class="task" placeholder="Введите задачу">
        <input type="date" name="date" id="date" class="date" placeholder="Введите дату">
        <input type="text" name="note" id="note" class="note" placeholder="Краткое описание заметки">
        <input type="text" name="more" id="more" class="more" placeholder="Что-то еще?)">
    </form>
    `;
    ul.appendChild(li);
}


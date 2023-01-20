var Cal = function(divId) {

    //Сохраняем идентификатор div
    this.divId = divId;

    // Дни недели с понедельника
    this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чтв',
        'Птн',
        'Суб',
        'Вск'
    ];

    // Месяцы начиная с января
    this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    //Устанавливаем текущий месяц, год
    var d = new Date();

    this.currMonth = d.getMonth('1');
    this.currYear = d.getFullYear('23');
    this.currDay = d.getDate('20');
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    } else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    } else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Показать текущий месяц
Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
};



// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {

    var d = new Date()
        // Первый день недели в выбранном месяце 
        ,
        firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        ,
        lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Последний день предыдущего месяца
        ,
        lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';


    // заголовок дней недели
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Записываем дни
    var i = 1;
    do {

        var dow = new Date(y, m, i).getDay();

        // Начать новую строку в понедельник
        if (dow == 1) {
            html += '<tr>';
        }

        // Если первый день недели не понедельник показать последние дни предыдущего месяца
        else if (i == 1) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += getHtml("not-current", k);
                k++;
            }
        }

        // Записываем текущий день в цикл
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        console.log(new Date());
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += getHtml("today", i);
        } else {
            html += getHtml("normal", i);
        }
        // закрыть строку в воскресенье
        if (dow == 0) {
            html += '</tr>';
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 7; dow++) {
                html += getHtml("not-current", k);
                k++;
            }
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Конец таблицы
    html += '</table>';

    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
};

// При загрузке окна
window.onload = function() {

    // Начать календарь
    var c = new Cal("divCal");
    c.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
        c.previousMonth();
    };
}

// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}

function getHtml(day, num) {
    let html = '';

    if (day == "today") {
        html += `<td class="${day}">
                <div class="wrapper">
                    <div class="head">
                        <span class="day">${num}</span>
                        <span class="add" onclick="addTask('_${day}_${num}')">+</span>
                    </div>
                    <div class="body">
                        <ul id="ul_${day}_${num}">
                            <li>
                                <button class="button button_event" onclick="addTask('_${day}_${num}')">
                                    <span>купить конфетки</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>`;
    } else {

        html += `<td class="${day}">
                <div class="wrapper">
                    <div class="head">
                        <span class="day">${num}</span>
                        <span class="add" onclick="addTask('_${day}_${num}')">+</span>
                    </div>
                    <div class="body">
                        <ul id="ul_${day}_${num}">

                        </ul>
                    </div>
                </div>
            </td>`;
    }
    return html;
}

function addTask(date) {

    let body = document.getElementById("bd");

    let div = document.createElement("div");
    div.innerHTML = `    <div class="modal" id="modal modal${date}">
    <div class="modal_wrapper">
        <header>
            <div class="modal_header"><span class="modal_header_close" 
                                  onclick="let modal = document.getElementById('modal modal${date}') 
                                           modal.style.opacity = 0
                                           modal.style.visibility = 'hidden'">x</span></div>
        </header>
        <div class="modal_body">
            <div class="fields">
                <form>
                    <div class="field">
                        <input type="text" name="name${date}" id="name_of_task" placeholder="название">
                    </div>
                    <div class="field datetime">
                        <label for="date" class="date_label label">
                            <span>дата</span> <input type="date" name="date" id="date">
                        </label>
                        <label for="time" class="time_label label">
                            <span>время</span> <input type="time" name="time" id="time">
                        </label>
                    </div>
                    <div class="field">
                        <label for="textarea" class="for_textarea">
                            <span class="notes">заметки</span>
                            <textarea name="textarea" id="textarea" cols="100" rows="23"></textarea>
                        </label>
                    </div>
                    <input type="submit" value="сохранить изменения" class="button button_main">
                </form>
            </div>
        </div>
    </div>
</div>`;

    body.appendChild(div);

    let modal = document.getElementById(`modal modal${date}`);
    modal.style.opacity = 1;
    modal.style.visibility = 'visible';

    console.log(modal);
}

function addListElement() {

}
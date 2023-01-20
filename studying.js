function changeInput(id, value) {
    let element = document.getElementById(id);
    element.value = value;
}

function showModal() {
    let modal = document.getElementById(`modal`);
    modal.style.opacity = 1;
    modal.style.visibility = 'visible';
}

function closeModal() {
    let modal = document.getElementById('modal');
    modal.style.opacity = 0;
    modal.style.visibility = 'hidden';
}
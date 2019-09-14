const weatherForm = document.getElementById('search_form');
const searchInput = document.getElementById('search_input');
const searchLoader = document.getElementById('search_loader');
const messagesWrap = document.getElementById('messages_wrap');
const message1 = document.getElementById('message_1');
const message2 = document.getElementById('message_2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchInput.value;

    searchLoader.classList.remove('hide');
    messagesWrap.classList.add('hide');

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            searchLoader.classList.add('hide');
            messagesWrap.classList.remove('hide');

            if (data.error) {
                message1.classList.add('error__message');
                message1.textContent = data.error;
                message2.textContent = '';
            } else {
                message1.classList.remove('error__message');
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        });
    });
});
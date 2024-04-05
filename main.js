const apiKey = '03cfe5c852b54690b88134201240504';

const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

// Слушаем отправку формы
form.onsubmit = function (e) {
    e.preventDefault();
    let city = input.value.trim();
    
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if(data.error) {
                const prevCard = document.querySelector('.card');
                if(prevCard) prevCard.remove(); 
                // Обработка ошибки, если таковая имеется
                const html = `<div class="card">${data.error.massage}</div>`

                header.insertAdjacentHTML('afterend', html);
            } else {
               const prevCard = document.querySelector('.card');
                if(prevCard) prevCard.remove(); 

                const html = `<div class="card">
                    <h2 class="card-city">
                        ${data.location.name}<span>${data.location.country}</span>
                    </h2>
            
                    <div class="card-weather">
                        <div class="card-value">${data.current.temp_c}<sup>&deg;c</sup></div>
                        <img class="card-img" src="./image/example.png" alt="Weather" width="200" height="auto">
                    </div> 
                    
                    <div class="card-desc">
                        ${data.current.condition.text}
                    </div>
                </div>`;

                header.insertAdjacentHTML('afterend', html);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
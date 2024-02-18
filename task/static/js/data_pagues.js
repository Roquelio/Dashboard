async function fetchData2() {
    const response = await fetch("https://test-gliv.onrender.com/getPagues");
    const data = await response.json();

    const bolchile = data.message.Bolchile;
    const yahoo = data.message.Yahoo;

    document.getElementById('bol').innerText = bolchile;
    document.getElementById('yahoo').innerText = yahoo;
  }
async  function fetchInvesPrice() {
    fetch('https://test-gliv.onrender.com/ver_datos_dash')
        .then(response => response.json())
        .then(data => {
            // Obtener el precio de inves de los datos
            const invesPrice = data.inves;

            // Obtener el elemento con el ID "inves"
            const invesElement = document.getElementById('inves');

            // Verificar si el elemento y el precio existen
            if (invesElement && invesPrice) {
                // Asignar el precio al innerText del elemento
                invesElement.innerText = invesPrice;
            } else {
                console.error('No se pudo encontrar el elemento o el precio no está definido.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

  function fetchData() {
    fetch('https://api.investing.com/api/financialdata/table/list/2110?fieldmap=general.slim')
        .then(response => response.json())
        .then(data => {
            // Obtener el precio de la respuesta
            const price = data.data[0].data[1];

            // Crear el payload con el dato de price
            const payload = { 'inves': price };

            // Hacer la solicitud POST a la ruta especificada
            fetch('https://test-gliv.onrender.com/data_dash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => console.error('Error sending data:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Llama a la función fetchData para enviar el dato
fetchData();
fetchData2();
fetchInvesPrice();

setInterval(fetchInvesPrice, 5000);
setInterval(fetchData, 2000);
setInterval(fetchData2, 10000);
    let inicioCMppc = [];
    let inicioCMppv = [];
    let iniciobudappc = [];
    let iniciobudappv = [];
    let iniciovitappc = [];
    let iniciovitappv = [];
    let inicioorionppc = [];
    let iniciorionppv = [];
    let iniciootcppc = [];
    let iniciobinanceppc = [];
    let inicibinanceppv = [];

function extractCurrencyPair(message) {
    const regex = /\[([^\]]+)\]/;
    const matches = regex.exec(message);
    return matches && matches[1] ? matches[1] : 'N/A';
}

function getSourceName(value, ...prices) {
    const index = prices.findIndex(price => price === value);
    const exchanges = ['Cryptomarket', 'Buda', 'Vita', 'Orion', 'Binance','Buda OTC', 'Orion OTC', 'Kundai OTC', ];
    const exchangeName = exchanges[index] || 'N/A';
    const currencyPair = extractCurrencyPair(value);
    
    return { exchange: exchangeName, currencyPair: currencyPair };
}




function getPriceValues(data) {
    const sources = ['cm', 'buda', 'vita', 'orion', 'otc', 'binance'];

    for (const source of sources) {
        if (data[source] && data[source].message) {
            const ppcValue = data[source].message.ppc;
            const ppvValue = data[source].message.ppv;

            if (ppcValue && ppvValue) {
                return {
                    ppc: parseFloat(ppcValue.split(":")[1].trim()),
                    ppv: parseFloat(ppvValue.split(":")[1].trim())
                };
            }
        }
    }

    // Si no se encuentra la información esperada, puedes manejarlo según tus necesidades.
    console.error('No se encontraron valores de precios en las fuentes especificadas.');
    return null;
}



async function fetchDataAndDisplay() {
    try {
        // CriptoMarkert
        const dataCmResponse = await fetch("https://test-gliv.onrender.com/ver_datos_dash");
        const dataCm = await dataCmResponse.json();
        document.querySelector("#data-cm").innerHTML = `${dataCm.cm.message.ppc} <br /> ${dataCm.cm.message.ppv}`;

        // Buda
        const dataBudaResponse = await fetch("https://test-gliv.onrender.com/ver_datos_dash");
        const dataBuda = await dataBudaResponse.json();
        document.querySelector("#data_buda").innerHTML = `${dataBuda.buda.message.ppc} <br /> ${dataBuda.buda.message.ppv}`;

        // Vita
        const dataVitaResponse = await fetch("https://test-gliv.onrender.com/ver_datos_dash");
        const dataVita = await dataVitaResponse.json();
        document.querySelector("#data-vita").innerHTML = `${dataVita.vita.message.ppc} <br /> ${dataVita.vita.message.ppv}`;

        // OrionX
        const dataOrionResponse = await fetch("https://test-gliv.onrender.com/ver_datos_dash");
        const dataOrion = await dataOrionResponse.json();
        document.querySelector("#data_orion").innerHTML = `${dataOrion.orion.message.ppc} <br /> ${dataOrion.orion.message.ppv}`;

        // OTC
        const dataOtcResponse = await fetch("https://test-gliv.onrender.com/ver_datos_dash");
        const dataOtc = await dataOtcResponse.json();

        const dataOtcElement = document.querySelector("#data_otc");

        let budaOTCPrice = null;
        let orionOTCPrice = null;
        let kundaiOTCPrice = null;

        if ("otc" in dataOtc) {
            const otcMessageType = typeof dataOtc.otc.message;

            if (otcMessageType === "string") {
                // Si el mensaje es una cadena, asumimos que es un mensaje de error
                dataOtcElement.innerHTML = dataOtc.otc.message;
            } else if (otcMessageType === "object") {
                const otcMessage = dataOtc.otc.message;
                budaOTCPrice = otcMessage["Buda OTC"] || null;
                orionOTCPrice = otcMessage["Orion OTC"] || null;
                kundaiOTCPrice = otcMessage["Kundai OTC"] || null;

                // Si el mensaje es un objeto, asumimos que es un mensaje exitoso
                dataOtcElement.innerHTML = `
                    Buda OTC: ${budaOTCPrice || 'N/A'} <br />
                    Orion OTC: ${orionOTCPrice || 'N/A'} <br />
                    Kundai OTC: ${kundaiOTCPrice || 'N/A'}
                `;
            }
        } else {
            // Si no hay mensaje en la respuesta, mostrar un mensaje de error genérico
            dataOtcElement.innerHTML = "Error: No se pudo obtener la respuesta del servidor.";
        }


        // Binance
        const dataBinanceResponse = await fetch("https://test-gliv.onrender.com/ver_datos_dash");
        const dataBinance = await dataBinanceResponse.json();
        document.querySelector("#data_binance").innerHTML = `${dataBinance.binance.message.ppc} <br /> ${dataBinance.binance.message.ppv}`;

        //Mejor Precio
        const cmPrices = getPriceValues(dataCm);
        const budaPrices = getPriceValues(dataBuda);
        const vitaPrices = getPriceValues(dataVita);
        const orionPrices = getPriceValues(dataOrion);
        const binancePrices = getPriceValues(dataBinance);
        const cmPrice = cmPrices.ppc;
        const budaPrice = budaPrices.ppc;
        const vitaPrice = vitaPrices.ppc;
        const orionPrice = orionPrices.ppc;
        const binancePrice = binancePrices.ppc;
        const cmPriceV = cmPrices.ppv;
        const budaPriceV = budaPrices.ppv;
        const vitaPriceV = vitaPrices.ppv;
        const orionPriceV = orionPrices.ppv;
        const binancePriceV = binancePrices.ppv;

        const currentChileTime = new Date().toLocaleString("en-US", { timeZone: "America/Santiago" });
        const currentHour = new Date(currentChileTime).getHours();
        const currentDay = new Date(currentChileTime).getDay();
        let minPrice;

        if (currentDay >= 1 && currentDay <= 5 && currentHour > 9 && currentHour < 14) {
            // El día actual es de lunes a viernes y la hora está entre las 9 y las 14 horas
            minPrice = Math.min(cmPrice, budaPrice, vitaPrice, orionPrice, binancePrice, budaOTCPrice, orionOTCPrice, kundaiOTCPrice);
        } else {
            // En caso contrario
            minPrice = Math.min(cmPrice, budaPrice, vitaPrice, orionPrice, binancePrice);
        }



        const maxPrice = Math.max(cmPriceV, budaPriceV, vitaPriceV, orionPriceV, binancePriceV);

        const sourceMinPrice = getSourceName(minPrice, cmPrice, budaPrice, vitaPrice, orionPrice, binancePrice, budaOTCPrice, orionOTCPrice, kundaiOTCPrice);
        const sourceMaxPrice = getSourceName(maxPrice, cmPriceV, budaPriceV, vitaPriceV, orionPriceV, binancePriceV);

        document.getElementById("best_price").innerHTML = `
        El mejor precio de compra es ${minPrice} de ${sourceMinPrice.exchange}. <br>
        El mejor precio de venta es ${maxPrice} de ${sourceMaxPrice.exchange}.
    `;

        var ctx = document.getElementById("nelson_grafico").getContext("2d");
        var myAreaChart;

        function createChart(dataCm, dataBuda, dataVita, dataOrion, dataBinance) {
            if (myAreaChart) {
                myAreaChart.destroy();
            }

            function generateLabels() {
                const labels = [];
                const currentMinute = new Date().getUTCMinutes();
                const currentBlockStart = currentMinute - (currentMinute % 5);
                const currentHour = new Date().getUTCHours() - 3; // Ajuste para la hora actual en Chile

                for (let i = 0; i < 300; i += 5) {
                    const hour = currentHour + Math.floor((currentBlockStart + i) / 60);
                    const minute = ((currentBlockStart + i) % 60).toString().padStart(2, "0");
                    labels.push(`${hour.toString().padStart(2, "0")}:${minute}`);
                }

                return labels;
            }

            // Generar los labels antes de crear el gráfico
            const labels = generateLabels();

            inicioCMppc.push(extractValue(dataCm.cm.message.ppc));
            inicioCMppv.push(extractValue(dataCm.cm.message.ppv));

            iniciobudappc.push(extractValue(dataBuda.buda.message.ppc));
            iniciobudappv.push(extractValue(dataBuda.buda.message.ppv));

            iniciovitappc.push(extractValue(dataVita.vita.message.ppc));
            iniciovitappv.push(extractValue(dataVita.vita.message.ppv));

            inicioorionppc.push(extractValue(dataOrion.orion.message.ppc));
            iniciorionppv.push(extractValue(dataOrion.orion.message.ppv));

            iniciobinanceppc.push(extractValue(dataBinance.binance.message.ppc));
            inicibinanceppv.push(extractValue(dataBinance.binance.message.ppv));

            myAreaChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels, // Usar los labels generados
                    datasets: [
                        {
                            label: "CriptoMarket PPC",
                            data: inicioCMppc,
                            fill: false,
                            borderColor: "blue",
                            pointBackgroundColor: "green",
                            tension: 0.1,
                        },
                        {
                            label: "CriptoMarket PPV",
                            data: inicioCMppv,
                            fill: false,
                            borderColor: "blue",
                            pointBackgroundColor: "red",
                            tension: 0.1,
                        },
                        {
                            label: "Buda PPC",
                            data: iniciobudappc,
                            fill: false,
                            borderColor: "purple", // Azul claro para PPV
                            pointBackgroundColor: "green", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                        {
                            label: "Buda PPV",
                            data: iniciobudappv,
                            fill: false,
                            borderColor: "purple", // Azul claro para PPV
                            pointBackgroundColor: "red", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                        {
                            label: "Vita PPC",
                            data: iniciovitappc,
                            fill: false,
                            borderColor: "green", // Azul claro para PPV
                            pointBackgroundColor: "green", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                        {
                            label: "Vita PPV",
                            data: iniciovitappv,
                            fill: false,
                            borderColor: "green", // Azul claro para PPV
                            pointBackgroundColor: "red", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                        {
                            label: "OrionX PPC",
                            data: inicioorionppc,
                            fill: false,
                            borderColor: "lightblue", // Azul claro para PPV
                            pointBackgroundColor: "green", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                        {
                            label: "OrionX PPV",
                            data: iniciorionppv,
                            fill: false,
                            borderColor: "lightblue", // Azul claro para PPV
                            pointBackgroundColor: "red", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                        {
                            label: "Binance PPC",
                            data: iniciobinanceppc,
                            fill: false,
                            borderColor: "yellow", // Azul claro para PPV
                            pointBackgroundColor: "green", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                        {
                            label: "Binance PPV",
                            data: inicibinanceppv,
                            fill: false,
                            borderColor: "yellow", // Azul claro para PPV
                            pointBackgroundColor: "red", // Puntos rojos para PPV
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            ticks: {
                                callback: function (value, index, values) {
                                    return index * 5 + 'h';
                                },
                            },
                        },
                    },    
                },
            });
        }

        function updateChart(dataCm, dataBuda, dataVita, dataOrion, dataBinance) {
            myAreaChart.data.datasets[0].data = [extractValue(dataCm.message.ppc), extractValue(dataBuda.message.ppc), extractValue(dataVita.message.ppc), extractValue(dataOrion.message.ppc), extractValue(dataBinance.message.ppc)];
            myAreaChart.data.datasets[1].data = [extractValue(dataCm.message.ppv), extractValue(dataBuda.message.ppv), extractValue(dataVita.message.ppv), extractValue(dataOrion.message.ppv), extractValue(dataBinance.message.ppv)];
            myAreaChart.update();
        }

        function extractValue(data) {
            const match = data.match(/\d+\.\d+/);
            return match ? parseFloat(match[0]) : NaN;
        }

        createChart(dataCm, dataBuda, dataVita, dataOrion, dataBinance);

        setInterval(async function () {
            updateChart(dataCm, dataBuda, dataVita, dataOrion, dataBinance);
            try {
                // Actualizar datos de Buda, Vita y Orion
            } catch (error) {
                console.error("Error fetching or updating data:", error);
            }
        }, 60000);

    } catch (error) {
        console.error("Error fetching or displaying data:", error);
    }
}

// Agregar una verificación antes de realizar solicitudes
async function fetchDataAndDisplayIfInSpecificRoute() {
    // Obtener la ruta actual del navegador
    const currentPath = window.location.pathname;

    // Verificar si estás en la ruta específica donde deseas realizar solicitudes
    if (currentPath === '/dash/') {
        await fetchDataAndDisplay();
    } else {
        // Detener el intervalo si no estás en la ruta específica
        stopInterval();
    }
}

// Llamar a fetchDataAndDisplayIfInSpecificRoute inicialmente
fetchDataAndDisplayIfInSpecificRoute();

// Agregar un evento para verificar la ruta antes de realizar solicitudes
window.addEventListener('hashchange', fetchDataAndDisplayIfInSpecificRoute);


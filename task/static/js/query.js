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
    const exchanges = ['Cryptomarket', 'Buda', 'Vita', 'Orion', 'Binance', 'Orion OTC', 'Buda OTC', 'Kundai OTC', ];
    const exchangeName = exchanges[index] || 'N/A';
    const currencyPair = extractCurrencyPair(value);
    
    return { exchange: exchangeName, currencyPair: currencyPair };
}




function getPriceValues(data) {
    return {
        ppc: parseFloat(data.message.ppc.split(":")[1].trim()),
        ppv: parseFloat(data.message.ppv.split(":")[1].trim())
    };
}


async function fetchDataAndDisplay() {
    try {
        // CriptoMarkert
        const dataCmResponse = await fetch("https://test-gliv.onrender.com/getDataCm");
        const dataCm = await dataCmResponse.json();
        document.querySelector("#data-cm").innerHTML = `${dataCm.message.ppc} <br /> ${dataCm.message.ppv}`;

        // Buda
        const dataBudaResponse = await fetch("https://test-gliv.onrender.com/getDataBuda");
        const dataBuda = await dataBudaResponse.json();
        document.querySelector("#data_buda").innerHTML = `${dataBuda.message.ppc} <br /> ${dataBuda.message.ppv}`;

        // Vita
        const dataVitaResponse = await fetch("https://test-gliv.onrender.com/getDataVita");
        const dataVita = await dataVitaResponse.json();
        document.querySelector("#data-vita").innerHTML = `${dataVita.message.ppc} <br /> ${dataVita.message.ppv}`;

        // OrionX
        const dataOrionResponse = await fetch("https://test-gliv.onrender.com/getDataOrion");
        const dataOrion = await dataOrionResponse.json();
        document.querySelector("#data_orion").innerHTML = `${dataOrion.message.ppc} <br /> ${dataOrion.message.ppv}`;

        // OTC
        const dataOtcResponse = await fetch("https://test-gliv.onrender.com/getDataOtc");
        const dataOtc = await dataOtcResponse.json();

        const dataOtcElement = document.querySelector("#data_otc");
        let budaOTCPrice, orionOTCPrice, kundaiOTCPrice;

        if ("message" in dataOtc) {
            const messageType = typeof dataOtc.message;

            if (messageType === "string") {
                // Si el mensaje es una cadena, asumimos que es un mensaje de error
                dataOtcElement.innerHTML = dataOtc.message;
            } else if (messageType === "object") {
                budaOTCPrice = dataOtc.message["Buda OTC"] ?? null;
                orionOTCPrice = dataOtc.message["Orion OTC"] ?? null;
                kundaiOTCPrice = dataOtc.message["Kundai OTC"] ?? null;                                                             
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
        const dataBinanceResponse = await fetch("https://test-gliv.onrender.com/getDataBinance");
        const dataBinance = await dataBinanceResponse.json();
        document.querySelector("#data_binance").innerHTML = `${dataBinance.message.ppc} <br /> ${dataBinance.message.ppv}`;

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

        const nonNullOTCPrices = [budaOTCPrice, orionOTCPrice, kundaiOTCPrice].filter(price => price !== null);
        const minOTCPrice = nonNullOTCPrices.length > 0 ? Math.min(...nonNullOTCPrices) : null;
        const minPrice = Math.min(cmPrice, budaPrice, vitaPrice, orionPrice, binancePrice, minOTCPrice);
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

            inicioCMppc.push(extractValue(dataCm.message.ppc));
            inicioCMppv.push(extractValue(dataCm.message.ppv));

            iniciobudappc.push(extractValue(dataBuda.message.ppc));
            iniciobudappv.push(extractValue(dataBuda.message.ppv));

            iniciovitappc.push(extractValue(dataVita.message.ppc));
            iniciovitappv.push(extractValue(dataVita.message.ppv));

            inicioorionppc.push(extractValue(dataOrion.message.ppc));
            iniciorionppv.push(extractValue(dataOrion.message.ppv));

            iniciobinanceppc.push(extractValue(dataBinance.message.ppc));
            inicibinanceppv.push(extractValue(dataBinance.message.ppv));

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

fetchDataAndDisplay();
setInterval(fetchDataAndDisplay, 60000);

let inicioCMppc = [];
let inicioCMppv = [];
let iniciobudappc = [];
let iniciobudappv = [];
let iniciovitappc = [];
let iniciovitappv = [];
let inicioorionppc = [];
let iniciorionppv = [];

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

        var ctx = document.getElementById("nelson_grafico").getContext("2d");
        var myAreaChart;

        function createChart(dataCm, dataBuda, dataVita, dataOrion) {
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

        function updateChart(dataCm, dataBuda, dataVita, dataOrion) {
            myAreaChart.data.datasets[0].data = [extractValue(dataCm.message.ppc), extractValue(dataBuda.message.ppc), extractValue(dataVita.message.ppc), extractValue(dataOrion.message.ppc)];
            myAreaChart.data.datasets[1].data = [extractValue(dataCm.message.ppv), extractValue(dataBuda.message.ppv), extractValue(dataVita.message.ppv), extractValue(dataOrion.message.ppv)];
            myAreaChart.update();
        }

        function extractValue(data) {
            const match = data.match(/\d+\.\d+/);
            return match ? parseFloat(match[0]) : NaN;
        }

        createChart(dataCm, dataBuda, dataVita, dataOrion);

        setInterval(async function () {
            updateChart(dataCm, dataBuda, dataVita, dataOrion);
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

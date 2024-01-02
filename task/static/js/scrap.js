const listDataUsdt = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapUsdt");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const usdtCell = $(`#usdt-${index + 1}`);
            usdtCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#usdt-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataBtc = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapBtc");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const btcCell = $(`#btc-${index + 1}`);
            btcCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#btc-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataEth = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapEth");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const ethCell = $(`#eth-${index + 1}`);
            ethCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#eth-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataBnb = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapBnb");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const bnbCell = $(`#bnb-${index + 1}`);
            bnbCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#bnb-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataDai = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapDai");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const daiCell = $(`#dai-${index + 1}`);
            daiCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#dai-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataFdusd = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapFdusd");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const fdusdCell = $(`#fdusd-${index + 1}`);
            fdusdCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#fdusd-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataDoge = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapDogue");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const dogeCell = $(`#doge-${index + 1}`);
            dogeCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#doge-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataAda = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapAda");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const adaCell = $(`#ada-${index + 1}`);
            adaCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#ada-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataXrp = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapXrp");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.buy?.forEach((ad, index) => {
            const xrpCell = $(`#xrp-${index + 1}`);
            xrpCell.text(ad.TradeType === 'buy' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#xrp-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellUsdt = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapUsdt");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const usdtCell = $(`#susdt-${index + 1}`);
            usdtCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#susdt-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellBtc = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapBtc");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const btcCell = $(`#sbtc-${index + 1}`);
            btcCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#sbtc-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellEth = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapEth");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const ethCell = $(`#seth-${index + 1}`);
            ethCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#seth-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellBnb = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapBnb");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const bnbCell = $(`#sbnb-${index + 1}`);
            bnbCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#sbnb-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellDai = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapDai");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const daiCell = $(`#sdai-${index + 1}`);
            daiCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#sdai-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellFdusd = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapFdusd");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const fdusdCell = $(`#sfdusd-${index + 1}`);
            fdusdCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#sfdusd-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellDoge = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapDogue");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const dogeCell = $(`#sdoge-${index + 1}`);
            dogeCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#sdoge-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellAda = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapAda");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const adaCell = $(`#sada-${index + 1}`);
            adaCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#sada-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};

const listDataSellXrp = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/getScrapXrp");
        const data = await response.json();

        // console.log("Datos recibidos:", data);

        data?.sell?.forEach((ad, index) => {
            const xrpCell = $(`#sxrp-${index + 1}`);
            xrpCell.text(ad.TradeType === 'sell' ? 'X' : '-');

            const formattedInfo = `
                    ${ad.NickName} |
                    ${ad.Price} | ${ad.TradableQuantity} |
                    ${ad.minSingleTransAmount} | ${ad.dynamicMaxSingleTransAmount}
                `;

            const infoCell = $(`#sxrp-${index + 1}`);
            infoCell.text(formattedInfo);
        });

    } catch (ex) {
        console.error(ex);
    }
};
// Función que realiza las solicitudes
async function fetchData() {
    listDataSellUsdt();
    listDataUsdt();

    listDataSellBtc();
    listDataBtc();

    listDataSellEth();
    listDataEth();

    listDataSellBnb();
    listDataBnb();

    listDataSellDai();
    listDataDai();

    listDataSellFdusd();
    listDataFdusd();

    listDataSellDoge();
    listDataDoge();

    listDataSellAda();
    listDataAda();

    listDataSellXrp();
    listDataXrp();
}

// Verificar la ruta antes de realizar solicitudes
function fetchDataIfInSpecificRoute() {
    // Obtener la ruta actual del navegador
    const currentPath = window.location.pathname;

    // Verificar si estás en la ruta específica donde deseas realizar solicitudes
    if (currentPath === '/tables/') {
        fetchData();
    } else {
        // Detener el intervalo si no estás en la ruta específica
        stopInterval();
    }
}

// Llamar a fetchDataIfInSpecificRoute inicialmente
fetchDataIfInSpecificRoute();

// Agregar un evento para verificar la ruta antes de realizar solicitudes
window.addEventListener('hashchange', fetchDataIfInSpecificRoute);

// Detener el intervalo cuando se cierra la página
window.addEventListener('beforeunload', stopInterval);

// Intervalo para realizar las solicitudes
const intervalId = setInterval(fetchDataIfInSpecificRoute, 5000);

// Función para detener el intervalo
function stopInterval() {
    clearInterval(intervalId);
}

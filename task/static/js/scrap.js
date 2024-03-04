const listData = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/ver_datos");
        const data = await response.json();

        ['buy2', 'sell2'].forEach((tradeType) => {
            ['USDT', 'DAI', 'FDUSD'].forEach((symbol) => {
                const symbolData = data[tradeType][symbol];

                if (symbolData) {
                    symbolData.forEach((ad, index) => {
                        updateTradeTypeData(data, symbol, tradeType, index);
                    });
                } else {
                    console.error(`Datos no válidos recibidos para ${symbol}:`, data);
                }
            });
        });
    } catch (ex) {
        console.error(ex);
    }
};
const listData2 = async () => {
    try {
        const response = await fetch("https://test-gliv.onrender.com/ver_datos");
        const data = await response.json();

        ['buy', 'sell'].forEach((tradeType) => {
            ['BTC', 'ETH', 'BNB', 'DOGE', 'ADA', 'XRP'].forEach((symbol) => {
                const symbolData = data[tradeType][symbol];

                if (symbolData) {
                    symbolData.forEach((ad, index) => {
                        updateTradeTypeData(data, symbol, tradeType, index);
                    });
                } else {
                    console.error(`Datos no válidos recibidos para ${symbol}:`, data);
                }
            });
        });
    } catch (ex) {
        console.error(ex);
    }
};

const updateTradeTypeData = (data, symbol, tradeType, index) => {
    const cell = $(`#${tradeType}-${symbol.toLowerCase()}-${index + 1}`);
    const ad = data[tradeType][symbol][index];

    if (!ad) {
        console.error(`Datos no válidos recibidos para ${tradeType} de ${symbol}:`, data);
        return;
    }

    cell.text('X'); // Marcar como 'X' ya que se recibió el dato

    const formattedInfo = `
    ${ad.NickName} \n
    Precio: ${ad.Price} \n
    Cantidad: ${ad.TradableQuantity} \n
    Limite:${ad.minSingleTransAmount}-${ad.dynamicMaxSingleTransAmount}
    `;
    
    const infoCell = $(`#${tradeType}-${symbol.toLowerCase()}-${index + 1}`);
    infoCell.text(formattedInfo);
};

listData();
listData2();

setInterval(listData, 1000);
setInterval(listData2, 1000);

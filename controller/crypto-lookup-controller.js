import axios from "axios";
const apiKey = "f5BrCoKTD7Zhuo5OKHLCK2dyAmWPSreVEGz";

function formatNumber(value, options = {}) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value ?? "N/A";
  }

  return numericValue.toLocaleString("en-US", options);
}

export function getWorldCoinIndex (req, res) {
  res.render("worldcoinindex.ejs", {
    coinData: null,
    coinLabel: "",
    errorMessage: null,
    marketList: [],
    showForm: true,
  });
}

export async function getWorldCoinList(req, res) {
  const apiUrl = `https://www.worldcoinindex.com/apiservice/v2getmarkets?key=${apiKey}&fiat=btc`;
  let marketList = [];
  let errorMessage = null;

  try {
    const response = await axios.get(apiUrl);
    const markets = response.data?.Markets?.[0] ?? [];

    marketList = markets.map((market) => ({
      label: market.Label,
      name: market.Name,
    }));
  } catch (error) {
    console.error("Error fetching full market list:", error);
    errorMessage =
      error.response?.data?.Message ||
      "We couldn't load the full WorldCoinIndex market list right now.";
  }

  res.render("worldcoinindex.ejs", {
    coinData: null,
    coinLabel: "",
    errorMessage,
    marketList,
    showForm: false,
  });
}

export async function getSnapshot(req, res) {
  const coinLabel = (req.body.coinLabel ?? "").trim().split("/")[0].toLowerCase();
  const apiUrl = `https://www.worldcoinindex.com/apiservice/ticker?key=${apiKey}&label=${coinLabel + 'btc'}&fiat=btc`;
  let data = null;
  let errorMessage = null;

  try {
    const response = await axios.get(apiUrl);
    data = response.data?.Markets?.[0] ?? null;

    if (!data) {
      errorMessage = `No market data was found for "${coinLabel}".`;
    } else {
      data = {
        ...data,
        formattedPrice: formatNumber(data.Price, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 8,
        }),
        formattedVolume24h: formatNumber(data.Volume_24h, {
          maximumFractionDigits: 2,
        }),
      };
    }
  } catch (error) {
    console.error("Error fetching world coin index data:", error);
    errorMessage =
      error.response?.data?.Message ||
      "We couldn't reach WorldCoinIndex right now. Please try again in a moment.";
  }

  res.render("worldcoinindex.ejs", {
    coinData: data,
    errorMessage,
    coinLabel,
    marketList: [],
    showForm: true,
  });
}

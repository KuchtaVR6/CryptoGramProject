import {Currency} from "../Currencies/Currency";
import {CryptoCurrency} from "../Currencies/CryptoCurrency";
import {FiatCurrency} from "../Currencies/FiatCurrency";
import {Network} from "../Wallets/Network";
import {currencyCrypto, currencyFiat} from "../Types";

export class CurrencyManager {

  private currencies: Map<number, Currency>;

  private static instance: CurrencyManager | null = null;

  // For searching the Map
  private firstIDCrypto = 1; // NOTE: ids below match with the ids in fetchHoldings.json
  private firstIDFiat = 101; // NOTE: ids below match with the ids in fetchCurrency.json

  private constructor() {
    this.currencies = new Map<number, Currency>();

    // Crypto Currencies below - taken in order as in fetchHoldings.json from GUI repo
    const epmtyNetworkMap: Map<number, Network> = new Map();
    this.currencies.set((this.firstIDCrypto), new CryptoCurrency(1, "Bitcoin", "BTC", 30000, epmtyNetworkMap, "bitcoin"))
    this.currencies.set((this.firstIDCrypto + 1), new CryptoCurrency(2, "Litecoin", "LTC", 131, epmtyNetworkMap, "litecoin"))
    this.currencies.set((this.firstIDCrypto + 2), new CryptoCurrency(3, "Binance Smart Coin", "BNB", 440, epmtyNetworkMap, "binancecoin"))
    this.currencies.set((this.firstIDCrypto + 3), new CryptoCurrency(4, "Ripple", "XRP", 0.86, epmtyNetworkMap, "ripple"))
    this.currencies.set((this.firstIDCrypto + 4), new CryptoCurrency(5, "Cardano", "ADA", 1.19, epmtyNetworkMap, "cardano"))
    this.currencies.set((this.firstIDCrypto + 5), new CryptoCurrency(6, "Solana", "SOL", 111, epmtyNetworkMap, "solana"))
    this.currencies.set((this.firstIDCrypto + 6), new CryptoCurrency(7, "Terra Luna", "LUNA", 106, epmtyNetworkMap, "terra-luna"))
    this.currencies.set((this.firstIDCrypto + 7), new CryptoCurrency(8, "Avalanche", "AVAX", 92, epmtyNetworkMap, "avalanche-2"))
    this.currencies.set((this.firstIDCrypto + 8), new CryptoCurrency(9, "Polkadot", "DOT", 22, epmtyNetworkMap, "polkadot"))

    // FIAT Currencies below - taken in order as in fetchCurrency.json from GUI repo
    this.currencies.set((this.firstIDFiat), new FiatCurrency(101, "U.S. Dollar", "USD", 1, "$"))
    this.currencies.set((this.firstIDFiat + 1), new FiatCurrency(102, "Euro", "EUR", 1.12, "€"))
    this.currencies.set((this.firstIDFiat + 2), new FiatCurrency(103, "British pound sterling", "GBP", 1.32, "!£"))
    this.currencies.set((this.firstIDFiat + 3), new FiatCurrency(104, "Japanese Yen", "JPY", 0.0082, "¥"))
    this.currencies.set((this.firstIDFiat + 4), new FiatCurrency(105, "Turkish lira", "TRY", 0.068, "₺"))
    this.currencies.set((this.firstIDFiat + 5), new FiatCurrency(106, "Polish Zloty", "PLN", 0.24, "zł"))
    this.currencies.set((this.firstIDFiat + 6), new FiatCurrency(107, "Swiss Franc", "CHF", 1.08, "CHF"))
    this.currencies.set((this.firstIDFiat + 7), new FiatCurrency(108, "Ukrainian hryvnia", "UAH", 0.034, "₴"))
  }

  public static getInstance(): CurrencyManager {
    if (this.instance === null) {
      this.instance = new CurrencyManager()
    }
    return this.instance;
  }

  /**
   * Returns rate in USD of currency with the specified ticker
   * @param {String} ticker - ticker of the searched currency
   * @returns {number} rate in USD
   */
  public findRate(ticker: String): number {
    const targetCurrency: Currency = this.getCurrency(ticker);
    return targetCurrency.getRateUSD();
  }

  /**
   * Returns price of a given currency in another currency
   * where both are specified by their tickers
   * @param {String} tickerPriceOf - ticker of the currency that needs to be priced
   * @param {String} tickerPricedIn - tickerPricedOf will be priced in this currency
   * @returns {number} price in specified currency
   */
  public findPrice(tickerPriceOf: String, tickerPricedIn: String): number {
    const currencyPriceOf: Currency = this.getCurrency(tickerPriceOf);
    const currencyPricedIn: Currency = this.getCurrency(tickerPricedIn);
    return currencyPriceOf.getRateUSD() / currencyPricedIn.getRateUSD()
  }

  /**
   * Update crypto prices of all coins in the sustem using Coingecko API
   * Note: the API is limited to 50 calls a minute
   * @returns {Boolean} indicates if all updates were successful
   */
  public async updateCryptoRates(): Promise<Boolean> {
    let updateResults: Boolean[] = [];

    await this.getAvailableCryptoCurrencies()
      .forEach(currency => currency.updateRateUSD()
        .then(result => updateResults.push(result)))

    let allSuccessful = true;
    updateResults.forEach(bool => {
      if (!bool) {
        allSuccessful = false
      }
    })
    return allSuccessful;
  }

  /**
   * Returns currency with the specified ticker
   * @param {String} ticker - ticker of the searched currency
   * @returns {Currency}
   */
  public getCurrency(ticker: String): Currency {
    const iterator = this.currencies.entries();
    let targetCurrency: Currency = new Currency(-1, "", "", 0);

    while (targetCurrency.getTicker() !== ticker) {
      const currentValue = iterator.next().value;
      let currentCurrency: Currency = new Currency(-1, "", "", 0);

      if (currentValue === undefined) {
        // All values are checked
        break;
      } else {
        currentCurrency = currentValue[1];
      }

      if (currentCurrency.getTicker() === ticker) {
        targetCurrency = currentCurrency;
      }
    }

    if (targetCurrency.getTicker() !== ticker) {
      throw "CurrencyNotFoundError";
    } else {
      return targetCurrency;
    }
  }

  /**
   * Returns array of fiat currencies that are stored in CurrencyManager
   * @returns {FiatCurrency[]}
   */
  public getAvailableFiatCurrencies(): FiatCurrency[] {
    let fiatCurrencies: FiatCurrency[] = [];
    let i = 0;

    while (this.currencies.get(this.firstIDFiat + i) !== undefined) {
      fiatCurrencies[i] = (this.currencies.get(this.firstIDFiat + i) as FiatCurrency);
      i++;
    }

    return fiatCurrencies;
  }

  /**
   * Returns array of crypto currencies that are stored in CurrencyManager
   * @returns {CryptoCurrency[]}
   */
  public getAvailableCryptoCurrencies(): CryptoCurrency[] {
    let cryptoCurrencies: CryptoCurrency[] = [];
    let i = 0;

    while (this.currencies.get(this.firstIDCrypto + i) !== undefined) {
      cryptoCurrencies[i] = (this.currencies.get(this.firstIDCrypto + i) as CryptoCurrency);
      i++;
    }

    return cryptoCurrencies;
  }

  /**
   * Returns array of fiat currencies that are stored in CurrencyManager as JSON
   * NOTE: the field "USD" shows how much a given currency is needed to buy 1 USD
   * @returns {currencyFiat[]}
   */
  public getAvailableFiatCurrenciesJSON(): currencyFiat[] {
    const FiatCurrencies: FiatCurrency[] = this.getAvailableFiatCurrencies();
    const FiatCurrenciesJSON: currencyFiat[] = [];

    FiatCurrencies.forEach(currency => FiatCurrenciesJSON.push({
      "id": currency.getID(),
      "ticker": currency.getTicker(),
      "name": currency.getName(),
      "USD": 1 / currency.getRateUSD(),
      "sign": currency.getSign()
    }))

    return FiatCurrenciesJSON;
  }

  /**
   * Returns array of crypto currencies that are stored in CurrencyManager as JSON
   * @returns {currencyCrypto[]}
   */
  public getAvailableCryptoCurrenciesJSON(): currencyCrypto[] {
    const CryptoCurrencies: CryptoCurrency[] = this.getAvailableCryptoCurrencies();
    const CryptoCurrenciesJSON: currencyCrypto[] = [];

    CryptoCurrencies.forEach(currency => CryptoCurrenciesJSON.push({
      "id": currency.getID(),
      "ticker": currency.getTicker(),
      "name": currency.getName(),
      "valueInUSD": currency.getRateUSD()
    }))

    return CryptoCurrenciesJSON;
  }
}

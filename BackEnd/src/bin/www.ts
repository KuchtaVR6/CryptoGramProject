#!/usr/bin/env node
/**
 * Module dependencies.
 */
import debug from 'debug';
import http from 'http';
import app from '../app';
import {AddressInfo} from "net";

import ErrnoException = NodeJS.ErrnoException;

const initTime = new Date().getTime();
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: number | string): number | string | boolean => {
  const port = typeof val === "string" && parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// next code block goes here

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      alert(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      alert(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const address = <AddressInfo>server.address();
  const bind = typeof address.toString() === 'string' ? `pipe ${address}` : `port ${address.port}`;
  debug(`Listening on ${bind}`);
};


// All testing imports
import {Currency} from '../models/Currencies/Currency';
import {CurrencyManager} from '../models/Managers/CurrencyManager';
import {PersonManager} from "../models/Managers/PersonManager";
import {start} from "repl";
// Below is code used for testing

const startServer = () => {
  PersonManager.getInstance()
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  
  console.log("Server successfully started in", new Date().getTime() - initTime, "ms.")
}


const cManager = CurrencyManager.getInstance();
let startTime = new Date();
cManager.updateCryptoRates().then(r => {
  console.log("Currencies prices loaded at:", new Date().toString(), "in", (new Date().getTime() - startTime.getTime()), "ms.")
  startServer();
});

setInterval(()=> 
{ 
  let startTime = new Date();
  cManager.updateCryptoRates().then(r => console.log("Currencies updated at:", new Date().toString(), "in", (new Date().getTime() - startTime.getTime()), "ms."));
  }, 10 * 60 * 1000);


// View info by ticker
//const searchedTicker = "GBP"
//console.log("Ticker: "+searchedTicker+"; Name: "+cManager.getCurrency(searchedTicker).getName());
//console.log("RateInUSD: "+cManager.findRate(searchedTicker))

//console.log("~~~~~ All found fiat currencies: ~~~~~")
//var fiatCurrencies = cManager.getAvailableFiatCurrencies();
//fiatCurrencies.forEach(element => console.log(element.getName()))
//console.log("~~~~~ All found crypto currencies: ~~~~~")
//var cryptoCurrencies = cManager.getAvailableCryptoCurrencies();
//cryptoCurrencies.forEach(element => console.log(element.getName()))

//console.log("~~~~~ Find Prices ~~~~~")
//const ticker1 = "BTC"
//const ticker2 = "PLN"
//console.log("Price of "+ticker1+" in "+ticker2+" is "+cManager.findPrice(ticker1,ticker2))

//console.log("~~~~~ Cryto and Fiat info JSON ~~~~~")
//cManager.getAvailableCryptoCurrenciesJSON().forEach(currency => console.log("Name: "+currency.name+" Ticker: "+currency.ticker +" ValueInUSD: "+ currency.valueInUSD))
//cManager.getAvailableFiatCurrenciesJSON().forEach(currency => console.log("Name: "+currency.name+" Ticker: "+currency.ticker +" USD: "+ currency.USD))

//cManager.getAvailableCryptoCurrencies().forEach(currency => console.log(currency.getRateUSD()))
//cManager.getAvailableCryptoCurrencies().forEach(currency => currency.updateRateUSD())

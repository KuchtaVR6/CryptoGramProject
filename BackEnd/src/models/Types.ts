export type Holding = {
  id : String,
  ticker : String,
  name : String,
  amount : number,
  sign : String
}

export type currencyCrypto = {
  "id": number,
  "ticker": String,
  "name": String,
  "valueInUSD": number
}

export type currencyFiat = {
  "id": number,
  "ticker": String,
  "name": String,
  "USD": number,
  "sign" : String
}

export type UserJSON = {
  "id" : number,
  "name" : String,
  "username" : String
}

export type performance = {
  "id": number,
  "date": String,
  "amount": number
}

export type orderReport = {
  "id" : number,
  "time" : String,
  "pair" : String,
  "type" : String,
  "from_amount" : number,
  "to_amount" : number,
  "addiType" : String
  "additional" : String,
}

export type notification = {
  "id" : number,
  "type" : String
  "transaction" : transactionNotification | null
}

export type transactionNotification = {
  "amount": number,
  "currency": {
    "id" : number,
    "name" : String,
    "ticker": String,
    "valueInUSD" : number
  },
  "date": String,
  "recipient": UserJSON,
  "time": String,
  "type": "send"
}

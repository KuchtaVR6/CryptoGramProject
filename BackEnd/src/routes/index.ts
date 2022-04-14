import express from 'express';
import {Request, Response} from 'express';
import {Controller} from "../models/Controller";

const indexRouter = express.Router();

indexRouter.post('/login', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().login(req.body.email,req.body.password)
      )
    }
    catch (e : any)
    {
      res.status(400).json({error: e})
    }
  }
);

indexRouter.post('/fetchCurrencies', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().fetchCurrencies(req.body.sessionToken)
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else {
        res.status(400).json({error: e})
      }
    }
  }
);

indexRouter.post('/fetchHoldings', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().fetchHoldings(req.body.sessionToken)
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else{
        res.status(400).json({error: e})
      }

    }
  }
);

indexRouter.post('/searchUser', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().searchUser(req.body.sessionToken,req.body.query)
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else{
        res.status(400).json({error: e})
      }

    }
  }
);

indexRouter.post('/requestSend', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().requestSend(
          req.body.sessionToken,req.body.amount,req.body.currency.ticker, req.body.date + " " + req.body.time, req.body.recipient.id, req.body.type
        )
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else{
        res.status(400).json({error: e})
      }
    }
  }
);

indexRouter.post('/order', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().order(
          req.body.sessionToken,req.body.amount,req.body.payCurrency.ticker,req.body.getCurrency.ticker,req.body.type
        )
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else {
        res.status(400).json({error: e})
      }

    }
  }
);

indexRouter.post('/confirmTransaction', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().confirmTransaction(req.body.sessionToken,req.body.confirm)
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else{
        res.status(400).json({error: e})
      }

    }
  }
);

indexRouter.post('/fetchTradingHistory', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().tradingHistory(req.body.sessionToken)
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else{
        res.status(400).json({error: e})
      }

    }
  }
);

indexRouter.post('/fetchNotifications', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().fetchNotification(req.body.sessionToken)
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else{
        res.status(400).json({error: e})
      }

    }
  }
);

indexRouter.post('/dismissNotification', (req: Request, res: Response) => {
    try{
      res.status(200).json(
        Controller.getInstance().dismissNotification(req.body.sessionToken,req.body.id)
      )
    }
    catch (e : any)
    {
      if(e==="Access Denied")
      {
        res.status(401).json({error: e})
      }
      else{
        res.status(400).json({error: e})
      }

    }
  }
);

export default indexRouter;

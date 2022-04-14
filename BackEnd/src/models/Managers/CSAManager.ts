import {CustomerServiceAgent} from "../People/CustomerServiceAgent";

/* *no need to implement */

export class CSAManager {

  private agents: Map<number,CustomerServiceAgent>;

  private static instance: CSAManager;

  private constructor() {
    this.agents = new Map<number, CustomerServiceAgent>();
  }

  public static getInstance(): CSAManager {
    // TODO*
    throw "UnsupportedOperationException";
  }

  public getAvailableAgent(): CustomerServiceAgent {
    //  TODO*
    throw "UnsupportedOperationException";
  }

  public getAgentById(id: number): CustomerServiceAgent{
    //  TODO*
    throw "UnsupportedOperationException";
  }
}

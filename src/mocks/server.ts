import { createServer, Model } from "miragejs";
import incomes from './jsons/incomes.json'

type IConfig = {
  environment?: string
}


export function makeServer(config: IConfig= {}) {
  const {environment='development'} = config

  return createServer({
    environment, 
    models:{
      income: Model,
      expense: Model
    },
    
    routes() {
      this.namespace = "api/v1";
      
      this.get("/incomes/all", (schema) => {
        return schema.all('income')
      });
    },
    seeds(server) {
      server.db.loadData({
        incomes
      })
    },
  });
}

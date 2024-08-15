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
      this.urlPrefix='http://localhost:3000/'
      this.namespace = "/api/v1/";
      
      this.get("incomes/all", (schema) => {
        return schema.all('income')
      });
      
      this.post('incomes/create', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        return schema.create('income', body)
      });
      this.passthrough()
    },
    seeds(server) {
      server.db.loadData({
        incomes
      })
    },
  });
}

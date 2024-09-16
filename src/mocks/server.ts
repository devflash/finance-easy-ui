// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
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
      expense: Model,
      budget: Model
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

      this.get("incomes/search", (schema, request) => {
        const source = request.queryParams.source
        const category = request.queryParams.category
        const startDate = request.queryParams.startDate
        const endDate = request.queryParams.endDate
        return schema.all('income').filter((value)=> {
          if(source && category){
            return value.attrs.source === source && value.attrs.category === category

          }
          else if(source){
            return value.attrs.source === source
          }
          else if(category){
            return value.attrs.category === category
          }
          else if(startDate && endDate){
            return value.attrs.incomeDate >=startDate && value.attrs.incomeDate <= endDate
          }
          else{
            return true
          }
        }
        )
      });

      this.post('budgets/create', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        return schema.create('budget', body)
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

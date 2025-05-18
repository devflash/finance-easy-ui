// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { createServer, Model, Response } from "miragejs";
import incomes from './jsons/incomes.json'
import expenses from './jsons/expenses.json'
import savings from './jsons/savings.json';

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
      budget: Model,
      user: Model,
      saving: Model
    },
    
    routes() {
      this.urlPrefix='http://localhost:3000/'
      this.namespace = "/api/v1/";
      
      this.get("income/all", (schema) => {
        return schema.all('income')
      });

      this.get("income/:incomeId", (schema, request)=>{
        const incomeId = request.params.incomeId;
        const income = schema.db.incomes.where({_id: incomeId})[0]
        return new Response(200, undefined, {income})
      })
      
      this.post('income/create', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        return schema.create('income', body)
      });

      this.put('income/:incomeId', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        const incomeId = request.params.incomeId;

        return schema.where('income', {_id: incomeId}).update(body)
      });

      this.get("income/search", (schema, request) => {
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

      this.get('budgets/all', (schema)=>{
        return schema.all('budget')
      });
      
      this.post('user/register', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        return schema.create('user', body)
      });
      
      this.get("expense/all", (schema) => {
        return schema.all('expenses')
      });

      this.get("expense/search", (schema, request) => {
        const recipient = request.queryParams.recipient
        const category = request.queryParams.category
        const startDate = request.queryParams.startDate
        const endDate = request.queryParams.endDate
        return schema.all('expense').filter((value)=> {
          if(recipient && category){
            return value.attrs.moneyPaidTo === recipient && value.attrs.category === category

          }
          else if(recipient){
            return value.attrs.moneyPaidTo === recipient
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
      
      this.post('expense/create', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        return schema.create('expense', body)
      });

      this.get("saving/all", (schema) => {
        return schema.all('saving')
      });

      this.get("saving/:savingId", (schema, request)=>{
        const savingId = request.params.savingId;
        const saving = schema.db.savings.where({_id: savingId})[0]
        return new Response(200, undefined, {saving})
      })
      
      this.post('saving/create', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        return schema.create('saving', body)
      });

      this.put('saving/:savingId', (schema, request)=>{
        const body = JSON.parse(request.requestBody);
        const savingId = request.params.savingId;

        return schema.where('saving', {_id: savingId}).update(body)
      });

      this.get("saving/search", (schema, request) => {
        const type = request.queryParams.type
        const startDate = request.queryParams.startDate
        const endDate = request.queryParams.endDate
        return schema.all('saving').filter((value)=> {
          if(type){
            return value.attrs.type === type
          }
          else if(startDate && endDate){
            return value.attrs.date >=startDate && value.attrs.date <= endDate
          }
          else{
            return true
          }
        }
        )
      });
      this.passthrough()
    },
    seeds(server) {
      server.db.loadData({
        incomes,
        expenses,
        savings
      })
    },
  });
}

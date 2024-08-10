import { createServer } from "miragejs";
import incomes from './jsons/incomes.json'
type IConfig = {
  environment?: string
}

export function makeServer(config: IConfig= {}) {
  const {environment='development'} = config

  return createServer({
    environment, 
    routes() {
      this.namespace = "api/v1";

      this.get("/incomes/all", () => {
        return incomes
      });
    },
  });
}

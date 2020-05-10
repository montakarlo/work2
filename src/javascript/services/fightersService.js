import { callApi } from '../helpers/apiHelper';
import {fightersDetails} from '../helpers/mockData'

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    
    // return fightersDetails[id-1]
    console.log(callApi(`details/fighter/${id}.json`,FighterService.getFighters))
    return callApi(`details/fighter/${id}.json`,FighterService.getFighters)

  }
}

export const fighterService = new FighterService();

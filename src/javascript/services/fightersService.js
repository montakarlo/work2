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
    return fightersDetails[id-1]

  }
}

export const fighterService = new FighterService();

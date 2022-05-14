import axios from "axios";
import { API_URL } from "../constant";
import { getToken } from "../utility";

export async function changeOperatorState(state, operatorId){
    const URL = API_URL + "/api/device/operator/" + operatorId;
    const token = getToken();
    const promise = await axios
      .patch(
        URL,
        {
          state: state,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
          return error.data;
      });
      return promise;
  }
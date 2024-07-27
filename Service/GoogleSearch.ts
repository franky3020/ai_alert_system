import axios from "axios";
import config from "../config";

interface GoogleSearchRes {
  searchInformation: {
    searchTime: number;
  };
}

export class GoogleSearch {
  public static search(searchMassge: string) {
    axios
      .get(
        `https://customsearch.googleapis.com/customsearch/v1?key=${config.Google_Search_API_KEY}&cx=${config.Google_Search_API_CX}&q=${searchMassge}`
      )
      .then(function (response) {
        console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);

        // TODO: 學 json to typescript obj
        let googleSearchRes = response.data as GoogleSearchRes;

        console.log(googleSearchRes.searchInformation.searchTime);
      });
  }
}

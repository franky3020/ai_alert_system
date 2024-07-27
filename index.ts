import OpenAI from "openai";
import config from "./config";
import axios from "axios";

const openai = new OpenAI({
  apiKey: config.OPEN_AI_API_KEY,
});

async function main() {
  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     { role: "system", content: "You are a helpful assistant." },
  //     { role: "assistant", content: "How can I assist you today?" },
  //     { role: "user", content: "I need some good suggestion for have a good sleep" }
  //   ],
  //   model: "gpt-3.5-turbo-0125",
  // });

  // console.log(completion.choices[0]);

  // axios.get(`https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyDxvfJzH7E2snoyqNRQh7E2UlOonPOtg50&cx=543749e389b5447cc&q=franky 魔術 app`)
  axios.get(`https://customsearch.googleapis.com/customsearch/v1?key=${config.Google_Search_API_KEY}&cx=${config.Google_Search_API_CX}&q=good food`)
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

main();

interface GoogleSearchRes {
  searchInformation: {
    searchTime: number
  };
}

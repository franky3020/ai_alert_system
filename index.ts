import OpenAI from "openai";
import config from "./config";
import axios from "axios";
import { GoogleSearch } from "./Service/GoogleSearch";

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
  // GoogleSearch.search("");

}

main();



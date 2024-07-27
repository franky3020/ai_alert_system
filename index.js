"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const config_1 = __importDefault(require("./config"));
const axios_1 = __importDefault(require("axios"));
const openai = new openai_1.default({
    apiKey: config_1.default.OPEN_AI_API_KEY,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
        axios_1.default.get(`https://customsearch.googleapis.com/customsearch/v1?key=${config_1.default.Google_Search_API_KEY}&cx=${config_1.default.Google_Search_API_CX}&q=good food`)
            .then(function (response) {
            console.log(response.data);
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
            // TODO: 學 json to typescript obj
            let googleSearchRes = response.data;
            console.log(googleSearchRes.searchInformation.searchTime);
        });
    });
}
main();

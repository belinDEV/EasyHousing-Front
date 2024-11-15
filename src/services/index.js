import axios from "axios";
import corretorService from "./corretor";
import userService from "./user";
import imovelService from './imovel'

const API_URL = "http://localhost:8070";

const httpClient = axios.create({
  baseURL: API_URL,
});

export default {
  corretor: corretorService(httpClient),
  user: userService(httpClient),
  imovel: imovelService(httpClient),
}
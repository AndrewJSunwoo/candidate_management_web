import axios from "axios";
import { baseUrl } from "../constants/url";

const httpModule = axios.create({
  baseURL: baseUrl,
});

export default httpModule;

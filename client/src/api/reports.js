import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001",
  // We can hide the port in a .env file
});

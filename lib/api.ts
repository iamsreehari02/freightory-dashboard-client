// import axios from "axios";

import axios from "axios";

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });

export const api = axios.create({
  withCredentials: true, // still needed if using cookies/session
});

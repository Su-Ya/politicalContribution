import Http from "@/api/http";

const mirrorMediaHttp = new Http({
  baseURL: "https://raw.githubusercontent.com/mirror-media",
});

mirrorMediaHttp.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

mirrorMediaHttp.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    if (response.status === 404) {
      throw new Error();
    }
  }
);

export default mirrorMediaHttp;

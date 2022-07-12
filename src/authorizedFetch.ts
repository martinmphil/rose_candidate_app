import { cruxLogin } from "./cruxLogin";

interface InitObj {
  method: string;
  headers?: { Authorization: string };
  body?: string;
}

async function authorizedFetch(
  path = "",
  method = "GET",
  upload = ""
): Promise<unknown> {
  const Authorization = sessionStorage.getItem("Authorization");
  if (typeof Authorization != "string" || Authorization.length < 1) {
    cruxLogin();
    throw " Authorization header missing from authorized-fetch ";
  }

  const host = "https://7hmryyd0m0.execute-api.eu-west-1.amazonaws.com";
  const url = host + path;

  const initObj: InitObj = {
    method,
    headers: {
      Authorization,
    },
  };

  if (typeof upload === "string" && upload.length > 0) {
    initObj.body = upload;
  }

  const result = fetch(url, initObj)
    .then((response) => {
      if (!response.ok) {
        console.warn(response.statusText);
        throw new Error(
          ` Authorized fetch response not ok, ${response.statusText} `
        );
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        console.warn(data.error);
        throw new Error(" Fetching data returned an error (see warning log). ");
      }
      if (data.body) {
        return data.body;
      }
      throw new Error(" The body-field absent from fetched data. ");
    });

  return result;
}

export { authorizedFetch };

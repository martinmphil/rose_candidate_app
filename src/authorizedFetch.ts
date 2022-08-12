import { showLogin } from "./showLogin";

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
    showLogin();
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

  const result = await fetch(url, initObj)
    .then((response) => {
      if (!response.ok) {
        console.warn(response.statusText);
        throw ` Authorized fetch response not ok, ${response.statusText} `;
      }
      return response.json();
    })
    .then((data) => {
      if (data.body) {
        return data.body;
      }
      if (data.error) {
        throw ` Fetching data returned error:- ${data.error}. `;
      }
      throw " Data missing from fetch response. ";
    });

  return result;
}

export { authorizedFetch };

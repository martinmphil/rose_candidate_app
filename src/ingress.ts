const x = import.meta.env.VITE_INGRESS_HREF;
const ingress =
  typeof x === "string" && x.length > 0 ? x : "https://www.greenstem.uk/can/";

export { ingress };

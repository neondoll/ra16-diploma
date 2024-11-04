import clsx from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function getResponseError(error) {
  const errorMessage = "API Error, please try again.";

  if (typeof error !== "object") {
    return errorMessage;
  }

  if (error.name === "Fetch User") {
    return error.message;
  }

  if (
    Object.prototype.hasOwnProperty.call(error, "response")
    && Object.prototype.hasOwnProperty.call(error.response, "data")
  ) {
    if (Object.prototype.hasOwnProperty.call(error.response.data, "errors")) {
      return error.response.data.errors;
    }

    if (Object.prototype.hasOwnProperty.call(error.response.data, "message")) {
      return error.response.data.message;
    }
  }

  if (Object.prototype.hasOwnProperty.call(error, "message")) {
    return error.message;
  }

  if (!error.response) {
    console.error(`API ${error.config.url} not found`);

    return errorMessage;
  }

  if (import.meta.env.DEV) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  }

  return errorMessage;
}

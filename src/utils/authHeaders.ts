function createAuthHeaders(): Headers {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    headers.append("ACCESS_TOKEN", accessToken);
  }

  return headers;
}

export default createAuthHeaders;

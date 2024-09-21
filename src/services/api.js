const BASE_URL = `${import.meta.env.VITE_BACKEND_API}`

// AUTH ENDPOINTS
export const endpoints = {
  SEARCH_API: BASE_URL + "/api/search",
  PREPOSITION_API: BASE_URL + "/api/preposition",
  COMPARISION_API: BASE_URL + "/api/comparison",
  ALPHABET_API: BASE_URL + "/api/alphabet",
  AI_API:BASE_URL+ "/api/getAnswer",
  SENDOTP_API: BASE_URL+ "/api/sendotp/",
  VERIFYOTP_API: BASE_URL+ "/api/verifyotp",
}

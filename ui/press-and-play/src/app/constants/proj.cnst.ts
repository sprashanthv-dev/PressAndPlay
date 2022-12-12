import { environment } from "src/environments/environment";
import { ALL_MESSAGES } from "./messages.cnst";

const apiMapping = {
  "AUTOCOMPLETE_API": "autocomplete",
  "REVERSE_API": "reverse",
  "GEOCODE_ADDRESS": "search",
  "CREATE_USER": "user/create",
  "LOGIN_USER": "user/login",
  "GET_USER": "user",
  "GET_COURT_LIST" : "court",
  "GET_COURT_DETAILS_BY_ID" : "court",
  "BOOK_SLOT_FOR_COURT": "book",
  "RATE_COURT": "rating",
  "CREATE_COURT": "court/create",
  "GET_NOTIFICATIONS": "events"
}

const catalogItemConstants = {
  CATALOG_ITEM_CHAR_LIMIT : 15
}

const userType = {
  CUSTOMER : '1',
  MANAGER : '2'
}

const serviceTypes = {
  USER : "user",
  COURT: "court",
  EVENTS : "event"
}

const country = "United States";

const localStorageDetails = {
  key: "userDetails",
  details: {
    userId: null,
    userSessionId: null
  }
}

const catalogListHeader = {
  DEFAULT: "Available Sporting Centers",
  LOCATION: "Sporting centers near ",
  MANAGER : "Sporting centers managed by "
}

const toastrTypes = {
  SUCCESS : 'success',
  ERROR : 'error'
}

const userRoles = {
  "CUSTOMER" : "customer",
  "MANAGER" : "manager"
}

const excludedUrls = ["login", "create", "reverse", "autocomplete", "court", "search"]

export const PRESS_AND_PLAY_CONSTANTS = {
  API_MAPPING : apiMapping,
  BASE_URL : environment.baseUrl,
  CATALOG_ITEM_CONSTANTS : catalogItemConstants,
  USERTYPE : userType,
  COUNTRY : country,
  LOCAL_STORAGE_DETAILS : localStorageDetails,
  TOASTR_TYPES : toastrTypes,
  APP_MESSAGES : ALL_MESSAGES,
  EXCLUDED_URLS : excludedUrls,
  SERVICE_TYPES : serviceTypes,
  CATALOG_LIST_HEADER : catalogListHeader,
  USER_ROLES : userRoles
}
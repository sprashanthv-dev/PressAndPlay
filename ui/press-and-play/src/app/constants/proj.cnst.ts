import { environment } from "src/environments/environment";
import { ALL_MESSAGES } from "./messages.cnst";

const apiMapping = {
  "AUTOCOMPLETE_API": "autocomplete",
  "REVERSE_API": "reverse",
  "CREATE_USER": "user/create",
  "LOGIN_USER": "user/login"
}

const catalogItemConstants = {
  CATALOG_ITEM_CHAR_LIMIT : 15
}

const userType = {
  CUSTOMER : '1',
  MANAGER : '2'
}

const country = "United States";

const localStorageDetails = {
  key: "userDetails",
  details: {
    userId: null,
    userSessionId: null
  }
}

const toastrTypes = {
  SUCCESS : 'success',
  ERROR : 'error'
}

export const PRESS_AND_PLAY_CONSTANTS = {
  API_MAPPING : apiMapping,
  BASE_URL : environment.baseUrl,
  CATALOG_ITEM_CONSTANTS : catalogItemConstants,
  USERTYPE : userType,
  COUNTRY : country,
  LOCAL_STORAGE_DETAILS : localStorageDetails,
  TOASTR_TYPES : toastrTypes,
  APP_MESSAGES : ALL_MESSAGES
}
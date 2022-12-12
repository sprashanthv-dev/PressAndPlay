const REGISTER_MESSAGES = {
  SUCCESS : "User registered successfully. Please proceed to login.",
  ERROR : "Error in user registration. Try again later."
}

const LOGIN_MESSAGES = {
  SUCCESS : "User logged in successfully",
  ERROR : "Login Unsuccessful. Wrong email or password. "
}

const LOGOUT_MESSAGES = {
  SUCCESS : "User logged out successfully",
  ERROR : "Failed to logout."
}

const SESSION_MESSAGES = {
  EXPIRED : "Your session has expired. Please login again."
}

const BOOKING_SLOT_MESSAGES = {
  SUCCESS : "Slot booked successfully",
  ERROR : "Error occured while booking slot. Please try again"
}

export const ALL_MESSAGES = {
  REGISTER_MESSAGES,
  LOGIN_MESSAGES,
  LOGOUT_MESSAGES,
  SESSION_MESSAGES,
  BOOKING_SLOT_MESSAGES
}


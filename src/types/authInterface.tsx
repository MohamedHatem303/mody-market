export interface successlogin {
  message: string
  user: UserResponse
  token: string
}

export interface UserResponse {
  name: string
  email: string
  role: string
}

export interface failedlogin {
  statusMsg: string
  message: string
}

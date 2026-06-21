// src/services/auth.service.ts
import ApiService from './api.service'
import { TokenService } from './token.service.ts'
import type { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import type { SignInData } from '@/stores/auth.store.ts'
import { useAppStore } from '@/stores/app.store.ts'

interface OAuthTokenResponse {
  access_token: string
  refresh_token: string
  expires_in?: number
  token_type?: string
  scope?: string
}

export class AuthenticationError extends Error {
  errorCode: number
  constructor(errorCode: number, message: string) {
    super(message)
    this.name = this.constructor.name
    this.errorCode = errorCode
  }
}

// Helper: Build request config
function buildTokenRequest(data: Record<string, string>, isRefresh = false): AxiosRequestConfig {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  if (isRefresh) {
    headers['Authorization'] =
      'Basic ' +
      btoa(`${import.meta.env.VITE_APP_CLIENT_ID}:${import.meta.env.VITE_APP_CLIENT_SECRET}`)
  } else {
    headers['Accept'] = 'application/json'
  }

  return {
    method: 'post',
    url: '/oauth/token',
    headers,
    data: qs.stringify(data),
  }
}

// Helper: Tangani response & simpan token
function handleAuthResponse(response: { data: OAuthTokenResponse }): string {
  const { access_token, refresh_token } = response.data

  TokenService.saveToken(access_token)
  TokenService.saveRefreshToken(refresh_token)
  ApiService.setHeader()
  ApiService.mount401Interceptor()

  return access_token
}

// Helper: Tangani error
function catchAuthError(error: unknown): never {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const err = error as {
      response: { status: number; data: { error_description: string } }
    }
    throw new AuthenticationError(err.response.status, err.response.data.error_description)
  }
  throw new AuthenticationError(0, (error as Error).message || 'Unknown error')
}

// Service utama
export const AuthService = {
  async signIn(signInData: SignInData): Promise<string> {
    const requestData = buildTokenRequest({
      grant_type: 'password',
      username: signInData.username,
      password: signInData.password,
      client_id: import.meta.env.VITE_APP_CLIENT_ID,
      client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
    })

    try {
      const response = await ApiService.customRequest(requestData)
      return handleAuthResponse(response)
    } catch (error) {
      return catchAuthError(error)
    }
  },

  async refreshToken(): Promise<string> {
    const refreshToken = TokenService.getRefreshToken()
    if (!refreshToken) {
      throw new AuthenticationError(401, 'Refresh token is missing')
    }

    const requestData = buildTokenRequest(
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      true,
    )

    try {
      const response = await ApiService.customRequest(requestData)
      return handleAuthResponse(response)
    } catch (error) {
      return catchAuthError(error)
    }
  },

  async signup(email: string, password: string, name: string) {
    const requestData: AxiosRequestConfig = {
      method: 'post',
      url: '/oauth/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
        name,
      },
    }

    try {
      return await ApiService.customRequest(requestData)
    } catch (error) {
      return catchAuthError(error)
    }
  },

  signOut() {
    const { setLogin } = useAppStore()

    // set app
    setLogin(false)

    // token
    TokenService.removeToken()
    TokenService.removeRefreshToken()
    ApiService.removeHeader()
    ApiService.unmount401Interceptor()
  },
}

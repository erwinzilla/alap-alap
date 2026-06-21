import { defineStore } from 'pinia'
import { AuthenticationError, AuthService } from '@/services/auth.service.ts'
import { TokenService } from '@/services/token.service.ts'

export interface SignInData {
  username: string
  password: string
  remember: boolean
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticating: false,
      accessToken: TokenService.getToken(),
      authenticationErrorCode: 0,
      authenticationError: '',
      refreshTokenPromise: null as Promise<string> | null,
    }
  },

  getters: {
    authErrorCode: (state) => state.authenticationErrorCode,
    authError: (state) => state.authenticationError,
    authing: (state) => state.authenticating,
  },

  actions: {
    async signIn(signInData: SignInData) {
      this.authenticating = true
      this.authenticationError = ''
      this.authenticationErrorCode = 0

      try {
        const res = await AuthService.signIn(signInData)
        this.accessToken = res
        this.authenticating = false
        return res
      } catch (err) {
        if (err instanceof AuthenticationError) {
          this.authenticationErrorCode = err.errorCode
          this.authenticationError = err.message
        }
        this.authenticating = false
        throw err
      }
    },

    signOut() {
      AuthService.signOut()
      this.authenticating = false
      this.accessToken = null
    },

    async refreshToken() {
      if (!this.refreshTokenPromise) {
        this.refreshTokenPromise = AuthService.refreshToken()
          .then((response) => {
            this.accessToken = response
            this.refreshTokenPromise = null
            return response
          })
          .catch((error) => {
            this.refreshTokenPromise = null
            throw error
          })
      }
      return this.refreshTokenPromise
    },

    async signup({ email, password, name }: { email: string; password: string; name: string }) {
      try {
        await AuthService.signup(email, password, name)
        this.authenticating = false
        return true
      } catch (e) {
        if (e instanceof AuthenticationError) {
          this.authenticationErrorCode = e.errorCode
          this.authenticationError = e.message
        }
        return false
      }
    },

    setAuthenticatingStatus(status: boolean) {
      this.authenticating = status
    },
  },
})

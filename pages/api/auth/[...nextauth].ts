import NextAuth from 'next-auth'
const stateParam = 'stateParam'
export default NextAuth({
  // Configure one or more authentication providers
  secret: 'anything',
  providers: [
    {
      id: 'salt-id-provider',
      name: 'Salt ID',
      type: 'oauth',
      wellKnown:
        'https://identity.cloud.saltpay.dev/oauth/v2/oauth-anonymous/.well-known/openid-configuration',
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: 'login',
          ui_locales: 'en',
          redirect_uri:
            'http://user-portal-curity.saltpay.local:3000/api/auth/callback/salt-id-provider',
        },
      },
      idToken: true,
      checks: 'state',
      clientId: 'auth-code-client',
      clientSecret: 'secret',
      profile(profile) {
        console.log('>>> profile: ', profile)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async (session, token) => {
      if (!session?.user || !token?.account) {
        return session
      }

      session.user.id = token.account.id
      session.accessToken = token.account.accessToken
      session.refreshToken = token.account.refreshToken

      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('>>> user: ', user)
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('>>> url: ', url)
      return baseUrl
    },
    async jwt({ token, account }) {
      token.access_token = account?.access_token
      console.log('>>> account: ', account)
      // console.log('>>> token: ', token)
      return Promise.resolve(token)
    },
  },
})

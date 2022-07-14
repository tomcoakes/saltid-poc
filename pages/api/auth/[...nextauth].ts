import NextAuth from 'next-auth'
const stateParam = 'stateParam'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: 'salt-id-provider',
      name: 'Salt ID',
      type: 'oauth',
      wellKnown:
        'https://identity.cloud.saltpay.dev/oauth/v2/oauth-anonymous/.well-known/openid-configuration',
      authorization: {
        params: {
          scope: 'openid email',
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
    },
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('>>> user: ', user)
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('>>> url: ', url)
      console.log('>>> baseUrl: ', baseUrl)
      return baseUrl
    },
  },
})

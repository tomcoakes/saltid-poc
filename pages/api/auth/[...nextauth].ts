import NextAuth from 'next-auth'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
      id: 'saltID',
      name: 'Salt ID',
      type: 'oauth',
      wellKnown:
        'https://identity.cloud.saltpay.dev/oauth/v2/oauth-anonymous/.well-known/openid-configuration',
      authorization: {
        params: {
          scope: 'openid email',
          prompt: 'login',
          ui_locales: 'en',
          nonce: 'dhfjkdashfkj',
        },
      },
      idToken: true,
      checks: ['state'],
      clientId: 'auth-code-client',
      clientSecret: 'secret',
    },
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('>>> url: ', url)
      console.log('>>> baseUrl: ', baseUrl)
      return baseUrl
    },
  },
})

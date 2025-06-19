import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        // For now, we'll just return a mock user
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          return {
            id: "1",
            name: "Test User",
            email: "test@example.com",
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST }; 
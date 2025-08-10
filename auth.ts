import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries"
import { use } from "react"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({
      user: {name, email, image}, account, profile:{id, login, bio} 
    }){
     const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID, {id});

     if(!existingUser){
      await client.create({
        _type: "author",
        id,
        name,
        username: login,
        email,
        image,
        bio: bio || ''
      });
     }
     return true;
    },
    async jwt({token, account, profile}){
      if(account && profile){  
      const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID, {id: profile?.id});
        if(user){
          token.id = user._id;
        }
      
      }
      return token;
  },
  async session({session, token}){
    Object.assign(session, {
      id: token.id,
    });
    return session;
  }
}
})

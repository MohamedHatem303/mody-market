import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { email } from "zod";
import { failedlogin, successlogin } from "./types/authInterface";

export const authOptions:NextAuthOptions ={
    pages:{
        signIn:'/login'
    } ,
    providers: [

        Credentials({
            name: 'Credentials',
            credentials: {
                email:{},
                password:{}
            },
            authorize:async (Credentials)=>{
                const response = await fetch(`${process.env.Api}/auth/signin` , {
                    method:'POST',
                    body : JSON.stringify({
                        email:Credentials?.email,
                        password:Credentials?.password
                    }),
                    headers:{
                        'content-type':'application/json'
                    }
                } )
                const payload:failedlogin | successlogin = await response.json();
                if('token' in payload){
                return {
                    id:payload.user.email,
                    user: payload.user ,
                    token: payload.token
                }
                }else{
                    throw new Error('error in login')
                }
            }
        })
    ] ,
    callbacks:{
        jwt:({token , user})=>{
            if(user){
                token.user=user.user
                token.token=user.token
            }
            return token

        } , 
        session:({session,token})=>{
            session.user=token.user
            return session
        }
    }
}
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req:NextRequest){
  const cookieStore = cookies()
  cookieStore.set('isAuth', 'true');
  return new Response('okay')
}

export async function DELETE(req:NextRequest){
  const cookieStore = cookies()
  cookieStore.delete('isAuth')
  return new Response('okay')
}

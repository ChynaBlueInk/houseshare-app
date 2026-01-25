// lib/auth.ts
const AUTH_EVENT="sharespace-auth"

export function authNotify(){
  if(typeof window==="undefined")return
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function getIdToken():string|null{
  if(typeof window==="undefined")return null

  const underscore=localStorage.getItem("id_token")
  const camel=localStorage.getItem("idToken")
  const chosen=underscore||camel||null

  // Normalise so both keys match if they differ
  if(chosen&&underscore!==camel){
    try{
      localStorage.setItem("id_token",chosen)
      localStorage.setItem("idToken",chosen)
    }catch{}
  }

  return chosen
}

export function setTokens(opts:{id?:string|null;access?:string|null;refresh?:string|null}){
  if(typeof window==="undefined")return

  const {id,access,refresh}=opts

  try{
    if(id){
      localStorage.setItem("id_token",id)
      localStorage.setItem("idToken",id)
    }else if(id===null){
      localStorage.removeItem("id_token")
      localStorage.removeItem("idToken")
    }

    if(access){
      localStorage.setItem("access_token",access)
    }else if(access===null){
      localStorage.removeItem("access_token")
    }

    if(refresh){
      localStorage.setItem("refresh_token",refresh)
    }else if(refresh===null){
      localStorage.removeItem("refresh_token")
    }
  }catch{}

  authNotify()
}

export function getCurrentUser(){
  return !!getIdToken()
}

export function signOut(){
  setTokens({id:null,access:null,refresh:null})
}

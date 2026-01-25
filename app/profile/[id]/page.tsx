// app/profile/[id]/page.tsx
export const dynamic="force-dynamic"

import {headers}from "next/headers"
import Link from "next/link"

type Profile={
  userID:string
  fullName?:string
  email?:string
  region?:string
  bio?:string
  monthlyBudget?:string
  housingStatus?:"has-space"|"looking-for-space"
  profileImage?:string
}

function safeStr(v:any){
  return typeof v==="string"?v:""
}

function prettyHousing(v:Profile["housingStatus"]){
  if(v==="has-space")return "Has space"
  if(v==="looking-for-space")return "Looking for space"
  return "Not set"
}

function isSet(v:any){
  return typeof v==="string"&&v.trim().length>0
}

async function getBaseUrl(){
  const h=await headers()
  const host=h.get("host")||"localhost:3000"
  const proto=h.get("x-forwarded-proto")||"http"
  return `${proto}://${host}`
}

async function getProfileById(baseUrl:string,id:string):Promise<Profile|null>{
  const res=await fetch(`${baseUrl}/api/users`,{cache:"no-store"})
  if(!res.ok)return null
  const data=await res.json()
  const profiles=(data?.profiles||[]) as Profile[]
  return profiles.find((p)=>safeStr(p?.userID)===id)||null
}

function Pill({children}:{children:React.ReactNode}){
  return <span className="rounded-full border bg-white px-3 py-1 text-sm text-gray-700 shadow-sm">{children}</span>
}

function EmptyHint({children}:{children:React.ReactNode}){
  return <p className="text-sm text-gray-500">{children}</p>
}

export default async function ProfilePage({params}:{params:Promise<{id:string}>}){
  const {id}=await params
  const baseUrl=await getBaseUrl()
  const profile=await getProfileById(baseUrl,id)

  if(!profile){
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Profile not found</h1>
          <p className="mt-2 text-gray-600">That user may have been removed or the link is incorrect.</p>
          <div className="mt-6">
            <Link href="/browse" className="text-rose-600 hover:underline">← Back to Browse</Link>
          </div>
        </div>
      </div>
    )
  }

  const imageUrl=safeStr(profile.profileImage)
  const fullName=isSet(profile.fullName)?profile.fullName:"Unnamed member"

  const region=isSet(profile.region)?profile.region:null
  const budget=isSet(profile.monthlyBudget)?profile.monthlyBudget:null
  const housing=prettyHousing(profile.housingStatus)

  const hasBasics=!!(region||budget||profile.housingStatus)
  const hasBio=isSet(profile.bio)

  return (
    <div className="bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-5 flex items-center justify-between">
          <Link href="/browse" className="text-sm text-gray-600 hover:text-rose-600">← Back to Browse</Link>
          <div className="text-xs text-gray-500">
            Member ID: <span className="font-mono">{profile.userID}</span>
          </div>
        </div>

        {/* Header card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex items-start gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border bg-gray-50">
                {imageUrl?(
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt={fullName} className="h-full w-full object-cover" />
                ):(
                  <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                    No photo
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                <p className="mt-1 text-sm text-gray-600">
                  ShareSpace profile
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {region?<Pill>📍 {region}</Pill>:<Pill>📍 Region not set</Pill>}
                  {budget?<Pill>💰 {budget}</Pill>:<Pill>💰 Budget not set</Pill>}
                  <Pill>🏠 {housing}</Pill>
                </div>
              </div>
            </div>

            <div className="sm:ml-auto sm:text-right">
              <div className="rounded-xl bg-rose-50 px-4 py-3">
                <p className="text-sm font-medium text-gray-900">Next step</p>
                <p className="mt-1 text-sm text-gray-700">
                  Want to chat? Send a message from the match modal, or from the Inbox page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* About */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">About</h2>
            {hasBio?(
              <p className="mt-3 whitespace-pre-wrap text-gray-700 leading-relaxed">{profile.bio}</p>
            ):(
              <div className="mt-3 rounded-xl border border-dashed bg-gray-50 p-4">
                <EmptyHint>This member hasn’t added a bio yet. When profile questions are fully live, this section will become much richer.</EmptyHint>
              </div>
            )}
          </div>

          {/* Snapshot */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Snapshot</h2>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Region</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{region||"Not set"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Monthly budget</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{budget||"Not set"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">Housing</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{housing}</p>
              </div>
            </div>

            {!hasBasics?(
              <div className="mt-4 rounded-xl border border-dashed bg-white p-4">
                <EmptyHint>Right now you’re mostly seeing placeholder fields. Once the full profile form is wired to DynamoDB, this will show lifestyle preferences, deal-breakers, and more.</EmptyHint>
              </div>
            ):null}
          </div>
        </div>
      </div>
    </div>
  )
}

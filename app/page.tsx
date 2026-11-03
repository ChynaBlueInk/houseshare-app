import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { Users, Shield, Heart, KeyRound, Home, FileHeart } from "lucide-react";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Change this one line when you settle on the final name (e.g. "HostHER")
const SITE_NAME = "ShareSpace";

// Female head-and-shoulders profile, facing right
const PROFILE_PATH =
  "M 60 400 C 60 340, 90 320, 120 310 C 125 290, 120 270, 110 255 C 70 240, 50 190, 60 140 C 70 70, 130 30, 190 40 C 240 48, 265 90, 262 130 C 262 145, 266 155, 275 172 L 288 195 C 290 200, 285 204, 276 205 C 280 212, 279 218, 274 222 C 278 228, 276 235, 268 238 C 270 250, 262 262, 245 265 C 232 268, 220 270, 215 285 C 212 300, 220 315, 250 330 C 280 345, 300 370, 300 400 Z";

function ProfileImage({
  id,
  src,
  label,
  flip = false,
}: {
  id: string;
  src: string;
  label: string;
  flip?: boolean;
}) {
  return (
    <svg viewBox="0 0 300 400" className="h-auto w-full" role="img" aria-label={label}>
      <defs>
        <clipPath id={id}>
          <path d={PROFILE_PATH} transform={flip ? "translate(300,0) scale(-1,1)" : undefined} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="300" height="400" fill="#CFE0E6" />
        <image href={src} x="0" y="0" width="300" height="400" preserveAspectRatio="xMidYMid slice" />
      </g>
    </svg>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`absolute text-[#B08D3C] ${className}`}>
      ✦
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#F6F1E7] text-[#2E3A2C]">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-12 lg:pt-16">
        <Sparkle className="left-[8%] top-10 text-lg" />
        <Sparkle className="right-[12%] top-24 text-sm" />
        <Sparkle className="left-[30%] bottom-24 text-sm" />
        <Sparkle className="right-[28%] bottom-16 text-lg" />

        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.4fr_1fr]">
          {/* Left profile */}
          <div className="order-2 mx-auto w-40 sm:w-52 lg:order-1 lg:w-full">
            <ProfileImage id="profile-left" src="/share-home.png" label="Profile of a woman filled with a cosy shared home" />
          </div>

          {/* Centre */}
          <div className="order-1 text-center lg:order-2">
            {/* Curved text with badge */}
            <div className="relative mx-auto w-64 sm:w-72">
              <svg viewBox="0 0 300 150" className="w-full" aria-hidden="true">
                <defs>
                  <path id="hero-arc" d="M 40 140 A 110 110 0 0 1 260 140" />
                </defs>
                <text fill="#2E3A2C" fontSize="17" letterSpacing="5" className={serif.className}>
                  <textPath href="#hero-arc" startOffset="50%" textAnchor="middle">
                        SHARE A HOME
                  </textPath>
                </text>
              </svg>
              <div className="absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-xl bg-[#B5485D] shadow-md">
                <KeyRound className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
            </div>

            <h1 className={`${serif.className} mt-8 text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl`}>
              Two Women,
              <br />
              One Home
            </h1>

            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-[#4A5547]">
              {SITE_NAME} connects women 50+ who want to share a home, land, costs and company. Have a spare room, or
              looking for one? Find your kind of housemate.
            </p>

            {/* Arc with button */}
            <div className="relative mx-auto mt-6 max-w-lg">
              <svg viewBox="0 0 600 80" className="w-full" aria-hidden="true">
                <path d="M 10 10 Q 300 90 590 10" fill="none" stroke="#B08D3C" strokeWidth="1.5" />
              </svg>
              <Link
                href="/profile/create"
                className="absolute left-1/2 top-[62%] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#B08D3C] text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-[#967630] focus:outline-none focus:ring-4 focus:ring-[#B08D3C]/40"
              >
                Join
              </Link>
            </div>

            <div className="mt-10">
              <Link
                href="/browse"
                className="text-lg font-medium text-[#2E3A2C] underline decoration-[#B08D3C] decoration-2 underline-offset-4 hover:text-[#B5485D]"
              >
                Browse profiles
              </Link>
            </div>
          </div>

          {/* Right profile */}
          <div className="order-3 mx-auto w-40 sm:w-52 lg:w-full">
            <ProfileImage id="profile-right" src="/share-land.png" label="Profile of a woman filled with a New Zealand landscape" flip />
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-6 border-y border-[#B08D3C]/30 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className={`${serif.className} text-5xl font-semibold text-[#B5485D]`}>50+</p>
            <p className="mt-2 text-sm uppercase tracking-widest text-[#4A5547]">Women only</p>
          </div>

          <div className="text-center lg:col-span-1">
            <h2 className={`${serif.className} text-3xl font-semibold`}>Homes, Land &amp; Company</h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A5547]">
              Share a spare room, a self-contained space, or land for a campervan. Split the costs and gain good
              company.
            </p>
          </div>

          <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-md">
            <img src="/HomeImage.png" alt="Women laughing and enjoying wine together" className="h-full w-full object-cover" />
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <Home className="mx-auto h-10 w-10 text-[#B08D3C]" aria-hidden="true" />
            <p className="mt-3 text-sm uppercase tracking-widest text-[#4A5547]">Have a room or</p>
            <p className="text-sm uppercase tracking-widest text-[#4A5547]">need a room</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className={`${serif.className} mb-12 text-center text-4xl font-semibold`}>Why Choose {SITE_NAME}?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Compatibility Matching",
                text: "A detailed questionnaire matches you on lifestyle, habits and what good company means to you.",
              },
              {
                icon: Shield,
                title: "Safety First",
                text: "Profiles are checked and contact details stay private until you both choose to connect.",
              },
              {
                icon: FileHeart,
                title: "Plan for the What-Ifs",
                text: "Guidance on agreeing what happens if either of you gets sick, moves into care or passes away.",
              },
              {
                icon: Heart,
                title: "Community Focused",
                text: "Built for women 50+ who value companionship, shared experiences and mutual support.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#B08D3C]/30 bg-[#F6F1E7] p-6 text-center transition-colors hover:border-[#B08D3C]"
              >
                <Icon className="mx-auto mb-4 h-10 w-10 text-[#B5485D]" aria-hidden="true" />
                <h3 className={`${serif.className} mb-3 text-2xl font-semibold`}>{title}</h3>
                <p className="text-base leading-relaxed text-[#4A5547]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className={`${serif.className} mb-12 text-center text-4xl font-semibold`}>How It Works</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Create Your Profile",
                text: "Share your housing situation, lifestyle, location and what you're looking for in a housemate.",
              },
              {
                title: "Browse & Connect",
                text: "Explore compatible profiles and message women who interest you.",
              },
              {
                title: "Meet & Move In",
                text: "Meet in person, agree your arrangements in writing, and settle into your new home share.",
              },
            ].map(({ title, text }, i) => (
              <div key={title} className="text-center">
                <div
                  className={`${serif.className} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#B08D3C] text-3xl font-semibold text-[#B08D3C]`}
                >
                  {i + 1}
                </div>
                <h3 className={`${serif.className} mb-3 text-2xl font-semibold`}>{title}</h3>
                <p className="text-base leading-relaxed text-[#4A5547]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2E3A2C] px-4 py-16 text-center text-[#F6F1E7]">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${serif.className} mb-6 text-4xl font-semibold`}>Ready to Find Your Kind of Housemate?</h2>
          <p className="mb-8 text-lg text-[#F6F1E7]/80">
            Join women across New Zealand looking to share their homes, land and days.
          </p>
          <Link
            href="/profile/create"
            className="inline-block rounded-full bg-[#B08D3C] px-10 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#967630] focus:outline-none focus:ring-4 focus:ring-[#B08D3C]/40"
          >
            Create Your Profile
          </Link>
        </div>
      </section>
    </div>
  );
}
import React from "react"

export default function BoardersInfoPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Boarders, Benefits, and the Law (NZ)</h1>

      <p className="text-lg">
        If you're renting out a room in your home, it's important to know the difference between a
        boarder and a tenant — and how it affects your legal obligations and government benefits.</p>  
        <p>The information on this page is current at the time of writing and may change at any time due to policy and law changes.  
        Make sure you research the legalities correctly before entering into a contract with anyone.
      </p>

      <section>
        <h2 className="text-2xl font-semibold">1. Who Is a Boarder?</h2>
        <p>
          A <strong>boarder</strong> is someone who rents a room in your home where you also live.
          They may share facilities and sometimes meals. In most cases, the{" "}
          <a
            href="https://www.tenancy.govt.nz/starting-a-tenancy/types-of-tenancy/flatmates-boarders-and-tenants/"
            className="text-blue-600 underline"
            target="_blank"
          >
            Residential Tenancies Act 1986
          </a>{" "}
          does not apply to boarders — only to tenants with full tenancy rights.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">2. How It Affects Government Benefits</h2>
        <p>
          If you receive support from <strong>Work and Income NZ (WINZ)</strong>, you must declare
          any income from boarders.
        </p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>You can usually have up to two boarders before it's considered a business.</li>
          <li>
            Income up to a threshold (currently around <strong>$207/week per boarder</strong>) is
            not taxable.
          </li>
          <li>
            Declaring income is required for benefits like the Accommodation Supplement or Jobseeker
            Support.
          </li>
        </ul>
        <p>
          More info from WINZ:{" "}
          <a
            href="https://www.workandincome.govt.nz/map/income-tests/income-from-boarders-and-flatmates/index.html"
            className="text-blue-600 underline"
            target="_blank"
          >
            Income from Boarders
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">3. Do You Need to Pay Tax?</h2>
        <p>
          As long as you stay below the IRD's boarder income threshold, you won’t pay tax. If you
          exceed the threshold, you may need to pay tax on the income or use the actual cost method.
        </p>
        <p>
          IRD Guidance:{" "}
          <a
            href="https://www.ird.govt.nz/income-tax/income-tax-for-individuals/types-of-individual-income/boarders-and-renters"
            className="text-blue-600 underline"
            target="_blank"
          >
            Boarders and Renters – IRD
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">4. Written Agreements</h2>
        <p>
          It's strongly recommended you have a written boarder agreement. It should cover rent,
          bills, house rules, and other expectations.
        </p>
        <p>
          Example template:{" "}
          <a
            href="https://communitylaw.org.nz/community-law-manual/chapter-24-flatting-and-renting/boarders/"
            className="text-blue-600 underline"
            target="_blank"
          >
            Community Law Sample Boarder Agreement
          </a>
        </p>
      </section>

      <footer className="pt-6 border-t">
        <p className="text-sm text-gray-500">
          This page is for general guidance only. For personal legal or financial advice, contact
          Work and Income, IRD, or a community law centre.
        </p>
      </footer>
    </div>
  )
}

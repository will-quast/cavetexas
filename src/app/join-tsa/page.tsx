export const metadata = {
  title: "Become a TSA Member | Texas Speleological Association",
  description:
    "Join the Texas Speleological Association and become part of the caving community.",
};

export default function JoinTSAPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Become a TSA Member</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Membership Benefits</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access to TSA events and projects</li>
            <li>Subscription to The Texas Caver magazine</li>
            <li>Voting rights at TSA meetings</li>
            <li>Connection to the Texas caving community</li>
            <li>Support cave conservation in Texas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Membership Types</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Individual Membership
              </h3>
              <p className="mb-4">Full membership for one person</p>
              <p className="text-2xl font-bold mb-2">$30/year</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>All standard benefits</li>
                <li>One vote at meetings</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Family Membership</h3>
              <p className="mb-4">
                Coverage for family members at same address
              </p>
              <p className="text-2xl font-bold mb-2">$45/year</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>All standard benefits</li>
                <li>Two votes at meetings</li>
                <li>Single copy of publications</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Join</h2>
          <p className="mb-4">
            To become a member, please contact our membership coordinator. New
            memberships are processed manually to ensure proper integration with
            our caving community.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="font-semibold">Contact Information:</p>
            <p>Email: membership@cavetexas.org</p>
          </div>
        </section>
      </div>
    </main>
  );
}

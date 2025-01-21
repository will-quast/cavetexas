export const metadata = {
  title: "Find Your Local Grotto | Texas Speleological Association",
  description: "Connect with local caving clubs (grottos) across Texas.",
};

const grottos = [
  {
    name: "Aggie Speleological Society",
    location: "College Station",
    university: "Texas A&M University",
    website: "https://aggiecavers.org",
    meetingInfo: "Meetings held during Fall and Spring semesters",
  },
  {
    name: "Bexar Grotto",
    location: "San Antonio",
    meetingInfo: "Meets every 2nd and 4th Monday",
    website: "https://bexargrotto.org",
  },
  {
    name: "Dallas-Fort Worth Grotto",
    location: "Dallas-Fort Worth Metroplex",
    meetingInfo: "Meets every 4th Wednesday",
    website: "https://dfwgrotto.org",
  },
  // Add more grottos as needed
];

export default function TexasGrottosPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Your Local Grotto</h1>

      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Grottos are local caving clubs affiliated with the National
          Speleological Society (NSS). They are the best way to get started in
          caving, meet experienced cavers, and participate in organized caving
          trips.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grottos.map((grotto) => (
          <div key={grotto.name} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{grotto.name}</h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Location:</strong> {grotto.location}
              </p>
              {grotto.university && (
                <p>
                  <strong>Affiliated with:</strong> {grotto.university}
                </p>
              )}
              <p>
                <strong>Meetings:</strong> {grotto.meetingInfo}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={grotto.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {grotto.website.replace("https://", "")}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Starting a New Grotto?</h2>
        <p className="mb-4">
          If you're interested in starting a new grotto in your area, the TSA
          can help connect you with other cavers and provide guidance on the
          process.
        </p>
        <p>
          Contact us at{" "}
          <a
            href="mailto:info@cavetexas.org"
            className="text-blue-600 hover:text-blue-800"
          >
            info@cavetexas.org
          </a>
        </p>
      </div>
    </main>
  );
}

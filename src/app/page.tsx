import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">
            Texas Speleological Association
          </h1>
          <p className="text-xl">
            Promoting and coordinating responsible caving in Texas
          </p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Welcome to TSA</h2>
        <p className="text-lg">
          The Texas Speleological Association (TSA) is an organization of cavers
          and caving clubs dedicated to the exploration, study, and conservation
          of caves in Texas.
        </p>
      </section>
    </main>
  );
}

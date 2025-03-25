import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface MemberDetails {
  id: number;
  user_id: string;
  created_at: string;
  status: "member" | "nonmember";
  expires: string;
}

export default async function MembersPage() {
  const supabase = await createClient();

  // Get and verify the session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  // Get authenticated user data
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error fetching user:", userError);
    redirect("/login");
  }

  console.log("Authenticated user ID:", user.id); // Debug log

  // Fetch member details from database with explicit type
  const { data: memberData, error: memberError } = await supabase
    .from("members")
    .select("id, user_id, created_at, status, expires")
    .eq("user_id", user.id)
    .single();

  if (memberError) {
    console.error("Error fetching member details:", {
      error: memberError,
      code: memberError.code,
      message: memberError.message,
      details: memberError.details,
      hint: memberError.hint,
      user_id: user.id,
    });
  }

  // Debug log for member data
  console.log("Member query result:", { memberData, error: memberError });

  const memberDetails = memberData as MemberDetails;

  // If no member details found, show appropriate message
  if (!memberDetails) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">TSA Members Area</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user.email}</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-yellow-700">
              Your membership details could not be found. If you believe this is
              an error, please contact the TSA membership coordinator.
            </p>
            <p className="text-yellow-700 mt-2">Reference ID: {user.id}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">TSA Members Area</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.email}</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Member Resources</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Access to The Texas Caver magazine archives</li>
              <li>Member directory</li>
              <li>Project documentation</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Account Details</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Account created:</strong>{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Membership Status</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`capitalize ${
                      memberDetails.status === "member"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {memberDetails.status}
                  </span>
                </p>
                <p>
                  <strong>Member ID:</strong> {memberDetails.id}
                </p>
                <p>
                  <strong>Membership Expires:</strong>{" "}
                  {new Date(memberDetails.expires).toLocaleDateString()}
                </p>
                <p>
                  <strong>Joined TSA:</strong>{" "}
                  {new Date(memberDetails.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

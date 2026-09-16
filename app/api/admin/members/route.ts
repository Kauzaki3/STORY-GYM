import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// GET /api/admin/members — List all profiles with their member status
export async function GET() {
  try {
    // Get all profiles
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesError) {
      return NextResponse.json({ error: profilesError.message }, { status: 500 });
    }

    // Get all member records
    const { data: members, error: membersError } = await supabaseAdmin
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (membersError) {
      return NextResponse.json({ error: membersError.message }, { status: 500 });
    }

    // Merge: for each profile, attach member data if exists
    const merged = (profiles || []).map((profile) => {
      const member = (members || []).find((m) => m.profile_id === profile.id);
      return {
        id: profile.id,
        code: member?.member_code || "-",
        name: profile.full_name,
        phone: profile.phone || "-",
        email: profile.email,
        membership: member ? "Member" : "Guest",
        status: member?.status || "GUEST",
        startDate: member?.start_date || "-",
        expiryDate: member?.expiry_date || "-",
        profileId: profile.id,
        memberId: member?.id || null,
        role: profile.role,
      };
    });

    return NextResponse.json({ members: merged });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

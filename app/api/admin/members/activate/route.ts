import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// POST /api/admin/members/activate
// Body: { profileId, membership, startDate, expiryDate }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profileId, membership, startDate, expiryDate } = body;

    if (!profileId || !membership || !startDate || !expiryDate) {
      return NextResponse.json(
        { error: "Missing required fields: profileId, membership, startDate, expiryDate" },
        { status: 400 }
      );
    }

    // 1. Get the profile to retrieve name, email, phone
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // 2. Check if a member record already exists for this profile
    const { data: existingMember } = await supabaseAdmin
      .from("members")
      .select("*")
      .eq("profile_id", profileId)
      .single();

    if (existingMember) {
      // Update existing member record
      const { data: updatedMember, error: updateError } = await supabaseAdmin
        .from("members")
        .update({
          status: "ACTIVE",
          start_date: startDate,
          expiry_date: expiryDate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingMember.id)
        .select()
        .single();

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, member: updatedMember });
    }

    // 3. Generate member code
    const { count } = await supabaseAdmin
      .from("members")
      .select("*", { count: "exact", head: true });

    const memberCode = `SG-2026-${String((count || 0) + 1).padStart(4, "0")}`;

    // 4. Create a new member record
    const { data: newMember, error: insertError } = await supabaseAdmin
      .from("members")
      .insert({
        member_code: memberCode,
        profile_id: profileId,
        full_name: profile.full_name,
        phone: profile.phone || "-",
        email: profile.email,
        status: "ACTIVE",
        start_date: startDate,
        expiry_date: expiryDate,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // 5. Update the profile role to MEMBER
    await supabaseAdmin
      .from("profiles")
      .update({ role: "MEMBER" })
      .eq("id", profileId);

    return NextResponse.json({ success: true, member: newMember });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

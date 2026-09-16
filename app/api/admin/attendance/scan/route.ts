import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// POST /api/admin/attendance/scan
// Body: { memberId } — can be a member_code (SG-2026-0001) or a profile UUID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberId } = body;

    if (!memberId) {
      return NextResponse.json(
        { success: false, error: "memberId is required" },
        { status: 400 }
      );
    }

    // Try to find member by member_code first (manual input: "SG-2026-0001")
    let member = null;

    const { data: byCode } = await supabaseAdmin
      .from("members")
      .select("*")
      .eq("member_code", memberId)
      .single();

    if (byCode) {
      member = byCode;
    } else {
      // Try by profile_id (from QR code which contains the profile UUID)
      const { data: byProfileId } = await supabaseAdmin
        .from("members")
        .select("*")
        .eq("profile_id", memberId)
        .single();

      if (byProfileId) {
        member = byProfileId;
      }
    }

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member tidak ditemukan di database." },
        { status: 404 }
      );
    }

    if (member.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, error: `Status membership: ${member.status}. Harap perpanjang membership.` },
        { status: 403 }
      );
    }

    // Record attendance
    await supabaseAdmin.from("attendance").insert({
      member_id: member.id,
      check_in_time: new Date().toISOString(),
      notes: "Check-in via admin scanner",
    });

    return NextResponse.json({
      success: true,
      member: {
        name: member.full_name,
        code: member.member_code,
        membership: "Active Member",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

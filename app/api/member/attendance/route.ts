import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// GET /api/member/attendance — Fetch attendance for the logged-in user
export async function GET() {
  try {
    // In Next.js 16, cookies() returns a Promise
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set() {},
          remove() {},
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ attendance: [] });
    }

    // Find the profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ attendance: [] });
    }

    // Find the member record
    const { data: member } = await supabaseAdmin
      .from("members")
      .select("id")
      .eq("profile_id", profile.id)
      .single();

    if (!member) {
      return NextResponse.json({ attendance: [] });
    }

    // Fetch last 10 attendance records
    const { data: attendance } = await supabaseAdmin
      .from("attendance")
      .select("*")
      .eq("member_id", member.id)
      .order("check_in_time", { ascending: false })
      .limit(10);

    return NextResponse.json({ attendance: attendance || [] });
  } catch (err: any) {
    return NextResponse.json({ attendance: [], error: err.message }, { status: 200 });
  }
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('free_trial_leads').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone, email, visit_date, visit_time, fitness_goal } = body;

    const { data, error } = await supabaseAdmin.from('free_trial_leads').insert([{
      full_name,
      phone,
      email,
      visit_date,
      visit_time,
      fitness_goal,
      status: 'NEW'
    }]).select();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    const { data, error } = await supabaseAdmin.from('free_trial_leads').update({ status, notes, updated_at: new Date().toISOString() }).eq('id', id).select();
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

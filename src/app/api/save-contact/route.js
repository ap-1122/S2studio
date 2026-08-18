import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, 
});

export async function POST(req) {
  try {
    const data = await req.json();
    
    if (!process.env.SANITY_API_TOKEN) {
      console.error("SANITY_API_TOKEN is missing!");
      return NextResponse.json({ success: false, error: "API Token Missing" }, { status: 500 });
    }

    const doc = {
      _type: 'contactLead',
      ...data,
      submittedAt: new Date().toISOString(),
    };
    
    await client.create(doc);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Sanity Contact Save Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
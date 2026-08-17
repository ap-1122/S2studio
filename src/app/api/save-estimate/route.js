import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Ye line zaroori hai data save karne ke liye
});

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Check if token exists
    if (!process.env.SANITY_API_TOKEN) {
      console.error("SANITY_API_TOKEN is missing in .env file!");
      return NextResponse.json({ success: false, error: "API Token Missing" }, { status: 500 });
    }

    const doc = {
      _type: 'estimateLead',
      ...data,
    };
    
    await client.create(doc);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Sanity Create Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}







// import { NextResponse } from 'next/server';
// import { createClient } from 'next-sanity';

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: '2024-01-01',
//   useCdn: false,
//   // Zaroori note: Tumhe Sanity dashboard se ek API Token banakar .env file me SANITY_API_TOKEN naam se rakhna hoga
//   token: process.env.SANITY_API_TOKEN, 
// });

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const doc = {
//       _type: 'estimateLead',
//       ...data,
//     };
//     await client.create(doc);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
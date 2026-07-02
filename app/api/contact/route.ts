import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { sendContactEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data;
    // Simple validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    // Append to CSV file in /data (create if not exists)
    const csvLine = `"${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${phone.replace(/"/g, '""')}","${message.replace(/"/g, '""')}"\n`;
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'contacts.csv');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(filePath, csvLine, 'utf8');
    // Send email notification to admin
    await sendContactEmail({ name, email, phone, message });
    console.log('New contact saved and emailed:', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

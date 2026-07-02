import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1] ?? '';
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''; // set in .env.local
  if (ADMIN_TOKEN && token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'contacts.csv');
    const exists = await fs.stat(filePath).then(() => true).catch(() => false);
    if (!exists) {
      return NextResponse.json({ contacts: [] });
    }
    const csv = await fs.readFile(filePath, 'utf8');
    const lines = csv.trim().split('\n').filter(Boolean);
    const contacts = lines.map((line) => {
      const [name, email, phone, message] = line
        .split(',')
        .map((v) => v.replace(/^"|"$/g, '').replace(/""/g, '"'));
      return { name, email, phone, message };
    });
    return NextResponse.json({ contacts });
  } catch (err) {
    console.error('Error reading contacts:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

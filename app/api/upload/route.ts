import { ftpService } from '@/lib/ftp-service';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: Request) {
  console.log(`[API Upload] Received request for URL: ${request.url}`);

  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[API Upload] Parsing form data...');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const rawPath = (formData.get('path') as string) || 'uploads/';

    if (!file) {
      return NextResponse.json({ success: false, message: 'File is required' }, { status: 400 });
    }

    let path = rawPath.replace(/^\/+/, '').replace(/\/+$/, '') + '/'; // remove leading/trailing slashes and add one
    console.log(`[API Upload] Sanitized path: "${path}"`);
    console.log(`[API Upload] Upload target: "${path}${file.name}"`);

    const result = await ftpService.uploadFile(file, path);

    if (!result.success) {
      console.error(`[API Upload] FTP upload failed: ${result.message}`);
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      fileUrl: result.url,
      name: result.name
    });

  } catch (error: any) {
    console.error('[API Upload] Unexpected error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
import { ftpService } from '@/lib/ftp-service';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: Request) {
  console.log(`[API Upload] Received request for URL: ${request.url}`);

  const session = await auth();
  if (!session) {
    console.error('[API Upload] Block Failed: Authentication.');
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    console.log('[API Upload] Processing: Parsing form data...');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Log the raw path received from the client
    const rawPath = formData.get('path') as string;
    console.log(`[API Upload] Raw path from FormData: "${rawPath}"`);

    let path = rawPath || 'uploads/documents/';
    console.log(`[API Upload] Path before sanitization: "${path}"`);

    if (path.startsWith('/')) {
      path = path.substring(1);
      console.log(`[API Upload] Path was absolute. Sanitized to: "${path}"`);
    }

    if (!file) {
      console.error('[API Upload] Block Failed: File validation.');
      return NextResponse.json(
        { success: false, message: 'File is required' },
        { status: 400 }
      );
    }

    console.log(`[API Upload] Processing: Calling FTP service with sanitized path: "${path}"`);
    const result = await ftpService.uploadFile(file, path);

    if (!result.success) {
      console.error(`[API Upload] Block Failed: FTP service returned failure: ${result.message}`);
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }

    console.log(`[API Upload] Success! File uploaded to: ${result.url}`);
    return NextResponse.json({
      success: true,
      fileUrl: result.url,
      name: result.name
    });

  } catch (error: any) {
    console.error('[API Upload] Block Failed: Caught an unexpected error.', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
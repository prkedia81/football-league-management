import { ftpService } from '@/lib/ftp-service';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string || 'uploads/documents/';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'File is required' },
        { status: 400 }
      );
    }

    const result = await ftpService.uploadFile(file, path);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 501 }
      );
    }

    return NextResponse.json({
      success: true,
      fileUrl: result.url,
      name: result.name
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 503 }
    );
  }
}
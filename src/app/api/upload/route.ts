import { NextRequest, NextResponse } from 'next/server';
import { uploadSingle, getFileUrl } from '@/lib/multer';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size too large. Maximum 5MB allowed' }, { status: 400 });
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.name.split('.').pop();
    const filename = `product-${uniqueSuffix}.${ext}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file to filesystem
    const fs = require('fs');
    const path = require('path');
    const uploadPath = path.join(process.cwd(), 'public/uploads/products', filename);
    
    fs.writeFileSync(uploadPath, buffer);

    // Return the file URL
    const fileUrl = getFileUrl(filename);

    return NextResponse.json({ 
      success: true, 
      filename,
      url: fileUrl 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file' 
    }, { status: 500 });
  }
}

// Handle DELETE request to remove uploaded files
export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'public/uploads/products', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete file' 
    }, { status: 500 });
  }
}

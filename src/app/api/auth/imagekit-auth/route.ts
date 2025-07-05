import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if required environment variables are present
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      console.error("Missing ImageKit environment variables:", {
        publicKey: !!publicKey,
        privateKey: !!privateKey,
        urlEndpoint: !!urlEndpoint,
      });
      return NextResponse.json({ 
        error: "ImageKit configuration error - missing environment variables" 
      }, { status: 500 });
    }

    // Dynamic import to avoid build-time issues
    const ImageKit = (await import("imagekit")).default;
    
    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    const authenticationParameters = imagekit.getAuthenticationParameters();
    
    return NextResponse.json(authenticationParameters);
    
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    
    // Return a more detailed error response
    return NextResponse.json({ 
      error: "ImageKit authentication failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

import {NextRequest,NextResponse} from 'next/server';
export function middleware(req:NextRequest){
 const path=req.nextUrl.pathname;
 if(path==='/api/security')return NextResponse.next();
 if(process.env.ENABLE_PRIVATE_STUDIO!=='true')return new NextResponse('Estúdio privado desativado.',{status:403});
 const token=process.env.APP_ACCESS_TOKEN;
 if(path.startsWith('/api/')&&(!token||req.headers.get('x-app-token')!==token))return NextResponse.json({error:'Não autorizado'},{status:401});
 return NextResponse.next();
}
export const config={matcher:['/api/:path*','/studio/:path*']};

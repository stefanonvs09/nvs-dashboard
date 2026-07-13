import { rewrite, next } from '@vercel/edge';

// Solo se ejecuta en la raíz "/". El hub y las demás páginas no se tocan.
export const config = { matcher: '/' };

export default function middleware(request) {
  try {
    const host = (request.headers.get('host') || '').toLowerCase();
    if (host === 'camp.playwithnewvision.com') {
      // Rewrite interno: sirve el Camp ID sin cambiar la URL de la barra.
      return rewrite(new URL('/camp.html?camp=panama-flag-2026', request.url));
    }
  } catch (e) {
    // Ante cualquier error, dejamos pasar: el redirect de vercel.json actúa de respaldo.
  }
  return next();
}

import { rewrite, next } from '@vercel/edge';

// Actúa en la raíz y en /camp.html (solo del subdominio del camp).
export const config = { matcher: ['/', '/camp.html'] };

export default function middleware(request) {
  try {
    const host = (request.headers.get('host') || '').toLowerCase();
    if (host === 'camp.playwithnewvision.com') {
      const url = new URL(request.url);

      if (url.pathname === '/camp.html') {
        // Si viene del rewrite interno (marca __mw=1), servir tal cual (evita bucles).
        if (url.searchParams.get('__mw') === '1') return next();
        // Visita directa a /camp.html -> mandar a la URL limpia.
        return Response.redirect(new URL('/', request.url).toString(), 307);
      }

      // Raíz "/": servir el Camp ID por dentro, sin cambiar la barra de direcciones.
      return rewrite(new URL('/camp.html?__mw=1&camp=panama-flag-2026', request.url));
    }
  } catch (e) {
    // Ante cualquier error, dejar pasar (sirve el comportamiento normal).
  }
  return next();
}

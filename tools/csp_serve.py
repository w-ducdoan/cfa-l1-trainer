"""Serve dist/ with a Content-Security-Policy like the claude.ai artifact viewer's, to catch blocked loads locally.

Usage:  python -P tools/csp_serve.py [PORT]   (default 8766), then open http://localhost:PORT/page.html
"""
import functools, http.server, pathlib, sys

CSP = ("default-src 'none'; "
       "script-src 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com; "
       "style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; "
       "img-src data: blob:; connect-src 'self'")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Content-Security-Policy', CSP)
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
dist = pathlib.Path(__file__).resolve().parent.parent / 'dist'
http.server.ThreadingHTTPServer(('127.0.0.1', port), functools.partial(Handler, directory=str(dist))).serve_forever()

/**
 * OMNI-GROWTH WORKSPACE 2026
 * Security Layer: 405 Method Not Allowed Fix (GET-based Auth)
 */

export const config = {
  matcher: '/((?!api|_next/static|_next/image|assets|favicon.ico|Logo.png|Icon.png).*)',
};

export default async function middleware(req) {
  const cookie = req.headers.get('cookie') || '';
  const url = new URL(req.url);

  // 1. Nếu đã có Session Cookie -> Cho phép vào
  if (cookie.includes('omni_auth=granted')) {
    return;
  }

  // 2. Logic xử lý Đăng nhập qua Query Parameters (Fix lỗi 405)
  const userParam = url.searchParams.get('u');
  const pwdParam = url.searchParams.get('p');

  if (userParam === 'omnigrowth' && pwdParam === 'growth2026') {
    // Đăng nhập thành công -> Xóa params trên URL và đặt Cookie
    const nextUrl = new URL(url.pathname, url.origin);
    return new Response(null, {
      status: 302,
      headers: {
        'Location': nextUrl.toString(),
        'Set-Cookie': 'omni_auth=granted; Path=/; HttpOnly; SameSite=Strict',
      },
    });
  }

  let errorMessage = '';
  if (userParam || pwdParam) {
    errorMessage = `
      <div style="background:#fff1f2; color:#be123c; padding:12px; border-radius:8px; font-size:13px; font-weight:600; margin-bottom:20px; border:1px solid #fecdd3; display:flex; align-items:center; gap:8px;">
        <i class="fas fa-exclamation-circle"></i> Tài khoản hoặc mật khẩu không chính xác!
      </div>`;
  }

  // 3. Giao diện Đăng nhập Premium (Sử dụng method="GET")
  const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đăng nhập | Omni-Growth Workspace</title>
      <link rel="icon" href="/Icon.png" type="image/png">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
      <style>
        :root { --pnj-blue: #003468; --pnj-gold: #F7A800; --bg-gray: #f8fafc; }
        body {
          margin: 0; font-family: 'Inter', sans-serif;
          display: flex; align-items: center; justify-content: center; height: 100vh;
          background: linear-gradient(135deg, #001f3f 0%, #003468 100%);
        }
        .login-card {
          background: #ffffff; padding: 48px 40px; border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          width: 100%; max-width: 400px; text-align: center; position: relative; overflow: hidden;
        }
        .login-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: var(--pnj-gold);
        }
        .logo { max-width: 140px; margin-bottom: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
        .title { color: var(--pnj-blue); font-size: 22px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }
        .subtitle { color: #64748b; font-size: 14px; margin-bottom: 32px; line-height: 1.5; }
        .input-group { margin-bottom: 20px; text-align: left; position: relative; }
        .input-group i { position: absolute; left: 14px; top: 16px; color: #94a3b8; font-size: 14px; }
        .input-group input {
          width: 100%; padding: 14px 14px 14px 42px; border: 1.5px solid #e2e8f0;
          border-radius: 12px; box-sizing: border-box; font-size: 15px; font-family: inherit;
          transition: all 0.2s; background: #fcfdfe;
        }
        .input-group input:focus { outline: none; border-color: var(--pnj-gold); box-shadow: 0 0 0 4px rgba(247, 168, 0, 0.1); }
        .btn-submit {
          width: 100%; padding: 16px; background: var(--pnj-blue); color: white;
          border: none; border-radius: 12px; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: all 0.3s; margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none;
        }
        .btn-submit:hover { background: #002244; transform: translateY(-1px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); }
        .footer-text { margin-top: 32px; font-size: 11px; color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; }
      </style>
    </head>
    <body>
      <div class="login-card">
        <img src="https://cdn.pnj.io/images/logo/pnj.com.vn.png" alt="PNJ Logo" class="logo">
        <div class="title">Omni-Growth Workspace</div>
        <div class="subtitle">Hệ thống Quản trị Tăng trưởng 2026<br><span style="font-size:12px; opacity:0.8;">Vui lòng đăng nhập để tiếp tục</span></div>
        
        ${errorMessage}

        <form method="GET" action="${url.pathname}">
          <div class="input-group">
            <i class="fas fa-user"></i>
            <input type="text" name="u" placeholder="Tên đăng nhập" required autocomplete="off">
          </div>
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input type="password" name="p" placeholder="Mật khẩu" required>
          </div>
          <button type="submit" class="btn-submit">
            Đăng nhập hệ thống <i class="fas fa-arrow-right"></i>
          </button>
        </form>
        <div class="footer-text">© 2026 PNJ Omni-Growth Team</div>
      </div>
    </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
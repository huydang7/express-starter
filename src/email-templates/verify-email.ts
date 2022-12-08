import { getHeader } from './header';

export const getEmailVerifyAccount = (link: string) => {
  return `<!doctype html>
  <html>
  ${getHeader()}
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #ffffff;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#ffffff">
          <tr>
              <td>
                  <table style="background-color: #ffffff;  margin:0 auto;" width="100%" border="0" align="center"
                      cellpadding="0" cellspacing="0">
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);border-radius: 6px">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#16104F; font-weight:600; margin:0;font-size:24px">
                                              Yêu cầu đặt lại mật khẩu</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              Xin chào, vui lòng nhấn vào link bên dưới để xác thực tài khoản
                                          </p>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                               Nếu hành động này không xuất phát từ bạn, hãy bỏ qua email này.
                                          </p>
                                          <a href="${link}"
                                              style="background:#FF357E;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:14px 32px;display:inline-block;border-radius:6px;">Xác nhận</a>
                                          </td>
                                      </tr>
                                  </tr>
                              </table>
                          </td>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`;
};

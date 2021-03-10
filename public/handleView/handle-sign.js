import { getCookie, eraseCookie } from './handle-token.js';
import { jwtDecode } from './jwt-decode.js';
export function handleToken() {
  let showExpire = $('#show_time-expire');
  let manage = $('.header_top--item.manager');
  let signManageNoSign = `<div class="sign">
  <a href="/public/login" class="_in -hover-text">
      Đăng Nhập
  </a>
  <a href="/public/registration" class="_up -hover-text">
      Đăng Ký
  </a>
</div>`;
  let signManageSigned = `<div class="_notification">
  <i class="far fa-bell"></i>
  <ul class="--dropdown">
      <li class="-item">Anything!</li>
      <li class="-item">Anything!</li>
      <li class="-item">Anything!</li>
      <li class="-item">Anything!</li>
  </ul>
</div>
<div class="_user">
  <i class="far fa-user"></i>
  <ul class="--dropdown">
      <li class="-item profile">
          <a href="/private/profile" class="_click">
              <span class="-avatar">
              <i class="far fa-user"></i>
              </span>
              <div class="-property">
                  <span href="" class="-title">Trang Cá Nhân</span>
              </div>
          </a>
      </li>
      <li class="-item">
          <a href="" class="_click">
              <span class="-avatar">
              <i class="fas fa-book-reader"></i>
              </span>
              <div class="-property">
                  <span href="" class="-name">Truyện Đã Theo Dõi</span>
              </div>
          </a>
      </li>
      <li class="-item">
          <a href="" class="_click">
              <span class="-avatar">
              <i class="fas fa-list-ol"></i>
              </span>
              <div class="-property">
                  <span href="" class="-name">Truyện Đã Đăng</span>
              </div>
          </a>
      </li>
      <li class="-item">
          <a href="/home" class="_click logout" id="header">
              <span class="-avatar">
              <i class="fas fa-sign-out-alt"></i>
              </span>
              <div class="-property">
                  <span href="" class="-name">Thoát</span>
              </div>
          </a>
      </li>
  </ul>   
</div>`;
  manage.html(signManageNoSign);
  const token = getCookie('Authorization');
  let session;
  if(token) {
    const decode = jwtDecode(token);
    let timeStampExp = decode.exp*1000;
    showExpire.closest('.--item').fadeIn(200);
    manage.empty();
    manage.html(signManageSigned).fadeIn(200);
    session = setInterval(() => {
      let timeStampToday = Date.parse((new Date()).toLocaleString());
      let getTime = new Date(((timeStampExp - timeStampToday)/1000) * 1000).toISOString().substr(11, 8);
      showExpire.html(getTime);
      if(!getCookie('Authorization')) {
        clearInterval(session);
        manage.empty();
        manage.html(signManageNoSign).fadeIn(200);
        showExpire.closest('.--item').fadeOut(200);
        location.reload();
      }
    }, 1000)
  }
}

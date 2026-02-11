const books = [
  { title: "AI概論：來來來，成為AI的良師益友", desc: "認識AI、理解AI", img: "https://roc-chtai.github.io/central/test/img/AIbook1.jpg" },
  { title: "AI機器人、藍芽與Android整合開發技術", desc: "以為實際案例，來貫穿整本書的內容。從Android的應用程式(簡稱App)開發者角度出發，基於UBOT/BLE框架，設計插件程式", img: "https://roc-chtai.github.io/central/test/img/AIbook2.jpg" },
  { title: "iPAS 經濟部產業人才 AI應用規劃師(初級)", desc: " 經濟部產業人才 AI應用規劃師必備書籍", img: "https://roc-chtai.github.io/central/test/img/AIbook3.jpg" },
  { title: "可視化輕鬆學AI", desc: "學AI之路，從探索特徵出發。讓人人都能駕馭AI，掌握AI變化", img: "https://roc-chtai.github.io/central/test/img/AIbook4.jpg" },
  { title: "不編程，而學AI", desc: "不懂程式學AI，好比不懂車而學開車", img: "https://roc-chtai.github.io/central/test/img/AIbook5.jpg" }
];

// ------ 輪播區塊 ------
const track = document.getElementById('bookTrack');
const carousel = document.getElementById('carouselOuter');
const bookCount = books.length;
const visibleCount = 7;
let cards = [];
let pos = 4; // 中心的浮點索引（可以不是整數，拖曳時用）
let isDragging = false, lastX = 0, velocity = 0, dragStartX = 0, dragStartPos = 0, lastTime = 0, momentumId = null;

function setupBooks() {
  for(let i=0; i<bookCount; i++) {
    const card = document.createElement('div');
    card.className = "carousel-book-card";
    const img = document.createElement('img');
    img.src = books[i].img;
    img.alt = "cover";
    img.draggable = false;
    img.addEventListener('dragstart', e => e.preventDefault());
    card.appendChild(img);
    track.appendChild(card);
    cards.push(card);
  }
}
function updateBooks(center=pos) {
  for(let i=0; i<bookCount; i++) {
    let dist = i - center;
    if(dist > bookCount/2) dist -= bookCount;
    if(dist < -bookCount/2) dist += bookCount;
    if(Math.abs(dist) > (visibleCount-1)/2) {
      cards[i].style.visibility = "hidden";
    } else {
      cards[i].style.visibility = "visible";
      const baseX = 150;
      const tx = dist * baseX;
      let scale = (Math.abs(dist) < 0.4) ? 1.7 : 1;
      if(scale < 0.6) scale = 0.6;
      let opacity = 1 - 0.23 * Math.abs(dist);
      if(opacity < 0.35) opacity=0.35;
      cards[i].style.transform = `translateX(${tx}px) scale(${scale})`;
      cards[i].style.opacity = opacity;
      cards[i].classList.toggle('center', Math.abs(dist) < 0.4);
    }
  }


  // 下方顯示中心那本資訊（四捨五入到最近的書）
  const centerIdx = ((Math.round(center) % bookCount) + bookCount) % bookCount;
  document.getElementById('descTitle').textContent = books[centerIdx].title;
  document.getElementById('descText').textContent = books[centerIdx].desc;
}
function startMomentum() {
  cancelMomentum();
  function step() {
    if(Math.abs(velocity) < 0.02) {
      velocity = 0;
      pos = Math.round(pos);
      updateBooks();
      return;
    }
    pos -= velocity;
    if(pos < 0) pos += bookCount;
    if(pos >= bookCount) pos -= bookCount;
    updateBooks();
    velocity *= 0.92;
    momentumId = requestAnimationFrame(step);
  }
  momentumId = requestAnimationFrame(step);
}
function cancelMomentum() {
  if(momentumId) cancelAnimationFrame(momentumId);
  momentumId = null;
}

carousel.addEventListener('mousedown', e => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartPos = pos;
  lastX = e.clientX;
  lastTime = Date.now();
  velocity = 0;
  cancelMomentum();
  carousel.classList.add('dragging');
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});
function onMouseMove(e) {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  pos = dragStartPos - dx / 150;
  if(pos < 0) pos += bookCount;
  if(pos >= bookCount) pos -= bookCount;
  updateBooks();
  const now = Date.now();
  velocity = (e.clientX - lastX) / (now - lastTime);
  lastX = e.clientX;
  lastTime = now;
}
function onMouseUp(e) {
  if (!isDragging) return;
  isDragging = false;
  carousel.classList.remove('dragging');
  pos = Math.round(pos);
  updateBooks();
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

// 觸控
carousel.addEventListener('touchstart', e => {
  if(e.touches.length > 1) return;
  isDragging = true;
  dragStartX = e.touches[0].clientX;
  dragStartPos = pos;
  lastX = e.touches[0].clientX;
  lastTime = Date.now();
  velocity = 0;
  cancelMomentum();
  carousel.classList.add('dragging');
}, {passive:true});
carousel.addEventListener('touchmove', e => {
  if(!isDragging) return;
  const dx = e.touches[0].clientX - dragStartX;
  pos = dragStartPos - dx / 150;
  if(pos < 0) pos += bookCount;
  if(pos >= bookCount) pos -= bookCount;
  updateBooks();
  const now = Date.now();
  velocity = (e.touches[0].clientX - lastX) / (now - lastTime);
  lastX = e.touches[0].clientX;
  lastTime = now;
}, {passive:true});
carousel.addEventListener('touchend', e => {
  if(!isDragging) return;
  isDragging = false;
  carousel.classList.remove('dragging');
  velocity = (e.changedTouches[0].clientX - lastX) / (Date.now() - lastTime);
  if(Math.abs(velocity) > 0.01) startMomentum();
  else {
    pos = Math.round(pos);
    updateBooks();
  }
}, {passive:true});

setupBooks();
updateBooks();



// ------ 一覽區塊 ------
function renderGridBooks(booksArr) {
  const grid = document.getElementById('bookGrid');
  grid.innerHTML = '';
  booksArr.forEach(book => {
    const card = document.createElement('div');
    card.className = "grid-book-card";
    card.innerHTML = `
      <div class="book-img-frame">
        <img src="${book.img}" alt="書封">
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-desc">${book.desc}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}
// 搜尋功能
document.getElementById('bookSearch').addEventListener('input', function () {
  const keyword = this.value.toLowerCase().trim();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(keyword) ||
    book.desc.toLowerCase().includes(keyword)
  );
  renderGridBooks(filtered);
});
renderGridBooks(books);


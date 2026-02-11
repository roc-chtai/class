const books = [
  { title: "AI應用規劃師-中級 應鑑指南 大數據處理", desc: "1.全面涵蓋核心技術：從自然語言處理（NLP）、生成式AI、到電腦視覺與多模態應用，完整架構AI知識體系。<br>2.理論與實務並進：不只講解LLM、RAG等前沿技術，更深入探討AI導入評估、風險管理及系統部署流程。<br>3.大數據分析觀念和技術：詳述大數據收集、清理、分析及可視化，掌握AI專案的導入開發流程，並探討隱私保護與合規性。<br>4.大數據與機器學習整合：熟悉如何規劃大數據成為AI模型的優質燃料，大幅提升機器學習的效益。<br>5.完整對應iPAS－AI應用規劃師能力鑑定的最新命題方向，並結合AIE人工智慧專業能力國際認證：BDAE大數據應用工程師的核心知識架構。", img: "https://roc-chtai.github.io/class/imges/IAPADATA.jpg" },
  { title: "AI應用規劃師-中級 應鑑指南 機器學習", desc: "1.完整知識架構：涵蓋AI基礎概念、機器學習、深度學習、生成式AI、多模態AI與大數據應用。<br>2.理論與實務並重：結合理論講解、實務案例與操作流程，培養實際應用能力。<br>3.掌握AI模型的架構和推理行為：建立優秀的模型建構、訓練與調校的能力。<br>4.導入規劃導向：包含AI專案評估、POC驗證、模型選擇、資料準備與部署流程；並重視AI治理、風險管理與國際治理規範。<br>5.大量範例與圖解：透過圖表與情境說明，降低學習門檻、提升理解效率。<br>6.完整對應IPAS－AI應用規劃師能力鑑定的最新命題方向，並結合AIE人工智慧專業能力國際認證：MLAE機器學習應用工程師的核心知識架構。", img: "https://roc-chtai.github.io/class/imges/IPASROBOTO.jpg" }
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


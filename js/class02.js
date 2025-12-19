document.addEventListener('DOMContentLoaded', () => {

  /* ===== 入場 / 退場 ===== */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
      } else {
        e.target.classList.remove('is-in');
      }
    });
  }, {
    threshold: 0.18
  });

  document.querySelectorAll('.js-animate').forEach(el => io.observe(el));

  /* ===== 上課地點資料 ===== */
  const data = {
    taoyuan: { name: "桃園", addr: "桃園市桃園區中華路109號1-2樓", map: "https://maps.app.goo.gl/NfUySHE6NH28K6Bw7" },
    hsinchu: { name: "新竹", addr: "新竹市民族路7號7樓", map: "https://maps.app.goo.gl/EDNygy5nM2LcdzU36" },
    taichung:{ name: "台中", addr: "台中市中區中山路16號", map: "https://maps.app.goo.gl/Qx7wKSdEp2vi14Km7" },
    chiayi:  { name: "嘉義", addr: "嘉義市林森西路560號", map: "https://maps.app.goo.gl/7QyXuBJ79Wd5w1c26" },
    tainan:  { name: "台南", addr: "台南市成功路65號2樓", map: "https://maps.app.goo.gl/9ozVj3xbF1ip92Bs7" },
    kaohsiung:{ name: "高雄", addr: "高雄市楠梓區建楠路221號", map: "https://maps.app.goo.gl/hC4JP3UFNXMUTbNn8" }
  };

  const nameEl = document.getElementById('tlCityName');
  const addrEl = document.getElementById('tlAddr');
  const mapEl  = document.getElementById('tlMap');

  document.querySelectorAll('.tl-city').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tl-city').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const d = data[btn.dataset.city];
      nameEl.textContent = d.name;
      addrEl.textContent = d.addr;
      mapEl.href = d.map;
    });
  });

  // 課程資料清單
  const courseData = [
    {
      title: "懂行業AI模型訓練實戰：打造專屬數位孿生AI",
      desc: "本課程系統帶你從零實作，學會如何利用數位孿生（DT）技術與LLM、GraphMERT、GNN等工具，訓練屬於自己的行業專屬AI模型。內容涵蓋：\n\n• 上游建設：領域知識文件蒐集、LLM知識萃取、種子知識圖(seed-KG)建構，進行行業型AI訓練。\n• 中游任務：運用自建模型閱讀應用文件、建構任務知識圖(task-KG)，進一步訓練GNN模型。\n• 下游應用：將GNN模型植入DT系統，打造行業智慧核心。\n• 實戰應用：結合強化學習，賦能AI機器人空間智慧，廣泛應用於醫療、無人機等多元產業。\n\n一步步帶領你，深入掌握AI在各行各業的落地訓練與應用關鍵。",
      btn: "立即了解專屬AI訓練流程",
      btnUrl: "https://roc-chtai.github.io/class/02"
    }
  ];

  const wrap = document.getElementById('course-list');
  wrap.innerHTML = `
    <div class="cl-container">
      <h2 class="cl-section-title">培訓課程內容</h2>
      ${courseData.map(c => `
        <div class="cl-item">
          <div class="cl-title">${c.title}</div>
          <div class="cl-content">
            <div class="cl-content-inner">
              <p>${c.desc}</p>
              <div class="cl-cta-wrap">
                <a href="${c.btnUrl}" target="_blank" class="cl-cta-btn">
                  <span>${c.btn}</span><span class="cl-cta-arrow">＞</span>
                </a>
              </div>
            </div>
          </div>
        </div>`).join('')}
    </div>`;

  wrap.querySelectorAll('.cl-title').forEach(t =>
    t.addEventListener('click', () =>
      t.parentElement.classList.toggle('active')
    )
  );
});

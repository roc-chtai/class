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

  /* ===== 課程清單 ===== */
  const courseData = [
    {
      title: "AI教師培育課程",
      desc: `掌握AI知識體系，精通生成式AI技能，熟悉AI PC功能。`,
      btn: "更多課程詳情",
      btnUrl: "https://roc-central-ai-edu.org/uploads/page/Summer/"
    },
    {
      title: "懂行業AI模型訓練實戰：打造專屬數位孿生AI",
      desc: "一步步帶你掌握行業專屬 AI 訓練流程。",
      btn: "立即了解",
      btnUrl: "https://roc-central-ai-edu.org/modules/tadnews/page.php?nsn=43&ncsn=7"
    }
  ];

  const wrap = document.getElementById('course-list');
  wrap.innerHTML = `
    <div class="cl-container">
      <h2 class="cl-section-title">各類培訓課程</h2>
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

// === 上課地點切換 ===
(function(){
  const data = {
    taoyuan: {
      name: "桃園",
      addr: "桃園市桃園區中華路109號1-2樓",
      map: "https://maps.app.goo.gl/NfUySHE6NH28K6Bw7"
    },
    hsinchu: {
      name: "新竹",
      addr: "新竹市民族路7號7樓",
      map: "https://maps.app.goo.gl/EDNygy5nM2LcdzU36"
    },
    taichung: {
      name: "台中",
      addr: "台中市中區中山路16號",
      map: "https://maps.app.goo.gl/Qx7wKSdEp2vi14Km7"
    },
    chiayi: {
      name: "嘉義",
      addr: "嘉義市林森西路560號",
      map: "https://maps.app.goo.gl/7QyXuBJ79Wd5w1c26"
    },
    tainan: {
      name: "台南",
      addr: "台南市成功路65號2樓",
      map: "https://maps.app.goo.gl/9ozVj3xbF1ip92Bs7"
    },
    kaohsiung: {
      name: "高雄",
      addr: "高雄市楠梓區建楠路221號",
      map: "https://maps.app.goo.gl/hC4JP3UFNXMUTbNn8"
    }
  };

  const nameEl = document.getElementById("tlCityName");
  const addrEl = document.getElementById("tlAddr");
  const mapEl  = document.getElementById("tlMap");

  document.querySelectorAll("#training-locations .tl-city").forEach(btn=>{
    btn.addEventListener("mouseenter", ()=>btn.classList.add("is-hover"));
    btn.addEventListener("mouseleave", ()=>btn.classList.remove("is-hover"));

    btn.addEventListener("click", ()=>{
      document.querySelectorAll("#training-locations .tl-city").forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const key = btn.getAttribute("data-city");
      const d = data[key];
      if(!d) return;

      nameEl.textContent = d.name;
      addrEl.textContent = d.addr;
      mapEl.href = d.map;

      const panel = document.querySelector("#training-locations .tl-panel-inner");
      panel.style.transform = "translateY(2px)";
      panel.style.opacity = "0.85";
      setTimeout(()=>{ panel.style.transform="translateY(0)"; panel.style.opacity="1"; }, 120);
    });
  });
})();


// === 課程區塊自動渲染 ===
const courseData = [
  {
    title: "AI教師培育課程",
    desc: `掌握AI知識體系，精通生成式AI技能，熟悉AI PC功能。帶領你成為推動AI教育的關鍵老師！

本課程專為教育工作者設計，從AI基礎知識體系到進階生成式AI應用，
系統化學習AI技術與AI PC實務，讓學員不僅能掌握最新科技趨勢，更能運用AI工具於教學現場。

課程內容包含翻轉學習、做中學、協作創作與創新實踐，
並結合 E-books、雲端訓練與實機操作，
幫助教師輕鬆跨足AI教育領域，成為推動智慧校園的關鍵力量。`,
    btn: "更多課程詳情",
    btnUrl: "https://roc-central-ai-edu.org/uploads/page/Summer/"
  },
  {
    title: "懂行業AI模型訓練實戰：打造專屬數位孿生AI",
    desc: "本課程系統帶你從零實作，學會如何利用數位孿生（DT）技術與LLM、GraphMERT、GNN等工具，訓練屬於自己的行業專屬AI模型。內容涵蓋：\n\n• 上游建設：領域知識文件蒐集、LLM知識萃取、種子知識圖(seed-KG)建構，進行行業型AI訓練。\n• 中游任務：運用自建模型閱讀應用文件、建構任務知識圖(task-KG)，進一步訓練GNN模型。\n• 下游應用：將GNN模型植入DT系統，打造行業智慧核心。\n• 實戰應用：結合強化學習，賦能AI機器人空間智慧，廣泛應用於醫療、無人機等多元產業。\n\n一步步帶領你，深入掌握AI在各行各業的落地訓練與應用關鍵。",
    btn: "立即了解專屬AI訓練流程",
    btnUrl: "https://roc-central-ai-edu.org/modules/tadnews/page.php?nsn=43&ncsn=7"
  }
];

// 自動產生課程卡片
function renderCourseList() {
  const wrap = document.getElementById('course-list');
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="cl-container">
      <h2 class="cl-section-title" data-aos="fade-up">各類培訓課程</h2>
      ${courseData.map(course => `
        <div class="cl-item" data-aos="fade-up">
          <div class="cl-title">
            <span>${course.title}</span>
          </div>
          <div class="cl-content">
            <div class="cl-content-inner">
              <p>${course.desc}</p>
              <div class="cl-cta-wrap">
                <a href="${course.btnUrl}" target="_blank" class="cl-cta-btn">
                  <span>${course.btn}</span>
                  <span class="cl-cta-arrow">＞</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // 點標題折疊展開
  wrap.querySelectorAll('.cl-title').forEach(function(title){
    title.addEventListener('click', function(){
      const item = this.parentElement;
      item.classList.toggle('active');
    });
  });

  // 【重點】課程內容產生完後刷新 AOS，動畫才會有
  if (typeof AOS !== 'undefined') {
    setTimeout(()=>AOS.refresh(), 100);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    renderCourseList();
    if (typeof AOS !== 'undefined') AOS.init();
});

/* =========================================================
   gotoclass.js
   課程列表 + 折疊動畫 + 上課地點互動
   ========================================================= */

(function () {
  "use strict";

  /* ===============================
     課程資料
     =============================== */
  const courseData = [
    {
      title: "AI教師培育課程",
      desc: `掌握AI知識體系，精通生成式AI技能，熟悉AI PC功能。
帶領你成為推動AI教育的關鍵老師！

本課程專為教育工作者設計，
從AI基礎到生成式AI應用，
結合實機操作與教學實務，
協助教師快速跨入AI教育領域。`,
      btn: "更多課程詳情",
      btnUrl: "https://roc-central-ai-edu.org/uploads/page/Summer/"
    },
    {
      title: "懂行業AI模型訓練實戰：打造專屬數位孿生AI",
      desc: `以 DT（數位孿生）為核心，
完整實作「懂行業」的 AI 模型訓練流程。

上游：LLM 萃取行業知識 → 建立 seed-KG  
中游：GraphMERT → task-KG → GNN  
下游：DT + 強化學習 → AI 機器人空間智慧

真正落地的產業級 AI 訓練實戰。`,
      btn: "立即了解訓練流程",
      btnUrl: "https://roc-central-ai-edu.org/modules/tadnews/page.php?nsn=43&ncsn=7"
    }
  ];

  /* ===============================
     上課地點資料（你指定版本）
     =============================== */
  const locationData = {
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

  /* ===============================
     課程列表渲染
     =============================== */
  function renderCourseList() {
    const wrap = document.getElementById("course-list");
    if (!wrap) return;

    wrap.innerHTML = `
      <div class="cl-container">
        <h2 class="cl-section-title">各類培訓課程</h2>
        ${courseData
          .map(
            (c) => `
          <div class="cl-item">
            <div class="cl-title">
              <span>${c.title}</span>
            </div>
            <div class="cl-content">
              <div class="cl-content-inner">
                <p>${c.desc}</p>
                <div class="cl-cta-wrap">
                  <a href="${c.btnUrl}" target="_blank" class="cl-cta-btn">
                    <span>${c.btn}</span>
                    <span class="cl-cta-arrow">＞</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    wrap.querySelectorAll(".cl-title").forEach((title) => {
      title.addEventListener("click", () => {
        title.parentElement.classList.toggle("active");
      });
    });
  }

  /* ===============================
     上課地點互動
     =============================== */
  function initLocations() {
    const nameEl = document.getElementById("tlCityName");
    const addrEl = document.getElementById("tlAddr");
    const mapEl = document.getElementById("tlMap");

    document
      .querySelectorAll("#training-locations .tl-city")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll("#training-locations .tl-city")
            .forEach((b) => b.classList.remove("is-active"));

          btn.classList.add("is-active");

          const key = btn.dataset.city;
          const d = locationData[key];
          if (!d) return;

          nameEl.textContent = d.name;
          addrEl.textContent = d.addr;
          mapEl.href = d.map;
        });
      });
  }

  /* ===============================
     DOM Ready
     =============================== */
  document.addEventListener("DOMContentLoaded", function () {
    renderCourseList();
    initLocations();
  });
})();

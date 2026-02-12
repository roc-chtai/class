    // 填入YouTube ID即可
    const ytIds = [
      "zTx5quF2H44",
      "pA-e602CT_k",
      "gfQP4Wl4k80"
    ];
    async function fetchVideoInfo(id) {
      const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
      let title = "YouTube 影片";
      let desc = "";
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          title = data.title;
          desc = data.author_name;
        }
      } catch (e) {}
      return {
        id, title, desc,
        video: `https://www.youtube.com/embed/${id}`,
        poster: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      }
    }
    async function buildVideoList() {
      const arr = [];
      for (const id of ytIds) arr.push(await fetchVideoInfo(id));
      return arr;
    }
    let mainIndex = 0, listMode = (window.innerWidth <= 760) ? 'list' : 'grid', videoList = [];
    async function renderAll() {
      videoList = await buildVideoList();
      renderThumbs();
      setMainVideo(0);
    }
    function renderThumbs() {
  const container = document.getElementById('video-thumbs');
  container.innerHTML = '';
  if(listMode === 'grid') {
    videoList.forEach((item, idx) => {
      const col = document.createElement('div');
      col.className = 'col-4 mb-4';
      col.innerHTML = `
        <div class="card video-thumb-card${idx===mainIndex?' active':''}" data-vid="${idx}">
          <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" class="card-img-top" alt="${item.title}">
          <div class="card-body"><div class="card-title">${item.title}</div></div>
        </div>
      `;
      col.querySelector('.video-thumb-card').onclick = () => setMainVideo(idx);
      container.appendChild(col);
    });
  } else {
    videoList.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = `list-thumb-card${idx===mainIndex?' active':''}`;
      div.setAttribute('data-vid', idx);
      div.innerHTML = `
        <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${item.title}">
        <div>
          <div class="list-thumb-title">${item.title}</div>
          <div class="list-thumb-desc">${item.desc}</div>
        </div>
      `;
      div.onclick = () => setMainVideo(idx);
      container.appendChild(div);
    });
  }
}

    function setMainVideo(idx) {
      mainIndex = idx;
      const vid = videoList[idx];
      const area = document.getElementById('main-video-area');
      area.innerHTML = `
        <div class="yt-rwd">
          <iframe src="${vid.video}" title="${vid.title}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
        </div>
        <h5 id="main-title">${vid.title}</h5>
        <p id="main-desc">由 ${vid.desc} 上傳</p>
      `;
    
   renderThumbs();
      if(window.innerWidth < 760){
        area.scrollIntoView({behavior:'smooth'});
      }
    }
    document.addEventListener('DOMContentLoaded', function(){
      document.getElementById('prev-video').onclick = (e) => {
        e.preventDefault(); setMainVideo((mainIndex-1+videoList.length)%videoList.length);
      };
      document.getElementById('next-video').onclick = (e) => {
        e.preventDefault(); setMainVideo((mainIndex+1)%videoList.length);
      };
      document.getElementById('switch-grid').onclick = function(){
        listMode = 'grid'; renderThumbs();
      };
      document.getElementById('switch-list').onclick = function(){
        listMode = 'list'; renderThumbs();
      };
      renderAll();
    });

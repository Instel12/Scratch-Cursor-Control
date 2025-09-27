async function check() {
  let match = window.location.pathname.match(/\/projects\/(\d+)/);
  if (!match) return;

  let id = match[1];
  let res = await fetch(`https://api.scratch.mit.edu/projects/${id}`);
  let data = await res.json();
  let desc = (data.description || "").trim();

  if (desc.includes("instel12.hidecur = true;")) {
    let tries = 0;
    let interval = setInterval(() => {
      let list = document.querySelector(".flex-row.extension-list");
      if (list) {
        if (!list.querySelector(".extension-chip.cursor-control")) {
          list.insertAdjacentHTML("beforeend", `
            <div class="extension-chip cursor-control">
              <img class="extension-icon" src="https://raw.githubusercontent.com/Instel12/Scratch-Cursor-Control/b1092f944c2928719fb93b323c32fc3abf3456aa/cursor.svg">
              <div class="extension-content"><span>Cursor Control</span></div>
            </div>
          `);
        }
        clearInterval(interval);
      }
      if (++tries > 20) {
        clearInterval(interval);
      }
    }, 300);

    document
      .querySelectorAll('.stage_stage_yEvd4.box_box_bP3Aq, .stage_stage-bottom-wrapper_vRJed')
      .forEach(el => el.style.cursor = 'none');
  }
}
check();

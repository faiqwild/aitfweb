const box = document.getElementById("jsonBox");
const statusEl = document.getElementById("status");
const reloadBtn = document.getElementById("reloadBtn");
const exportBtn = document.getElementById("exportBtn");

async function load(){
  const res = await fetch("../data/content.json");
  const json = await res.json();
  box.value = JSON.stringify(json, null, 2);
  statusEl.textContent = "Loaded content.json";
}

function exportJSON(){
  try{
    const obj = JSON.parse(box.value);
    const blob = new Blob([JSON.stringify(obj, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
    statusEl.textContent = "Exported content.json. Replace /data/content.json in repo lalu commit.";
  }catch(e){
    statusEl.textContent = "JSON invalid: " + e.message;
  }
}

reloadBtn.addEventListener("click", load);
exportBtn.addEventListener("click", exportJSON);

load();
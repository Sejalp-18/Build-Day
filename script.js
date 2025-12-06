
  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("tasks");
  const ding = document.getElementById("dingSound");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let dingBuffer = null;


fetch('ding.mp3')
  .then(res => res.arrayBuffer())
  .then(data => audioCtx.decodeAudioData(data))
  .then(buffer => {
    dingBuffer = buffer;
  })
  .catch(err => {
    console.error("Could not load ding sound", err);
  });


function playDing() {
  if (!dingBuffer) return;  

  const src = audioCtx.createBufferSource();
  src.buffer = dingBuffer;
  src.connect(audioCtx.destination);
  src.start(0);
}

  function addTask() {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");


    const span = document.createElement("span");
    span.textContent = text;


    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "doneBtn";


    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.className = "delete";

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
    input.value = "";
  }

  addBtn.addEventListener("click", addTask);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });



  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    

    if (e.target.classList.contains("delete")) {
      li.remove();
      return;
    }


    if (e.target.classList.contains("doneBtn")) {
      li.classList.toggle("done");

      if (li.classList.contains("done")) {
        ding.currentTime = 0;
        ding.play();
      }
    }
  });


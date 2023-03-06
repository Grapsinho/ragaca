document.addEventListener("DOMContentLoaded", () => {
  const cubeDiv = document.querySelector(".cube-div");
  const cube = document.querySelector(".cube");
  const modalTxt = document.querySelector(".modalTxt");
  const start = document.querySelector(".start");
  const ulEl = document.getElementById("ul-el");
  let score = 0;
  const scoreTxt = document.querySelector(".score");
  const timer = document.querySelector(".timer");
  let time = 20;
  let internalCounter = 1000;
  scoreTxt.textContent = `Your score is: ${score}`;
  timer.textContent = `timer: ${time}`;
  let randomSize = [25, 50, 60, 30, 100, 43, 21];
  let myLeads = [];
  let find = [];

  cube.addEventListener("click", () => {
    const maxWidth = cubeDiv.getBoundingClientRect().width - cube.offsetWidth;
    const maxHeight =
      cubeDiv.getBoundingClientRect().height - cube.offsetHeight;

    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    cube.style.left = `${randomX}px`;
    cube.style.top = `${randomY}px`;
    score++;
    scoreTxt.textContent = `Your score is: ${score}`;

    for (let i = 0; i < randomSize.length; i++) {
      const randomWidth = Math.floor(Math.random() * i);
      const randomHeight = Math.floor(Math.random() * i);

      cube.style.width = `${randomSize[randomWidth]}px`;
      cube.style.height = `${randomSize[randomHeight]}px`;
    }

    modalTxt.textContent = `Times Up!
    Your score is: ${score}
  `;
    myLeads.push(score);
  });

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  const modal = document.querySelector(".modal");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
    cube.style.pointerEvents = "none";
    displayScore();
  };

  // When the user clicks anywhere outside of the modal, close it
  //window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  //};

  function startCount() {
    let Interval = setInterval(startTimer, internalCounter);
    cube.style.pointerEvents = "all";

    function startTimer() {
      time--;
      timer.textContent = `timer: ${time}`;

      if (time === 0) {
        time = 20;
        timer.textContent = `timer: ${time}`;
        endGame();
        if (time === 20) {
          clearInterval(Interval);
        }
      }
    }
  }

  start.addEventListener("click", startCount);

  function endGame() {
    find.push(myLeads.slice(-1));
    localStorage.setItem("keyName", JSON.stringify(find));
    modal.style.display = "block";
    score = 0;
    scoreTxt.textContent = `Your score is: ${score}`;
  }

  let usersScore = JSON.parse(localStorage.getItem("keyName"));

  if (usersScore) {
    find = usersScore;
    displayScore();
  }

  function displayScore() {
    let listItems = "";
    for (let i = 0; i < find.length; i++) {
      listItems += `
            <li>
              ${find[i]}
            </li>
        `;

      ulEl.innerHTML = listItems;
      ulEl.lastElementChild.textContent = `Current Score: ${find[i]}`;
    }
  }
});

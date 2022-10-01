document.addEventListener("DOMContentLoaded", () => {
  const character = document.querySelector(".character");
  let bottom = 0;
  left = 0;
  let gravity = 0.9;
  let isJumping = false;
  let isGoingLeft = false;
  let isGoingRight = false;
  let rightTimerId;
  let leftTimerId;

  function jump() {
    if (isJumping) return;
    character.classList.add("character");
    character.classList.remove("character-slide");

    let timerId = setInterval(function () {

      if (bottom > 250) {
        clearInterval(timerId);
        let timerDownId = setInterval(function () {
          if (bottom < 0) {
            clearInterval(timerDownId);
            isJumping = false;
          }
          bottom -= 5;
          character.style.bottom = `${bottom}px`;
        }, 20)
      }
      isJumping = true;
      bottom += 30;
      bottom *= gravity;
      character.style.bottom = `${bottom}px`;
    }, 20);
  }

  function slideLeft() {
    character.classList.add("character-slide");
    character.classList.remove("character");
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      left -= 5;
      character.style.left = `${left}px`;
    }, 20)

  }

  function slideRight() {
    character.classList.add("character-slide");
    character.classList.remove("character");
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      left += 5;
      character.style.left = `${left}px`;
    }, 20)

  }

  function control(e) {
    if (e.keyCode === 38) {
      jump();
    }
    else if (e.keyCode === 37) {
      slideLeft();
    }
    else if (e.keyCode === 39) {
      slideRight();
    }
  }

  document.addEventListener("keydown", control);

})
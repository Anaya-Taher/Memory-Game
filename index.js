let // Variables Declaration
    boxes = document.querySelectorAll(".box"),
    parent = document.querySelector(".parent"),
    success = document.getElementById("success"),
    fail = document.getElementById("fail"),
    complete = document.getElementById("complete"),
    nameSpan = document.querySelector(".player-name span"),
    wrongTries = document.querySelector(".tries-counter span"),
    playingTime = document.querySelector(".playing-time span"),
    arr = [], counter = 0, completeCounter = 0, hours = 0, minutes = 0, seconds = 0, tries = 0, timer = 0;


for (let i = 0; i < 20; i++)
    arr.push(i);

shuffle(arr);

for (let i = 0; i < arr.length; i++)
    boxes[i].style.order = arr[i];

for (let i = 0; i < boxes.length; i++) {
    boxes[i].onclick = () => {
        boxes[i].classList.add("click");
        checkAndMatch();
    }
}

onload = () => {

    setTimeout(() => {

        if (location.href.indexOf("index") !== -1) {
            location.href = location.href.slice(0, location.href.indexOf("index"));
        } else {
            nameSpan.innerHTML = prompt("Enter Your Name") || "No Name";
            document.querySelector(".help1").classList.remove("blur");
            document.querySelector(".help2").classList.remove("blur");
            timer = setInterval(() => {
                if (++seconds === 60) {
                    seconds = 0;
                    if (++minutes === 60) {
                        minutes = 0;
                        if (++hours === 24) hours = 0;
                    }
                }

                let hoursSpan = hours < 10 ? "0" + hours : hours;
                let minutesSpan = minutes < 10 ? "0" + minutes : minutes;
                let secondsSpan = seconds < 10 ? "0" + seconds : seconds;
                playingTime.innerHTML = hoursSpan + ":" + minutesSpan + ":" + secondsSpan;

            }, 1000)
        }
    }, 0)
}

// Functions

function shuffle(arr) {

    let newIndex, temp, size = arr.length;

    while (size) {

        newIndex = Math.floor(Math.random() * size--);
        temp = arr[newIndex];
        arr[newIndex] = arr[size];
        arr[size] = temp;
    }

}

function checkAndMatch() {
    counter = document.querySelectorAll(".click").length;
    if (counter === 2) {

        parent.classList.add("prevent-clicked");

        setTimeout(() => {
            parent.classList.remove("prevent-clicked");
        }, 1000)

        let firstElement = document.querySelectorAll(".click")[0],
            secondElement = document.querySelectorAll(".click")[1];

        if (firstElement.dataset.number === secondElement.dataset.number) {
            success.play();
            firstElement.classList.add("true");
            secondElement.classList.add("true");
            firstElement.classList.remove("click");
            secondElement.classList.remove("click");
        } else {
            wrongTries.innerHTML = ++tries < 10 ? "0" + tries : tries;
            fail.play();
            setTimeout(() => {
                firstElement.classList.remove("click");
                secondElement.classList.remove("click");
            }, 700)
        }
        completeCounter = 0;
        for (let i = 0; i < boxes.length; i++)
            if (boxes[i].classList.contains("true")) completeCounter++;
        if (completeCounter === 20) {
            complete.play();
            clearInterval(timer);
            setTimeout(() => {
                if (confirm(`Your Time Is: ${playingTime.innerHTML}\nDo You Want To Play Again?`))
                    location.reload();
            }, 4000)

        }
    }
}
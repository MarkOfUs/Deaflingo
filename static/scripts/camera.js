const videoElement = document.getElementById("videoElement");
const canvasElement = document.getElementById("canvasElement");
const photoElement = document.getElementById("photoElement");
const wordElement = document.querySelector(".word");
let currentLetterIndex = 0;
let holdTimer = null;
let typingStartTime = null;
let typingEndTime = null;
const holdDuration = 150;
let typedLetters = 0;
let requestInFlight = false;
const loopDelayMs = 5;
const requestJpegQuality = 0.75;
const maxFrameWidth = 640;

var on_front = true;
function flipCard(card) {
  if (on_front) {
    on_front = false;
  } else {
    on_front = true;
  }
  card.classList.toggle("flipped");
}

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
    updateStream();
  } catch (error) {
    console.error("Error accessing webcam:", error);
  }
}

function updateStream() {
  if (requestInFlight) {
    setTimeout(updateStream, loopDelayMs);
    return;
  }
  if (!videoElement.videoWidth || !videoElement.videoHeight) {
    setTimeout(updateStream, loopDelayMs);
    return;
  }

  const scale = Math.min(1, maxFrameWidth / videoElement.videoWidth);
  canvasElement.width = Math.floor(videoElement.videoWidth * scale);
  canvasElement.height = Math.floor(videoElement.videoHeight * scale);
  canvasElement.getContext("2d").drawImage(videoElement, 0, 0);
  const photoDataUrl = canvasElement.toDataURL(
    "image/jpeg",
    requestJpegQuality,
  );
  const base64String = photoDataUrl.split(",")[1];

  requestInFlight = true;
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photo: base64String }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.processed_image) {
        photoElement.src = `data:image/jpeg;base64,${data.processed_image}`;
        photoElement.style.display = "block";
      }
      const predictedCharacterElement =
        document.getElementById("predictedCharacter");
      const helpImage = document.querySelector(".flip-card-back img");
      const predictedCharacter = data.predicted_character.toLowerCase();

      predictedCharacterElement.textContent = predictedCharacter;

      const wordSpans = document.querySelectorAll(".word span");

      if (currentLetterIndex < wordSpans.length) {
        const currentLetterSpan = wordSpans[currentLetterIndex];

        if (
          predictedCharacter === currentLetterSpan.textContent.toLowerCase()
        ) {
          if (holdTimer === null) {
            holdTimer = setTimeout(() => {
              currentLetterSpan.style.color = "green";
              currentLetterSpan.style.textDecoration = "underline";
              if (currentLetterIndex < wordSpans.length) {
                currentLetterIndex++;
              }

              if (!on_front) {
                document
                  .getElementById("flip-card")
                  .classList.toggle("flipped");
                on_front = true;
              }
              if (wordSpans[currentLetterIndex] != undefined) {
                helpImage.src = `${window.ASL_IMAGE_BASE}/${wordSpans[currentLetterIndex].textContent}.png`;
              }
              typedLetters++;
              holdTimer = null;
              if (typingStartTime === null) {
                typingStartTime = Date.now();
              }
              typingEndTime = Date.now();
              if (currentLetterIndex === wordSpans.length) {
                wordElement.textContent = "";
                if (typedLetters > 0 && typingStartTime !== null) {
                  const elapsedTime = typingEndTime - typingStartTime;
                  const typingSpeed =
                    typedLetters / (elapsedTime / (1000 * 60));

                  const typingSpeedElement = document.createElement("span");
                  typingSpeedElement.textContent =
                    Math.round(typingSpeed) + " letters per minute";
                  typingSpeedElement.classList.add("half-size");
                  wordElement.appendChild(typingSpeedElement);

                  confetti();

                  setTimeout(() => {
                    location.reload();
                  }, 3000);
                }
              }
            }, holdDuration);
          }
        } else {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
      }
    })
    .catch((error) => {
      console.error("Error posting frame:", error);
    })
    .finally(() => {
      requestInFlight = false;
      setTimeout(updateStream, loopDelayMs);
    });
}

startWebcam();

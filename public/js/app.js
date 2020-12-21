const fetchingData = function (location) {
  console.log(
    "if we run locally add http://localhost:3000/weather?address=${location}"
  );
  console.log(
    "if we are using in heroku it dosent know localhost so delete it for heroku deployment"
  );
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        console.log(data);
        messageOne.textContent = `Hello ${location} !!`;
        imgsrc.src = data.forecaste.img;
        messageTwo.textContent = ` ${data.forecaste.desc} Day. It is currently ${data.forecaste.temp} degree out. There is ${data.forecaste.precip}% of cloudcover`;
      }
    });
  });
};

const btn = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
const imgsrc = document.querySelector("img");
btn.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchingData(search.value);
  search.value = "";
});

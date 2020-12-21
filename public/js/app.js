console.log("client side javascript file is loaded");

const fetchingData = function (location) {
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
        } else {
          console.log(data);
          messageOne.textContent = `Hello ${location} !!`;
          messageTwo.textContent = `${data.forecaste.desc} throught the day. It is ${data.forecaste.temp} degree out. There is ${data.forecaste.precip}% of chance of rain`;
        }
      });
    }
  );
};

const btn = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
btn.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchingData(search.value);
  search.value = "";
});

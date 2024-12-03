document.addEventListener("DOMContentLoaded", () => {
  let hour = document.querySelector(".hour");
  let minut = document.querySelector(".minute");

  let darkMode = document.querySelector(".darkMode");
  let darkItem = document.querySelector(".dark-item");
  let container = document.querySelector(".container");
  let body = document.querySelector("body");
  let card1 = document.querySelectorAll(".card1");
  let input1 = document.querySelector(".input");

  darkMode.addEventListener("click", () => {
    darkMode.classList.toggle("dark-mode-active");
    darkItem.classList.toggle("dark-item-active");
    body.classList.toggle("body-color");
    container.classList.toggle("container-color");
    card1.forEach((item) => {
      item.classList.toggle("card1-color");
    });
    input1.classList.toggle("input-color");
  });

  setInterval(() => {
    let newDay = new Date();
    hour.innerHTML = newDay.getHours().toString().padStart(2, "0");
    minut.innerHTML = newDay.getMinutes().toString().padStart(2, "0");
  }, 1000);

  let day = document.querySelector(".day");
  let month = document.querySelector(".month");
  let kun = document.querySelector(".kun");

  const weekDays = [
    "Yakshanba,",
    "Dushanba,",
    "Seshanba,",
    "Chorshanba,",
    "Payshanba,",
    "Juma,",
    "Shanba,",
  ];
  day.innerHTML = weekDays[new Date().getDay()];

  kun.innerHTML = new Date().getDate().toString().padStart(2, "0");

  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ];
  month.innerHTML = months[new Date().getMonth()];

  // ? >>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  let graduse = document.querySelector(".graduse");
  let feels_like = document.querySelector(".feels_like");
  let sunrise = document.querySelector(".Sunrise");
  let sunset = document.querySelector(".Sunset");
  let img_condition = document.querySelector(".img_condition");
  let text_Sunny = document.querySelector(".text_Sunny");
  let humidity = document.querySelector(".humidity");
  let pressure = document.querySelector(".pressure");
  let wind_Speed = document.querySelector(".wind_Speed");
  let uv = document.querySelector(".uv");
  let forma = document.querySelector("form");

  let apiKey = "aaab2c18ffcc42b4ad960108240212";
  let baseUrl = `http://api.weatherapi.com/v1`;

  async function obHavo(endpoint, q) {
    let response = await fetch(`${baseUrl}/${endpoint}?key=${apiKey}&q=${q}`);
    let datas = await response.json();
    console.log(datas);

    graduse.textContent = datas.current.temp_c + " " + "°C";
    feels_like.textContent = datas.current.feelslike_c + "" + "°C";
    sunrise.textContent = datas.forecast.forecastday[0].astro.sunrise;
    sunset.textContent = datas.forecast.forecastday[0].astro.sunset;
    img_condition.src = `https:${datas.current.condition.icon}`;
    text_Sunny.textContent = datas.current.condition.text;
    humidity.textContent = datas.current.humidity + "" + "%";
    pressure.textContent = datas.current.pressure_mb + "" + "hPa";
    wind_Speed.textContent = datas.current.wind_kph + " " + "km/h";
    uv.textContent = datas.current.uv;
  }

  forma.addEventListener("submit", (e) => {
    e.preventDefault();
    let city = e.target[0].value;
    obHavo("forecast.json", city);
    forma.reset();
  });

  obHavo("forecast.json", "london");

  let joylashuv = document.querySelector(".joylashuv");

  joylashuv.addEventListener("click", () => {
    const longLat = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        const data = await response.json();

        graduse.textContent = data.current.temp_c + " °C";
        feels_like.textContent = data.current.feelslike_c + " °C";
        img_condition.src = `https:${data.current.condition.icon}`;
        text_Sunny.textContent = data.current.condition.text;
        humidity.textContent = data.current.humidity + " %";
        pressure.textContent = data.current.pressure_mb + " hPa";
        wind_Speed.textContent = data.current.wind_kph + " km/h";
        uv.textContent = data.current.uv;
      } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
      }
    };

    const latitude = 41.2995;
    const longitude = 69.2401;

    longLat(latitude, longitude);
  });

  const longLat = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
      );
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const data = await response.json();

      graduse.textContent = data.current.temp_c + " °C";
      feels_like.textContent = data.current.feelslike_c + " °C";
      img_condition.src = `https:${data.current.condition.icon}`;
      text_Sunny.textContent = data.current.condition.text;
      humidity.textContent = data.current.humidity + " %";
      pressure.textContent = data.current.pressure_mb + " hPa";
      wind_Speed.textContent = data.current.wind_kph + " km/h";
      uv.textContent = data.current.uv;
    } catch (error) {
      console.error(`Error fetching weather data: ${error.message}`);
    }
  };

  const latitude = 41.2995;
  const longitude = 69.2401;

  longLat(latitude, longitude);

  obHavo("forecast.json", "london");

  async function obHavo1(endpoint, q, days) {
    let response = await fetch(
      `${baseUrl}/${endpoint}?key=${apiKey}&q=${q}&days=${days}`
    );
    let datas = await response.json();

    let kunlik_ob_havo = document.querySelector(".kunlik_ob_havo");
    kunlik_ob_havo.innerHTML = "";
    kunlik_ob_havo.className =
      "border px-[37px] py-[31px] text-center rounded-[30px] shadow-black shadow-2xl hover:scale-105 transition-all card1 kunlik_ob_havo";

    datas.forecast.forecastday.forEach((dayData) => {
      let date = new Date(dayData.date);

      const weekDays = [
        "Yakshanba",
        "Dushanba",
        "Seshanba",
        "Chorshanba",
        "Payshanba",
        "Juma",
        "Shanba",
      ];
      const months = [
        "yanvar",
        "fevral",
        "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avgust",
        "sentabr",
        "oktabr",
        "noyabr",
        "dekabr",
      ];
      let weekDay = weekDays[date.getDay()];
      let month = months[date.getMonth()];
      let fullDate = `${weekDay}, ${date.getDate()}-${month}`;

      let card = document.createElement("div");
      card.className = "flex items-center gap-8 card";
      card.innerHTML = `
        <img src="https:${dayData.day.condition.icon}" alt="${dayData.day.condition.text}" />
        <div>
          <h4 class="text-[24px] font-bold">${dayData.day.maxtemp_c}°C /</h4>
          <p class="text-[18px]">${fullDate}</p>
        </div>
      `;

      kunlik_ob_havo.appendChild(card);
    });
  }

  obHavo1("forecast.json", "london", 5);

  async function soatlikObHavo(endpoint, q) {
    let response = await fetch(`${baseUrl}/${endpoint}?key=${apiKey}&q=${q}`);
    let datas = await response.json();

    let hourlyForecast = document.querySelector(".hourly_forecast");
    hourlyForecast.innerHTML = "";

    datas.forecast.forecastday[0].hour.forEach((hour, index) => {
      if (index % 4 === 0) {
        let time = hour.time.split(" ")[1];
        let temp = hour.temp_c;
        let icon = hour.condition.icon;
        let windSpeed = hour.wind_kph;

        let card = document.createElement("div");
        card.className = "soat",
        card.classList.add("p-3", "gap-5", "bg-gradient-to-b", "from-[#F88508]", "to-[#F6FAD900]", "rounded-[40px]");
        card.style.background = `linear-gradient(to bottom, ${
          time >= "18:00" || time <= "06:00" ? "#4b4b7a" : "#f3a261"
        }, #ffffff)`;

        card.innerHTML = `
          <h3 class="text-[20px] font-bold mb-[10px]">${time}</h3>
          <img src="https:${icon}" alt="Icon" class="mx-auto mb-[10px]" />
          <h4 class="text-[18px] font-semibold">${temp}°C</h4>
          <p class="text-[16px]">🌬 ${windSpeed} km/h</p>
        `;

        hourlyForecast.appendChild(card);
      }
    });
  }

  soatlikObHavo("forecast.json", "london");
});

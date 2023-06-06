function openButton() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDFkOGRjMDdmYTNkZjZhYmNkZTYzNGZhYTVlYTg2NyIsInN1YiI6IjY0NzA5NGM4MTNhMzIwMDBiZjUyMDVkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4JyVxsc1cjWYkhJGZmhI-mJsL2NsmcIxnsObZbQT9w",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let rows = response["results"];
      console.log(response);
      rows.forEach((a) => {
        let title = a["title"];
        let overview = a["overview"];
        let image = "https://image.tmdb.org/t/p/w300" + a["poster_path"];
        let vote_average = a["vote_average"];
        let id = a["id"];

        let temp_html = `
                <div class="box">
                <div class="titles"> ${title}</div>
                <div> <img src="${image}" class="image"></div>
                <div id="desc">Description</div>
                <div>${overview}</div>
                <div class="vote">Average rate: ${vote_average}</div>
                <button onclick = "detail(${id})">상세페이지</button>
                </div>`;
        document
          .getElementById("cards")
          .insertAdjacentHTML("beforeend", temp_html);
      });
      console.log(rows);
    });
}

function detail(id) {
  localStorage.setItem("keyId", id);
  location.href = "./detail.html";
}


//해석

// Json 방식으로 api 가져옴. .then(response => response.json(console.log))해서 개발자도구에서 확인
// TMDB 사이트 API 밑에 Fetch 코드 있음. const options는 영화api가져온거고,이 전체를 최상단 openButton함수처리.
// 이는 index.html에서 onload="openButton()" 함수처리

// data['results'][0]['title'] 배열의 값이라 forEach문 전에 가져올 값을 이런 형태로 대괄호로 가져옴.
// data['results'][1]['title'] 여기서 title, overview, image, id, 이런 key값들은 다 fetch코드에 있다.
// data['results'][2]['title']
// 영화포스터 가져오는 법은 https://developer.themoviedb.org/docs/image-basics 참고.
// image url 은 base url + file size + file path 로 구성됨. 사이즈는 임의지정 가능.

// temp_html에서 button onclick의 id는 해당 영화의 id값을 가져오기 위함.
// 카드를 순서대로 붙이는 방법 : Jquery의 append 기능.  Json은 객체안에 key-value 헷갈리면 안됨
// .getElementById의 "cards"는 index.html에 있는 아이디값.
//  beforeend(끝나기전) 에 temp_html (백틱으로 묶은 카드1개 값)을 이어 붙이는것(JQuery의 append기능)

// function detail(id) 함수는 detail.js와 연결시킴. (localStorage의 setItem하고 detail.js에서 getItem으로 연결)
// localStorage.setItem('','id'); key값은 마음대로 임의지정(keyId), value값은 영화 id를 가져와야 하므로 id입력.
// temp_html 백틱안에 button onclick 안에 함수값 detail을 실행시키기 위함. 클릭시 detail.html 화면 실행

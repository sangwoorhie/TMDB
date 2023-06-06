function detailButton() {
  let movieId = localStorage.getItem("keyId");
  console.log(movieId);

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
                </div>`;
        if (movieId == id) {
          document
            .getElementById("detailPage")
            .insertAdjacentHTML("beforeend", temp_html);
        }
      });
      console.log(rows);
    });
}

//해석

// index.js문과 전체 동일.
// detail.html에서 onload="detailButton()"로 전체 함수처리
// .getElementById의 "detailPage"는 index.html에 있는 아이디값.
// 다만, 마지막에 조건문을 써서 (movieId == id) 즉, movieId값이 id값과 일치해야만 해당 영화값의 temp_html이 작동하도록 함.

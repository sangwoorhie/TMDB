function search() {
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
      document.getElementById("cards").innerHTML = "";
      let rows = response["results"];
      let search_title = document.getElementById("search").value; //.value를 써서 input창 값을 갖고옴. 안쓰면 key갑(태그)를 갖고옴
      let lowersearch_title = search_title.toLowerCase();
      let titlearray = [];
      for (i = 0; i < rows.length; i++) {
        let title = rows[i]["title"].toLowerCase();  // rows라는 배열에서 [i]번째 배열. 0,1,2 fetch값에서 index순서대로 title요소 가져옴.
        titlearray.push(title);                // toLowerCase쓰는 이유는 lowersearch_title와 title 둘다 소문자로 만들어 filter함수로 비교하기 위함
      }

      let filteredTitles = titlearray.filter(function (item) {
        return item.includes(lowersearch_title);
      });
      if (filteredTitles.length == 0) {
        alert("찾으시는 영화가 없습니다.");
      }
      if (!search_title) {
        alert("검색어가 없습니다.");
      }

      rows.forEach((a) => {
        let title = a["title"];
        let lowertitle = title.toLowerCase(); // 밑에 if문에서 소문자열인 lowertitle과 lowersearch_title를 비교하기 위해 tolowercase씀
        let overview = a["overview"];
        let image = "https://image.tmdb.org/t/p/w300" + a["poster_path"];
        let vote_average = a["vote_average"];
        let temp_html = `
                <div class="box">
                <div class="titles"> ${title}</div>
                <div> <img src="${image}" class="image"></div> 
                <div id="desc">Description</div>
                <div>${overview}</div>
                <div class="vote">Average rate: ${vote_average}</div>
                </div>`;
        if (lowertitle.includes(lowersearch_title)) {
          document
            .getElementById("cards")
            .insertAdjacentHTML("beforeend", temp_html);
        }
      });
    });
}
// 해석
// 전체함수는 index.html의 onclick에서 search()를 했을때 함수 작동.
// 17번째 줄부터.
// documet.getElementById("cards").innerHTML = "";  => empty()같은 문. 검색어입력시 기존값 사라지게 = "" 으로 함


// forEach문은 나중에돌림
// index.html의 검색창 id="search"의 입력값(value)을 가져와 searchTitle로 지정함.
// let lowerSearchTitle는 searchTitle을 소문자로 변하게 함 .toLowerCase(); 대문자&소문자 구분없애기위해 다 소문자로 변경.
// let titleArray = []; => for문 돌아가기 전 배열 index을 빈값으로
// for문 => i는 0번째 인덱스부터 rows의 길이 미만만큼 돌고, 1씩 증가해서 돈다.
// let title = rows[i]["title"].toLowerCase(); 메인 타이틀을 대문자&소문자 구분없애기위해 다 소문자로 변경.
// push를 하는 이유는 빈 배열 let titlearray = [];에 title값을 차례대로 넣어주기 위함. titlearray에는 소문자만 들어감


// filteredTitle : filter함수, return값에 filter조건을 씀.
// .includes는 (괄호안에 포함된 값을 다 출력한다. God Fathers에서 g만 쳐도 출력됨.
// if문으로 영화가 없는경우, 검색어가 없는 경우 두개 alert창 띄움.

// forEach문에서 let lowerTitle = title.toLowerCase(); => forEach문 내부에서 선언된 title을 소문자로 변경
// 이는 if문에 쓰기 위함인데, lowerSearchTitle를 포함한 경우. 즉 상단의 filter함수에서 lowerSearchTitle를 포함해야 
// 값을 리턴했듯이 if문도 마찬가지로 lowerSearchTitle를 포함해야 temp_html이 작동하도록 함.
// 
// 
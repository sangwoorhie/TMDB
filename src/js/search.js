function search() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDFkOGRjMDdmYTNkZjZhYmNkZTYzNGZhYTVlYTg2NyIsInN1YiI6IjY0NzA5NGM4MTNhMzIwMDBiZjUyMDVkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4JyVxsc1cjWYkhJGZmhI-mJsL2NsmcIxnsObZbQT9w'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            document.getElementById("cards").innerHTML = ""
            let rows = response['results']
            let search_title = document.getElementById('search').value; //검색창에서 가져온 영화제목

            for (i = 0; i < rows.length; i++) {
                let titlearray = [];
                let title = rows[i]['title']
                titlearray.push(title)  //push를 하는 이유는 빈 배열 let titlearray = [];에 title값을 넣어주기 위함   
                
                let filteredTitles = titlearray.filter(function (item) {
                    return item === search_title
                })
    
    
                if (filteredTitles.length === 0) {
                    alert('찾으시는 영화가 없습니다!')
                    break
                } 
            }

            rows.forEach((a) => {
                let title = a['title']
                let lowertitle = title.toLowerCase();
                let lowersearch_title = search_title.toLowerCase();
                let overview = a['overview']
                let image = "https://image.tmdb.org/t/p/w300" + a['poster_path']
                let vote_average = a['vote_average']
                let temp_html = `
                <div class="box">
                <div> ${title}</div>
                <div> <img src="${image}" class="image"></div>
                <div> ${overview}</div>
                <div> ${vote_average}</div>
                </div>`
                if (lowertitle == lowersearch_title) {
                    document.getElementById("cards").insertAdjacentHTML('beforeend', temp_html)  // 카드를 순서대로 붙이는 방법// Jquery의 append 기능 // Json : 객체안에 key-value
                }

            })

        })

}

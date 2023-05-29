
	function openButton(){
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
            let rows = response['results']
            rows.forEach((a) => {
                let title = a['title']
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
    
                document.getElementById("cards").insertAdjacentHTML('beforeend', temp_html);
           console.log(rows)
            })
        })

    }

let API_KEY1 = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'

let API_KEY2 = 'b971c2f0de8767f08d2bb84160ba24b7'

const btns = document.querySelectorAll('.btns')
const append = document.querySelector('.append')
const search = document.querySelector('#search')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const score = document.querySelector('#score')
const btn = document.querySelector('.btn')

const upcomingApi = 'https://api.themoviedb.org/3/movie/upcoming?api_key=dcea1fd7b3e65d34387ad6de7ef9cc5e&page=1'

const topRatedApi = 'https://api.themoviedb.org/3/movie/top_rated?api_key=dcea1fd7b3e65d34387ad6de7ef9cc5e&page=1'

const topKinolarApi = 'https://api.themoviedb.org/3/movie/popular?api_key=dcea1fd7b3e65d34387ad6de7ef9cc5e&page=1'

async function movies (api) {
    let response = await fetch(api)
    let data = await response.json()
    return data.results
}

function render(array) {
    append.innerHTML = null
    for(let item of array){
        let movie = document.createElement('div')
        let img = document.createElement('img')
        let info = document.createElement('div')
        let h3 = document.createElement('h3')
        let rate = document.createElement('span')
        let date = document.createElement('span')

        movie.className = 'movie'
        info.className = 'movie-info'
        rate.className = 'orange'
        date.className = 'date'
        
        img.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + item.poster_path)
        h3.textContent = item.title
        rate.textContent = item.vote_average
        date.textContent = item.release_date

        info.append(h3, rate)
        movie.append(img, info, date)
        append.append(movie)
    }
}

btns[0].onclick = async () => {
    let arr = await movies(topKinolarApi)
    render(arr)
    btn.onclick = () => {
        console.log(arr);
        let filtered1 = arr.filter( el => (el.title.includes(search.value) || search.value == null))
        let filtered2 = filtered1.filter( el => (+el.release_date.split('-')[0] >= (+min.value || 0)))
        let filtered3 = filtered2.filter( el => (+el.release_date.split('-')[0] <= (+max.value) || 2021))
        let filtered4 = filtered3.filter( el => (el.vote_average >= +score.value) && el)
    
        render(filtered4)
    }

}
btns[1].onclick = async () => {
    let arr = await movies(topRatedApi)
    render(arr)
    btn.onclick = () => {
        console.log(arr);
        let filtered1 = arr.filter( el => (el.title.includes(search.value) || search.value == null))
        let filtered2 = filtered1.filter( el => (+el.release_date.split('-')[0] >= (+min.value || 0)))
        let filtered3 = filtered2.filter( el => (+el.release_date.split('-')[0] <= (+max.value) || 2021))
        let filtered4 = filtered3.filter( el => (el.vote_average >= +score.value) && el)
    
        render(filtered4)
    }
}

btns[2].onclick = async () => {
    let arr = await movies(upcomingApi)
    render(arr)
    btn.onclick = () => {
        console.log(arr);
        let filtered1 = arr.filter( el => (el.title.includes(search.value) || search.value == null))
        let filtered2 = filtered1.filter( el => (+el.release_date.split('-')[0] >= (+min.value || 0)))
        let filtered3 = filtered2.filter( el => (+el.release_date.split('-')[0] <= (+max.value) || 2021))
        let filtered4 = filtered3.filter( el => (el.vote_average >= +score.value) && el)
    
        render(filtered4)
    }

}



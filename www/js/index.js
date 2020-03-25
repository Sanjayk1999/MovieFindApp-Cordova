document.addEventListener('init',function(){

    const btn = document.getElementById('btn');
    btn.addEventListener('click',function(){
        var searchText = document.getElementById('searchText').value;
        searchUrl = searchText.replace(" ","+");
        var url = "http://www.omdbapi.com/?s="+searchUrl+"&apikey=547d4897";
        $.get(url,function(data){
            if(data.Response=='True'){
                let movies = data.Search;
                printMovies(movies);
            }
            else{
                ons.notification.alert("Not found");
            }
        })
    })



})

function printMovies(movies){
    var listItem;
    const list = document.getElementById('movies');
    for(var i=0;i<movies.length;i++){
        listItem += `
            <a href="#" onclick="moviedetail('${movies[i].imdbID}')">
                <ons-list-item>
                    <div class="left">
                        <img class="list-item__thumbnail" src="${movies[i].Poster}">
                    </div>
                    <span>${movies[i].Title}</span>
                </ons-list-item>
            </a>
        `;

    }
    list.innerHTML=listItem;
}

function moviedetail(id){
    var myNavigator = document.getElementById('Navigator');
    myNavigator.pushPage('page2');
    var nexturl = "http://www.omdbapi.com/?i="+id+"&apikey=547d4897";
    $.get(nexturl,function(data){
        displayMovie(data);
    })
}

function displayMovie(data){
    let cardPage = document.getElementById('cardpage');
    var card = `
        <ons-card>
            <img src="${data.Poster}" style="transform:scale(.8);">
        </ons-card>
        <ons-list>
        <ons-list-header><strong>${data.Title}</strong></ons-list-header>
            <ons-list-item>Year:-<strong>${data.Year}</strong></ons-list-item>
            <ons-list-item>IMDB Rating:-<strong>${data.imdbRating}</strong></ons-list-item>
            <ons-list-item>Genre:-<strong>${data.Genre}</strong></ons-list-item>
            <ons-list-item>${data.Plot}</ons-list-item>
        </ons-list>
    `
    cardpage.innerHTML = card;
    console.log(data);
}

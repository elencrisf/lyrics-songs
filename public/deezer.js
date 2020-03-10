

//GET /search/artist/?q=eminem&index=0&limit=2&output=xml

function findSongs() {
    // alert("tes nnnnnnnt");
    let artist = $("#artist").val();
    let title = $("#song").val(); 
    
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${artist}/${title}`, requestOptions)
    .then(response => response.json().then(result => {
        result.data.forEach(element => {
            let artistDeezer = element.artist.name;
            let titleDeezer = element.title;
            let previewDeezer = element.preview;

            
            let div = document.getElementById("allSongs");
            div.innerHTML += '<p>' + artistDeezer + ', ' + titleDeezer +'</p>';
            div.innerHTML += '<audio src="' + previewDeezer + '" preload="auto" controls>';
            div.innerHTML += '</audio>';

            console.log(element.title);
            console.log(element.preview);
        })
    }))

    .catch(error => console.log('error', error));
}




function findLyrics(artist, song) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    // https://api.lyrics.ovh/v1/artist/title
}
// findLyrics(u2, one);



const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', el => {
    el.preventDefault();
    document.getElementById("allSongs").innerHTML = "";
    doSubmit();
    setTimeout(findSongs(), 2000);

})

async function doSubmit() {

    const lyrics_el = document.querySelector('#lyrics');
    const artist = document.querySelector('#artist');
    const song = document.querySelector('#song');

  
    lyrics_el.innerHTML = '<div class="spinner-grow text-light" role="status"><span class="sr-only">Loading...</span></div>';


    //then
    // findLyrics(artist.value, song.value)
    //     .then(response => response.json())
    //     .then(data => { 
    //         if(data.lyrics) {
    //             lyrics_el.innerHTML = data.lyrics;
    //         } else {
    //             lyrics_el.innerHTML = data.error;
    //         }
    //     })
    //     .catch (err => {
    //         lyrics_el.innerHTML = `Oops! ${err}`;
    //     })

    // async await
    try {
        const lyricsResponse = await findLyrics(artist.value, song.value);
        const data = await lyricsResponse.json();

        lyrics_el.innerHTML = data.lyrics;
        if (data.lyrics)
            lyrics_el.innerHTML = data.lyrics;
        else
            lyrics_el.innerHTML = data.error;
    } catch (err) {
        lyrics_el.innerHTML = `<p>Fill Artist and Song for Lyrics!</p>`;
        console.log(err);
    }

}


// function cleanContainer() {
//     let container = document.getElementById("containerSongs");
//     container.innerHTML = '';
// }

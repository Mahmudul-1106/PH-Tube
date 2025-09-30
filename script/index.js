console.log('Js file added')
function activeClassRemove(){
    const classRemove = document.getElementsByClassName('active');
    for(let remove of classRemove){
        remove.classList.remove('active');
    }
}
function activeRemove(){
    const classRemove = document.getElementsByClassName('active');
    for(let remove of classRemove){
        remove.classList.remove('active');
    }
    document.getElementById('btn-all').classList.add('active');
}

function loadCatagories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayData(data.categories))
}

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(response => response.json())
        .then(data => {
            activeClassRemove();
            document.getElementById('btn-all').classList.add('active')
            displayVideo(data.videos)})            
}

const loadVideoCategory = (id)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url).then(res => res.json())
    .then(data => {
        activeClassRemove();
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add('active');
        displayVideo(data.category)
    })}



// "category_id": "1001",
// "video_id": "aaaa",
// "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
// "title": "Shape of You",
// "authors": [
// {
// "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
// "profile_name": "Olivia Mitchell",
// "verified": ""
// }
// ],
// "others": {
// "views": "100K",
// "posted_date": "16278"
// },
// "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."

function displayData(catagories) {
    const catagoryContainer = document.getElementById('catagory-container');
    for (let catagory of catagories) {
        const item = document.createElement('div');
        item.innerHTML = `
            <button id ="btn-${catagory.category_id}" onclick="loadVideoCategory(${catagory.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${catagory.category}</button>
        `
        catagoryContainer.appendChild(item);
    }
}

const displayVideo = videos => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    if(videos.length == 0){
           videoContainer.innerHTML =`
           <div class="py-20 col-span-full text-center flex flex-col justify-center items-center">
                <img src="./assets/Icon.png" alt="">
                <h2 class="text-lg font-bold text-center">Oops!! Sorry, <br>
                    There is no content here</h2>
            </div>
            return;
           ` 
        }

    videos.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card bg-base-100 ">
                <figure class="relative">
                    <img class="w-full h-[150px] object-cover rounded-lg" src='${video.thumbnail}' alt="Video" />
                    <span class="absolute bottom-4 right-4 text-white bg-black rounded-sm px-2 text-sm">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="w-8 rounded-full">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-bold ">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=102561&format=png" alt=""></p>
                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>
                </div>
            </div>
        `
        
        videoContainer.appendChild(videoCard);
    });
}

loadCatagories();



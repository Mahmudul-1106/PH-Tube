console.log('Js file added')
function loadCatagories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res)=>res.json())
    .then((data)=>displayData(data.categories))
}

function displayData(catagories){
    const catagoryContainer = document.getElementById('catagory-container')
    for(let catagory of catagories){
        const item = document.createElement('div');
        item.innerHTML = `
            <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${catagory.category}</button>
        `
        catagoryContainer.appendChild(item);
    }
}
loadCatagories();
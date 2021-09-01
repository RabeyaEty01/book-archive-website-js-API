
/*
const searchBook = () => {
    const url = `http://openlibrary.org/search.json?q=javascript`;

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.docs))
}
searchBook();
*/
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';
    //load Data
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}

const displaySearchResult = docs => {

    const searchResult = document.getElementById('search-result');

    //clear previuos search data
    //searchResult.innerHTML = '';
    searchResult.textContent = '';

    docs.forEach(doc => {

        //console.log(doc);

        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
       <div onclick="loadMealDetail('${doc.cover_i}')" class="card h-100">
       <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${doc.title}</h5>
              <span>${doc.author_name ? doc.author_name : ''} </span>
              <br>
              <span>${doc.publisher ? doc.publisher : ''}</span>
              <br>
              <span>${doc.first_publish_year ? doc.first_publish_year : ''}</span>
            </div>
        </div>`;
        searchResult.appendChild(div);

    });
}


const loadMealDetail = cover_i => {
    //console.log(cover_i);

    const url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.docs[0]))

}

const displayMealDetail = doc => {
    //console.log(doc);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
   <div class="card-body">
   <span>${doc.author_name ? doc.author_name : ''} </span>
   <br>
   <span>${doc.publisher ? doc.publisher : ''}</span>
   <br>
   <span>${doc.first_publish_year ? doc.first_publish_year : ''}</span>
   </div>
   `;
    mealDetails.appendChild(div);
}
document.getElementById('error-messege').style.display = 'none';

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

const toggleBookDetail = displayStyle => {
    document.getElementById('book-details').style.display = displayStyle;
}

const searchBook = () => {
    const searchField = document.getElementById('search-field');

    //display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    toggleBookDetail('none');

    const searchText = searchField.value;
    //clear data
    searchField.value = '';

    document.getElementById('error-messege').style.display = 'none';
    //load Data
    const emptyText = document.getElementById('empty-text');
    emptyText.textContent = '';
    if (searchText === '') {
        const p = document.createElement('p');
        p.innerText = `Please write something to display
       `;
        p.style.fontSize = '30px';
        p.style.color = 'red';
        p.style.textAlign = 'center';
        emptyText.appendChild(p);
        toggleSpinner('none');
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            .catch(error => displayError(error));
    }
}
//display error
const displayError = error => {
    document.getElementById('error-messege').style.display = 'block';
}


const displaySearchResult = docs => {

    const searchResult = document.getElementById('search-result');
    //clear previuos search data
    //searchResult.innerHTML = '';
    searchResult.textContent = '';

    const noResultFound = document.getElementById('empty-text');
    noResultFound.textContent = '';
    if (docs.length === 0) {
        noResultFound.textContent = '';
        const p = document.createElement('p');
        p.innerText = `No result found
       `;
        p.style.fontSize = '30px';
        p.style.color = 'red';
        p.style.textAlign = 'center';
        noResultFound.appendChild(p);
        toggleBookDetail('none');

    }
    else {
        const totalResultFound = document.getElementById('empty-text');
        totalResultFound.textContent = '';
        const p = document.createElement('p');
        p.innerText = `Total result Found ${docs.length}
   `;
        p.style.fontSize = '30px';
        p.style.color = 'blue';
        p.style.textAlign = 'center';
        totalResultFound.appendChild(p);
        searchResult.textContent = '';
    }
    docs.forEach(doc => {
        //console.log(doc);

        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
       <div onclick="loadBookDetail('${doc.title}')" class="card h-75 img-fluid rounded-3">
       <img src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : ''}-M.jpg" alt="">
          <div class="card-body">
              <h1 class="card-title">${doc.title}</h1>
              <h6>By ${doc.author_name ? doc.author_name : ''} </h6>
              <span>Publisher: ${doc.publisher ? doc.publisher : ''}</span>
              <br>
              <span>First Publish in ${doc.first_publish_year ? doc.first_publish_year : ''}</span>
            </div>
        </div>`;
        searchResult.appendChild(div);

    });
    toggleSpinner('none');
    toggleSearchResult('flex');
}



const loadBookDetail = bookTitle => {

    const url = `http://openlibrary.org/search.json?q=${bookTitle}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetail(data.docs[0]))

}

const displayBookDetail = doc => {
    //console.log(doc);
    const bookDetails = document.getElementById('book-details');
    bookDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
   <div class="card img-fluid rounded-3">
   <img src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : ''}-M.jpg" alt="">
   <div class="card-body">
   <h1 class="card-title">${doc.title}</h1>
   <h6>By ${doc.author_name ? doc.author_name : ''} </h6>
   <span>Publisher: ${doc.publisher ? doc.publisher : ''}</span>
   <br>
   <span>First Publish in ${doc.first_publish_year ? doc.first_publish_year : ''}</span>
   <br>
   <button class="btn btn-primary">Read Book</button>
   </div>
   <div>
   `;
    bookDetails.appendChild(div);
    toggleBookDetail('block');
  
}

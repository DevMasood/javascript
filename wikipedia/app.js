const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';


const formDOM = document.querySelector('.form')
const inputDOM = document.querySelector('.form-input')
const resultsDOM = document.querySelector('.results')

console.log(formDOM, inputDOM, resultsDOM)


//form event listener to get search value


formDOM.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = inputDOM.value
    if(!value){
        resultsDOM.innerHTML = `<div>Please enter valid value</div>`
        return
    }
    fetchPages(value)

})
//form event listener to get search value


//fetching data with wiki url and search value
const fetchPages = async (searchValue)=> {
   try {
     const response = await fetch(`${url}${searchValue}`)
    const data     = await response.json()
   
    const results = data.query.search
     console.log(results)
     if(results.length < 1){
        resultsDOM.innerHTML = `<div>no matching please try again
        </div>`
        return
     }
     renderResults(results)
   } catch (error) {
    resultsDOM.innerHTML = `<div>there was an error</div>`
   }

}

//fetching data with wiki url and search value

//render reult array with map function
const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join('');
  resultsDOM.innerHTML = `<div class="articles">
          ${cardsList}
        </div>`;
};


//render reult array with map function
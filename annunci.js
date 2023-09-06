let categoriesWrapper = document.querySelector("#categoriesWrapper");
let cardsWrapper = document.querySelector("#cardsWrapper");
let priceInput = document.querySelector("#priceInput");
let priceNumbers = document.querySelector("#priceNumbers");
let wordInput = document.querySelector("#wordInput");

fetch('./annunci.json').then( (response)=> response.json()).then((data)=> {
    console.log(data);


    // PARTENDO DA data MI SERVE CREARE UN ARRAY DI SOLE CATEGORIE , PERCHE POI PER OGNI CATEGORIA MI ANDRO' A CREARE UN REDIO-BUTTON
    function setCategory(params) {
        
        let categories = data.map((annuncio)=> annuncio.category);

        let uniqueCategories = [ ];

        categories.forEach( (category) => {
            if( !uniqueCategories.includes(category) ){
                uniqueCategories.push(category);
            }
        });
        uniqueCategories.forEach((category)=>{
            let div = document.createElement('div');
            div.classList.add("form-check");
            div.innerHTML = `
            <input class="form-check-input"  type="radio" name="category" id="${category}">
            <label class="form-check-label" for="${category}">
              ${category}
            </label>
            
            `
            categoriesWrapper.appendChild(div);
        })
    }
    setCategory();

    function showCards(array){
        
            array.sort( (a , b)=> b.price - a.price );

            cardsWrapper.innerHTML = '';

            array.forEach( (annuncio) => {
            let div = document.createElement('div');
            div.classList.add("card-custom");
            div.innerHTML= `
                <h2>${annuncio.name}</h2>
                <h3 class="card-title">${annuncio.category}</h3>
                <p class="card-text" > $ ${annuncio.price}</p>
            `
            cardsWrapper.appendChild(div);
        });
    }
    showCards(data);
    
    // cattura dei nostri input
    let radios = document.querySelectorAll('.form-check-input');

    function filterByCategory(array) {
        let checked = Array.from(radios).find( (button)=> button.checked );
        let categoria = checked.id;

        if(categoria != 'all'){
            let filtered = array.filter((annuncio)=> annuncio.category == categoria );
            setPriceInput(filtered); 
            return filtered;

        }else{
            setPriceInput(data);
            return array;
        }
    }
    
    radios.forEach((button) => {
        button.addEventListener('click', ()=>{
            globalFilter();
        })
    })

    function setPriceInput(array) {
        let maxPrice = array[0].price;
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceNumbers.innerHTML = maxPrice;
    }
    setPriceInput(data);

    priceInput.addEventListener('input', ()=>{
        priceNumbers.innerHTML = priceInput.value;
        globalFilter();
    })

    function filterByPrice(array) {
        let filtered = array.filter((annuncio)=> +annuncio.price <= +priceInput.value )
        return filtered;
    }


    wordInput.addEventListener('input', ()=>{
       globalFilter();
    })

    function filterByWord(array) {
        let filtered = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()))
        return filtered;
    }

    // 1 -CATEGORIA -> data;
    // 2 - PREZZO -> ARRAY FILTRATO PER CATEGORYA
    // 3 - PAROLA -> ARRAY FILTRATO PER PREZZO 
    // 4 - showCard - > ARRAY FILTRATO PER PAROLA
    function globalFilter() {
        let filterCategory = filterByCategory(data);
        let filterPrice = filterByPrice(filterCategory);
        let filterWord = filterByWord(filterPrice);
        showCards(filterWord);
    }

    

});







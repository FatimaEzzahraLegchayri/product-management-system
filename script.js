const title = document.getElementById('title')
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount')
const total = document.getElementById('total')
const count = document.getElementById('count')
const category = document.getElementById('category')
const submit = document.getElementById('submit')
const input = document.getElementsByClassName('input')
const toUpdate = document.getElementsByClassName('toUpdate')
const btnDeleteAll = document.getElementById('deleteAll')
let switchBtn = 'create';
let index;


function getTotal(){
    if( price.value != ''){
        let rt = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = rt
        total.style.background = '#ec9141'
        total.style.color = 'white'

    }else{
        total.innerHTML = ''
        total.style.background = 'white'
    }
}

// create product
let arr;
if(localStorage.productKey != null){
    arr = JSON.parse(localStorage.getItem('productKey')) 

}else{
    arr = [];
    
}
// save pdt
function saveItem(){
    localStorage.setItem('productKey',JSON.stringify(arr))
}
function getItem(){
    let storedItems = localStorage.getItem('productKey')
    if(storedItems){
        arr = JSON.parse(storedItems)
        document.getElementById('message').innerHTML = ''
        // localStorage.setItem

    }else{
        document.getElementById('message').innerHTML = 'No product available!'
        // document.getElementById('deleteAll').style.display = 'none'
        
    }
}

submit.addEventListener('click',function(){
    let product = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }
    // if(title.value === '' || price.value === '' || category.value === '' ){
    //     alert('Enter the product informations ')
    // }else{
    if(switchBtn === 'create'){
        if(product.count > 0){
            for(let i=0; i<product.count-1; i++){
            arr.push(product)
            }
        }
        arr.push(product)

    }else{
        arr[index] = product
        switchBtn = 'create';
        submit.innerHTML = 'create'
        count.style.display = 'block'
    }

    saveItem()
    // }
    clearInput() 
    total.innerHTML = ''
    total.style.background = 'white'
    showProduct()
    console.log('stored pdts ',arr)
})

function showProduct(){
    getItem()
    let list = ''
    for (let i = 0; i < arr.length; i++) {
        list += `<tr>
                    <td>${i+1}</td>
                    <td>${arr[i].title}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].taxes}</td>
                    <td>${arr[i].ads}</td>
                    <td>${arr[i].discount}</td>
                    <td>${arr[i].total}</td>
                    <td>${arr[i].category}</td>
                    <td onClick = 'update(${i})' class="update"><i class='bx bx-edit' ></i></td>
                <td onClick='remove(${i})' class="delete"><i class='bx bx-trash'></i></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML = list
    if(arr.length > 0){
        btnDeleteAll.style.display = 'block'
        btnDeleteAll.innerHTML = 
        `<div onClick="deleteAll()">Delete All (${arr.length})</div>`
    }else{
        btnDeleteAll.style.display = 'none'
        // btnDeleteAll.innerHTML = ''

    }
}
showProduct()
// create count pdts 
// clear data
function clearInput(){
    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
        
    }
}
// update 
function update(i){
    title.value = arr[i].title
    price.value = arr[i].price
    taxes.value = arr[i].taxes
    ads.value = arr[i].ads
    discount.value = arr[i].discount
    category.value = arr[i].category
    getTotal( )

    count.style.display = 'none'
    submit.innerHTML = 'update'

    switchBtn = 'update';
    index = i;
    scroll({
        top : 0,
        behavior: 'smooth'
    })
}

function remove(i){
    arr.splice(i,1)
    saveItem()
    showProduct()
    console.log(arr);
    
    
}
// search by ctg / title
function searchData(value) {
    let searchResults = '';
    value = value.toLowerCase();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].title.toLowerCase().includes(value)) {
            searchResults += generateRow(i);
        }
    }
    if (searchResults === '') {
        searchResults = `<tr><td colspan="10">No product found</td></tr>`;
    }

    document.getElementById('tbody').innerHTML = searchResults;
}

function generateRow(i) {
    return `<tr>
                <td>${i + 1}</td>
                <td>${arr[i].title}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].discount}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].category}</td>
                <td onClick="update(${i})" class="update"><i class='bx bx-edit' ></i></td>
                <td onClick='remove(${i})' class="delete"><i class='bx bx-trash'></i></td>
            </tr>`;
}


// delete all
function deleteAll(){
    arr=[]
    localStorage.removeItem('productKey')
    document.getElementById('tbody').innerHTML = ''
    document.getElementById('message').innerHTML = 'All products have been deleted!'
    showProduct()
} 

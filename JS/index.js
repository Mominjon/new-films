const bigmanzil = document.querySelector(`.list-wrapper`)
let modal  = document.querySelector(`.modal`)
let modalImg = document.querySelector(`.modal-img`)
let modalTitle = document.querySelector(`.title-h1`)
let modalP = document.querySelector(`.text-p`)
let modalJanr = document.querySelector(`.text-janr`)
let modalData = document.querySelector(`.text-data`)


function barchasi(){
    
for (let i =0; i < films.length; i++){
    let list_item = document.createElement(`div`)
    let content = document.createElement(`div`)
    let img = document.createElement(`img`)
    let title = document.createElement(`h3`)
    let newbutton = document.createElement(`button`)
    
    img.setAttribute(`src`, `${films[i].poster}`)
    title.textContent = `${films[i].title}`
    title.classList.add(`title`)
    list_item.classList.add(`list-item`)
    let newdata = new Date(films[i].release_date)
    content.classList.add(`content`)
    newbutton.dataset.uuid = films[i].id
    newbutton.classList.add(`newbutton2`)
    newbutton.classList.add(`cybr-btn`)
    newbutton.innerHTML = `BUTTON <span aria-hidden>_</span>
    <span aria-hidden class="cybr-btn__glitch">Buttons_</span>`
    content.appendChild(img)
    content.appendChild(title)
    content.appendChild(newbutton)
    list_item.style.zIndex = `2`   
    list_item.appendChild(content)
    bigmanzil.appendChild(list_item)
    newbutton.addEventListener(`click`, (e) => {
        modal.classList.add(`modal--active`)
        setTimeout(() => {
            myVideo.style.display = `block`
            myVideo.play()
        }, 1000)
        let filmid = e.target.dataset.uuid
        let x = films.find((e) => filmid == e.id)
        modalImg.innerHTML = null
        modalImg.setAttribute(`src`, x.poster)
        modalTitle.textContent = x.title
        modalP.textContent = x.overview
        modalJanr.textContent = x.genres
        modalData.textContent = `0${newdata.getDay()},0${newdata.getMonth() + 1},${newdata.getFullYear()}`
    })
}
}
barchasi()

let select_manzil = document.querySelector(`.select-manzil`)
function renderGeneresSelector(films, element){
    const result = []
    films.forEach((films) =>{
        films.genres.forEach((genres) => {
            if (!result.includes(genres)){
                result.push(genres);
            }
        })
    } )
   
    result.forEach((genres) => {
        const newOption = document.createElement("option")
        newOption.value = genres
        newOption.textContent = genres;
        element.appendChild(newOption)
    })
}
renderGeneresSelector(films, select_manzil)



let closebuton = document.querySelector(`.close-button`)
closebuton.addEventListener(`click`, close)
function close(){
    modal.classList.remove(`modal--active`)
    myVideo.pause()
}

let elForm = document.querySelector(`form`)
elForm.addEventListener(`submit`, barchasi2)
function barchasi2 (e){
    e.preventDefault()
    let x = document.querySelector(`.alfabit`)
    let alefa = x.value
    if(alefa == `a-z`){
        films.sort((a, b) => {
            if(a.title > b.title){
                return 1
            }else if(a.title < b.title){
                return -1
            }else {
                return 0
            }
        })
        bigmanzil.innerHTML = null
        barchasi()
    }
    else if(alefa == `z-a`){
        films.sort((a, b) => {
            if(b.title > a.title){
                return 1
            }else if(b.title < a.title){
                return -1
            }else {
                return 0
            }
        })
        bigmanzil.innerHTML = null
        barchasi()
    }else if (alefa == `o-n`){
        films.sort((a, b) => a.release_date - b.release_date)
        bigmanzil.innerHTML = null
        barchasi()
    }else if (alefa == `n-o`){
        films.sort((b, a) => a.release_date - b.release_date)
        bigmanzil.innerHTML = null
        barchasi()
    }
    
    let list = document.querySelectorAll(`.list-item`)
    let l = document.querySelector(`.qudrat`)
    let select_value = l.value
    console.log(select_value)
    
    for (let i = 0; i < films.length; i++){
        if(select_value == `all`){
            list[i].style.display = `block`
        }
        else if(films[i].genres.includes(`${select_value}`)){
            list[i].style.display = `block`
        }else {
            list[i].style.display = `none`
        }
    }

    let input = document.querySelector(`.input`);
    
    input.oninput = function() {
       
        let value = this.value.trim();
        
        let list2 = document.querySelectorAll(`.list-item`);
       
        if (value !== ``) {
           
            list2.forEach(elem => {
                if (elem.innerText.search(value) == -1) {
                    elem.classList.add(`hide`)
                    console.log(elem)
                }
            })
        } else {
            list2.forEach(elem => {
                elem.classList.remove(`hide`)
            })
        }
    }
}

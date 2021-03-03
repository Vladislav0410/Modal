let fruits = [
    {id: 1, title: 'Яблоко', price: 20, img: 'https://st.depositphotos.com/1003272/1632/i/600/depositphotos_16322913-stock-photo-red-apple.jpg'},
    {id: 2, title: 'Груша', price: 30, img: 'https://st.depositphotos.com/1902163/1955/i/950/depositphotos_19559331-stock-photo-pear.jpg'},
    {id: 3, title: 'Ананас', price: 40, img: 'https://st.depositphotos.com/1050689/2099/i/950/depositphotos_20990611-stock-photo-pineapple-isolated.jpg'}
]

const toHtml = fruits => `
<div class="col">
<div class="card">
    <img class="card-img-top" style="height: 300px;" src="${fruits.img}">
    <div class="card-body">
      <h5 class="card-title">${fruits.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruits.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruits.id}">Удалить</a>
    </div>
  </div>
</div>`

function render() {
    const html = fruits.map(toHtml).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px' ,
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }},
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`<p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {})
    }
})
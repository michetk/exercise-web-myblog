let formdelete = document.getElementsByClassName('formdelete')
for (let i = 0; i < formdelete.length; i++) {
    formdelete[i].addEventListener('click', (e) => {
        e.preventDefault()
        let decision = confirm('Vcê quer deletar essa categoria?')
        if (decision) {
            formdelete[i].submit()
        }
    })
}

let loading = document.getElementById('loading')
loading.addEventListener('load', () => {
    select = document.getElementById('select')
    select.select()
}, true)
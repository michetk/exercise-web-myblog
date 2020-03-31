// variáveis
let formdelete = document.getElementsByClassName('formdelete')
let loading = document.getElementById('loading')



// eventos
for (let i = 0; i < formdelete.length; i++) {
    formdelete[i].addEventListener('click', (e) => {
        e.preventDefault()
        let decision = confirm('Realmente deseja deletar?')
        if (decision) {
            formdelete[i].submit()
        }
    })
}

loading.addEventListener('load', () => {
    select = document.getElementById('select')
    //select.select()
}, true)

tinymce.init({
    language: 'pt_BR',
    selector: '#article',
    plugins: [
        'advlist aoutolink link image lists print preview hr searchreplace wordcont fullscreen insertdatetime media save table paste emoticons'
    ],
    init_instance_callback: () => {
        tinymce.get('article').setContent($('#textarea').text())  
    }
})


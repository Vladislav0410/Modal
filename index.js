const modal = $.modal({
    title: 'My Modal',
    closable: true,
    content:`
            <p>load</p>`,
    width: '400px' ,
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Primary btn clicked')
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Danger btn clicked')
            modal.close()
        }}
    ]
})

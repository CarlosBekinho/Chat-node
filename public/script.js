$(function () {
    const socket = io()
    socket.nickname = ''

    const namePlaceholder = "Insira seu nome aqui..."
    const msgPlaceholder  = "Escreva sua mensagem..."
    $("#msg").attr("placeholder", namePlaceholder);

    $('#form').submit(function (evt) {
        if (socket.nickname === '') {
            
            socket.nickname = $('#msg').val()
            socket.emit('login', socket.nickname)
            
            
            $('#msg').keypress(function (evt) {
                socket.emit('status', `${socket.nickname} está digitando...`)
            })

            $('#msg').keyup(function (evt) {
                socket.emit('status', '')

            })

            socket.on('status', function (msg) {
                $('#status').html(msg)
            })
            
            $("#msg").attr("placeholder", msgPlaceholder);

            $('#mensagens').css("display", "block")
            $('.name-title').css("display", "none")
        } else {
            socket.emit('chat msg', $('#msg').val())
        }

        $('#msg').val('')
        return false
    })

    socket.on('chat msg', function (msg) {
        $('#mensagens').append($('<li>').text(msg))

        $('#mensagens').animate({ scrollTop: $('#mensagens').get(0).scrollHeight }, 10);
    })



})
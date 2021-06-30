const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message__area')
let sendbtn = document.querySelector('#sendMsg')

do {
        name = prompt('Please enter your name:')
} while (!name);

textarea.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
                sendmessage(e.target.value)
        }
})

sendbtn.onclick = function(){
        sendmessage(textarea.value);
        if (sendmessage) {
                textarea.value = ""
        } else {
               alert('Message not send please try again..!')
        }
}

function sendmessage(message){
        let msg = {
                user: name,
                message: message.trim()
}
   //Apend
        apendmessage(msg, 'outgoing')
        scrolltobottom()
   //send to server
        socket.emit('message', msg)
}
function apendmessage(msg, type){
        let mainDiv = document.createElement('div')
        let className = type
        mainDiv.classList.add(className, 'message')
        let markup = `
                <h4>${msg.user}</h4>
                <p>${msg.message}</p>
        `
        mainDiv.innerHTML = markup
        messagearea.appendChild(mainDiv)
}
function scrolltobottom() {
        messagearea.scrollTop = messagearea.scrollHeight
}

//receive msg
socket.on('message', (msg) => {
        apendmessage(msg, 'incoming')
        scrolltobottom()
})
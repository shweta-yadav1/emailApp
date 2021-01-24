const socket = io()
var chats = []
userList = []
userName = ''
userData = ''

socket.on('message', message=> {
    chats = []
    chats.push(message)
    appendData(chats)
    countFriends(chats)
})


function countFriends(chats) {
    chats.forEach(el => {
        user = el.userName
        if(user) {
            this.userList.push(el.userName)
        }
    })
    cc = new Set(this.userList)
    this.userList = Array.from(cc)
    document.getElementById('people').innerHTML = cc.size;
    addTooltip()
    
}

function addTooltip() {
    this.userData = ''
    this.userList.forEach(data => {
        this.userData += data + ' ' + '\n'
    })
    document.getElementById('people').title = this.userData
}

function addMessage() {
    chats = []
    var input = document.getElementsByName('userInput')[0].value    
    this.userName = document.getElementsByName('userName')[0].value || 'Anonymous'
    chats.push({'userName': this.userName ,'message': input})
    socket.emit('input-message', {'userName': this.userName ,'message': input} )
    document.getElementsByName('userInput')[0].value = " "
    appendData(chats)

}

document.addEventListener('keypress' , (event) => {
    if(event.key === "Enter") {
        this.userName = document.getElementsByName('userName')[0].value || 'Anonymous'
        this.userList.push(this.userName)
        addTooltip();
        document.activeElement.blur();
    }
})
    


function appendData(msg) {
    chats.forEach((data) => {
        if(data.message) {
            var i = document.createElement('p')
            i.className = "shadow-sm bg-white rounded"
            i.innerHTML = data.message
            i = messageCss(i , data.userName)
            document.getElementById('listData').appendChild(i);
            var name = document.createElement('div')
            name = nameCss(name)
            name.innerHTML = data.userName
            i.appendChild(name)
        }
    })


}

function nameCss(element) {
    element.className = 'userName-css'
    return element
}

function messageCss(element, name) {
    element.className = name === this.userName ? "message-orange" :"message-blue"
    return element
}

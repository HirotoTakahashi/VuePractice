var data = { a: 1 }

// Object.freeze(data)

var vm = new Vue({
    el: '#app',
    data: data,
    created: function () {
        console.log('created a is: ' + this.a)
    },
    beforeUpdated: function() {
        console.log('beforeUpdated a is: ' + this.a)

    },
    updated: function() {
        console.log('updated a is: ' + this.a)

    }
})

vm.a == data.a

vm.a = 2
data.a

data.a = 3
vm.a
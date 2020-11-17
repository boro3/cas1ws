console.time('pero')

console.log("Zdravo Svetu OK!")

console.error('console error!')

let obj = {
    name: 'Pero',
    lastName: 'Perovski'
}
console.dir(obj)

let tbl = [
    {
        name: 'Pero',
        lastName: 'Perovski'
    },
    {
        name: 'Pero',
        lastName: 'Perovski'
    },
    {
        name: 'Pero',
        lastName: 'Perovski'
    },
    {
        name: 'Pero',
        lastName: 'Perovski'
    }
]

console.table(tbl)
console.timeEnd('pero')

function sampleFn(param1) {
    console.log("Funkcija 1")
}

const sampleFn2 = function () {
    console.log("Funkcija 2")
}

const sampleFatFn = () =>{
    console.log('Arrow Function')
}

const {calculateTip,FaradeisToCelsius,CelsiusToFaradeis} = require('../src/math')

test('Should calculate Total with Tips',()=>{
    const total = calculateTip(10, 0.3)
    expect(total).toBe(13)
})

test('Should clac total with default tip', ()=>{
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C',()=>{
    const tempC = FaradeisToCelsius(32)
    expect(tempC).toBe(0)
})

test('Should convert 0 C to 32 F',()=>{
    const tempF = CelsiusToFaradeis(0)
    expect(tempF).toBe(32)
})
//done => declares function is asynchronous
test('Async test demo', (done)=>{
    setTimeout(()=>{
        expect(1).toBe(2)
    },2000)
})
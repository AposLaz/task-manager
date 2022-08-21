const calculateTip = (total, tiPercent = 0.25) =>{
    const tips = total * tiPercent
    return total+tips
}

const FaradeisToCelsius = (temp)=>{
    return (temp - 32)/1.8
}

const CelsiusToFaradeis = (temp)=> (temp*1.8)+32

module.exports = {
    calculateTip,
    FaradeisToCelsius,
    CelsiusToFaradeis
}
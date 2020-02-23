function gretings(name){
    let changedToArray = name.split('')
    //let result = changedToArray.filter((item, index) => changedToArray.indexOf(item) === index);
    const unique = new Set(changedToArray)
    console.log([...unique])
}

gretings("andrisyh")
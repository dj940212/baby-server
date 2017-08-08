exports.calAge = function(birthday) {
    var birthTime = birthday.getTime()
    var today = Date.now()
    var interval = new Date(today - birthday)
    var yearTime = interval.getFullYear() - 1970
    var year = yearTime ? yearTime + "岁" : "" 
    var month = interval.getMonth()
    var day = interval.getDate()

    

    return year + month + "个月"+ day + "天"
}
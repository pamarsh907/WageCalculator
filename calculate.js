function shiftType(id, name, start, end) {
    this.id = id,
    this.name = name,
    this.startTime = start,
    this.endTime = end
}

//Initialize shift type data
const shiftTypeData = {
    shiftTypeCount : 3,
    regular : new shiftType(1, "regular", 9, 17),
    night : new shiftType(2, "night", 17, 22),
    midnight : new shiftType(3, "midnight", 22, 9)
}

//Returns shift type id for an hour of work
function getShiftType(hour) {
    //hour is between 9-17
    if((hour >= shiftTypeData.regular.startTime) && (hour < shiftTypeData.regular.endTime)) 
        return shiftTypeData.regular.id;
    //hour is between 17-22
    else if((hour >= shiftTypeData.night.startTime) && (hour < shiftTypeData.night.endTime))       
        return shiftTypeData.night.id;
    //hour is between 22-9
    else return shiftTypeData.midnight.id;
}

//Calculates pay for the enitre working period
function calculatePay(shiftsAndRates) {
    var totalPay = 0;

    //Parse hourly rates from input
    var inputArray = shiftsAndRates.trim().split(/\s+/);
    const regularRate = Number(inputArray[0]);
    const nighttimeRate = Number(inputArray[1]);
    const midnightRate = Number(inputArray[2]);

    //Get array of starting and ending shift times
    var shiftTimes = inputArray.slice(shiftTypeData.shiftTypeCount + 1);    
    
    //Iterate over each pair of start and end times
    for(var i = 0; i <= shiftTimes.length-1; i+=2) {
        
        //Get total time worked from start and end times of a shift
        var start = new Date(`9999, ${shiftTimes[i]}:00`);
        var end = new Date(`9999, ${shiftTimes[i+1]}:00`);
        var hoursWorked = Math.abs(end - start) / 36e5;

        //Get shift start time as int for using in loop
        var startInt = start.getHours();

        //For each hour in a shift determine the hourly rate and add to total pay
        for(var j = 0; j < hoursWorked; j++) {
            var shiftType = getShiftType(startInt + j);
            if(shiftType==shiftTypeData.regular.id){
                totalPay+=regularRate;
            } else if(shiftType==shiftTypeData.night.id) {
                totalPay+=nighttimeRate;
            } else {
                totalPay+=midnightRate;
            }
        }
    }
    document.getElementById("results").innerText = (totalPay + "¥\n");
    return totalPay + "\n";  
}

function submit() {
    calculatePay(document.getElementById('input').value);
}
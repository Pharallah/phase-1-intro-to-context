// Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
}

// Adds a new "TimeIn" array into the Employee's TimeInEvents
function createTimeInEvent(recordArr, dateAndTime) {
   
    const [date, time] = dateAndTime.split(' ');
   const hour = parseInt(time);

    const newtimeInEvent = {
        type: "TimeIn",
        date: date,
        hour: hour
    }
    
    recordArr.timeInEvents.push(newtimeInEvent)

    return recordArr;
}

// Adds a new "TimeOut" array into the Employee's TimeOutEvents
function createTimeOutEvent(recordArr, dateAndTime) {
    const [date, time] = dateAndTime.split(' ');
    const hour = parseInt(time);
    
    const newtimeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: hour
    }
    
    recordArr.timeOutEvents.push(newtimeOutEvent)

    return recordArr;
    
}

// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(recordArr, date) {
    const timeOutDate = recordArr.timeOutEvents.find(e => e.date === date)
    const timeInDate = recordArr.timeInEvents.find(e => e.date === date)

    if (timeInDate && timeOutDate) {
       
        let hoursWorked = parseInt(timeOutDate.hour - timeInDate.hour) / 100
        
        return hoursWorked;
    }
    
}

// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed.
function wagesEarnedOnDate(empRecord, date) {
    const payRate = empRecord.payPerHour;
    return parseInt(hoursWorkedOnDate(empRecord, date) * payRate)
}

// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context.
function allWagesFor(employeeRecord) {
    const totalWages = employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
       
        const date = timeInEvent.date;
       
        const wagesForDate = wagesEarnedOnDate(employeeRecord, date);

        return total + wagesForDate;

    }, 0)

    return totalWages;
}

// Using allWagesFor, accumulate the value of all dates worked by the employee in the record used as context.
function calculatePayroll(employees) {
    const payRoll = employees.reduce((total, employee) => total + allWagesFor(employee), 0);

    return payRoll;

}

/*
Iterate through the employee array
Pass each employee in the array through the wagesEarnedOnDate function
*/
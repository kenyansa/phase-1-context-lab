/* Your Code Here */
// The payroll system: 
// populates a record from an Array has a function called createEmployeeRecord;
// populates a firstName field from the 0th element;
// populates a familyName field from the 1th element; 
// populates a title field from the 2th element
// populates a payPerHour field from the 3th element
// initializes a field, timeInEvents, to hold an empty Array
// initializes a field, timeOutEvents, to hold an empty Array

const createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};
// process an Array of Arrays into an Array of employee records
// has a function called createEmployeeRecords
// its implementation makes use of of the createEmployeeRecord function
// creates two records
// correctly assigns the first names

const createEmployeeRecords = function (employeeRowData) {
  return employeeRowData.map(function (row) {
    return createEmployeeRecord(row);
  });
};
// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
// createTimeInEvent

const createTimeInEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};
// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
// createTimeOutEvent
const createTimeOutEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  //Given an employee record with a date-matched timeInEvent and timeOutEvent
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};
// hoursWorkedOnDate
// calculates that the employee worked 2 hours
// Given an employee record with a date-matched timeInEvent and timeOutEvent
const hoursWorkedOnDate = function (soughtDate) {
  let inEvent = this.timeInEvents.find(function (e) {
    return e.date === soughtDate;
  });

  let outEvent = this.timeOutEvents.find(function (e) {
    return e.date === soughtDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};
// wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// wagesEarnedOnDate
const wagesEarnedOnDate = function (dateSought) {
  let rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour;
  return parseFloat(rawWage.toString());
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


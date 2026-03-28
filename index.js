// Attendance Tracking System
class AttendanceBlock {
  constructor(name, date, inTime, outTime) {
    this.name = name;
    this.date = date;
    this.inTime = inTime;
    this.outTime = outTime;
  }

  // Calculate hours worked
  getHoursWorked() {
    if (!this.inTime || !this.outTime) {
      return "N/A";
    }
    
    const inDate = new Date(`${this.date}T${this.inTime}`);
    const outDate = new Date(`${this.date}T${this.outTime}`);
    
    const diffMs = outDate - inDate;
    const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
    
    return diffHours > 0 ? diffHours : "Invalid time range";
  }

  // Get attendance status
  getStatus() {
    if (!this.inTime) return "Absent";
    if (!this.outTime) return "Not checked out";
    return "Present";
  }

  // Display attendance record
  display() {
    return {
      name: this.name,
      date: this.date,
      inTime: this.inTime,
      outTime: this.outTime,
      hoursWorked: this.getHoursWorked(),
      status: this.getStatus()
    };
  }
}

// Attendance Manager
class AttendanceManager {
  constructor() {
    this.records = [];
  }

  // Add attendance record
  addRecord(name, date, inTime, outTime) {
    const record = new AttendanceBlock(name, date, inTime, outTime);
    this.records.push(record);
    return record;
  }

  // Get attendance by employee name
  getEmployeeAttendance(name) {
    return this.records.filter(record => record.name === name);
  }

  // Get all attendance records
  getAllRecords() {
    return this.records.map(record => record.display());
  }

  // Get attendance by date
  getAttendanceByDate(date) {
    return this.records.filter(record => record.date === date);
  }

  // Calculate total hours for an employee
  getTotalHours(name) {
    const employeeRecords = this.getEmployeeAttendance(name);
    let totalHours = 0;

    employeeRecords.forEach(record => {
      const hours = parseFloat(record.getHoursWorked());
      if (!isNaN(hours)) {
        totalHours += hours;
      }
    });

    return totalHours.toFixed(2);
  }

  // Display all records in table format
  displayTable() {
    console.table(this.getAllRecords());
  }
}

// Example Usage
const attendance = new AttendanceManager();

// Add sample attendance records
attendance.addRecord("John Doe", "2026-03-27", "09:00", "17:30");
attendance.addRecord("Jane Smith", "2026-03-27", "08:45", "17:15");
attendance.addRecord("Mike Johnson", "2026-03-27", "09:15", null);
attendance.addRecord("John Doe", "2026-03-26", "09:00", "17:45");

// Display all records
console.log("=== All Attendance Records ===");
attendance.displayTable();

// Get specific employee records
console.log("\n=== John Doe's Attendance ===");
console.log(attendance.getEmployeeAttendance("John Doe"));

// Calculate total hours
console.log("\n=== Total Hours Worked ===");
console.log(`John Doe: ${attendance.getTotalHours("John Doe")} hours`);

// Get attendance for specific date
console.log("\n=== Attendance for 2026-03-27 ===");
console.log(attendance.getAttendanceByDate("2026-03-27"));
from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models, schemas
from datetime import date


def create_employee(db: Session, employee: schemas.EmployeeCreate):

    existing = db.query(models.Employee).filter(
        (models.Employee.employee_id == employee.employee_id) |
        (models.Employee.email == employee.email)
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Employee ID or Email already exists")

    new_employee = models.Employee(**employee.dict())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


def get_employees(db: Session):
    return db.query(models.Employee).all()


def delete_employee(db: Session, employee_id: int):

    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()


def mark_attendance(db: Session, attendance: schemas.AttendanceCreate):

    # Check employee exists
    employee = db.query(models.Employee).filter(
        models.Employee.id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    if attendance.date > date.today():
        raise HTTPException(
            status_code=400,
            detail="Cannot mark attendance for a future date")

    # Check duplicate attendance
    existing = db.query(models.Attendance).filter(
        models.Attendance.employee_id == attendance.employee_id,
        models.Attendance.date == attendance.date
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Attendance already marked for this date")

    new_attendance = models.Attendance(**attendance.dict())
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance


def get_attendance_by_employee(db: Session, employee_id: int):

    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    records = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()

    total_present = sum(1 for r in records if r.status == "Present")

    return {
        "employee": employee.full_name,
        "total_present_days": total_present,
        "attendance_records": records
    }



from datetime import date


def get_dashboard_summary(db: Session, selected_date=None):

    total_employees = db.query(models.Employee).count()

    if not selected_date:
        selected_date = date.today()

    records = db.query(models.Attendance).filter(
        models.Attendance.date == selected_date
    ).all()

    present_list = []
    absent_list = []

    for record in records:
        emp = db.query(models.Employee).filter(
            models.Employee.id == record.employee_id
        ).first()

        emp_data = {
            "employee_id": emp.employee_id,
            "full_name": emp.full_name,
            "department": emp.department
        }

        if record.status == "Present":
            present_list.append(emp_data)
        else:
            absent_list.append(emp_data)

    return {
        "date": selected_date,
        "total_employees": total_employees,
        "total_present": len(present_list),
        "total_absent": len(absent_list),
        "present_employees": present_list,
        "absent_employees": absent_list
    }


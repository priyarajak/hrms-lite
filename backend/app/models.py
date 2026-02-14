from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Date, UniqueConstraint
from datetime import datetime
from .database import Base
from sqlalchemy.orm import relationship


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50), unique=True, nullable=False)
    full_name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    department = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    attendance_records = relationship("Attendance", cascade="all, delete")



class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)

    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_attendance_per_day"),
    )

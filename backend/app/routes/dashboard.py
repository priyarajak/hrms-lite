from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import date
from ..database import SessionLocal
from .. import crud

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def dashboard_summary(
    selected_date: date | None = Query(default=None),
    db: Session = Depends(get_db)
):
    return crud.get_dashboard_summary(db, selected_date)

from fastapi import FastAPI
from .database import engine, Base
from .routes.employee import router as employee_router
from .routes.attendance import router as attendance_router
from .routes.dashboard import router as dashboard_router


from . import models
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="HRMS Lite API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(employee_router)
app.include_router(attendance_router)
app.include_router(dashboard_router)




@app.get("/")
def root():
    return {"message": "HRMS Lite API Running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)

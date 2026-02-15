from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from .database import engine, Base
from .routes.employee import router as employee_router
from .routes.attendance import router as attendance_router
from .routes.dashboard import router as dashboard_router

# Create tables automatically on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API")

# 🌐 CORS — allow frontend + mobile + cross device access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # keep * for assignment/public access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔐 Required when deployed behind Render proxy (fix mobile access)
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]
)

# Routes
app.include_router(employee_router)
app.include_router(attendance_router)
app.include_router(dashboard_router)

# Health check route (useful for Render)
@app.get("/")
def root():
    return {"message": "HRMS Lite Backend Running 🚀"}

# Local run support (optional but safe)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)

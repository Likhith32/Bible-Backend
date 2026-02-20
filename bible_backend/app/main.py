from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import search

app = FastAPI(
    title="Bible Search API",
    description="Bilingual Bible search system (English and Telugu)",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(search.router)


@app.get("/")
def read_root():
    return {
        "message": "Bible Search API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "search": "/search?q=John+3:16"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}

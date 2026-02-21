# Bible Search API - FastAPI Backend

A production-ready FastAPI backend for a bilingual Bible search system supporting English and Telugu.

## Features

- FastAPI with async support
- PostgreSQL database (Neon)
- SQLAlchemy ORM
- Bilingual search (English & Telugu)
- Case-insensitive search
- Multiple query formats support
- CORS middleware enabled
- Proper error handling

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your Neon PostgreSQL connection string:

```
DATABASE_URL=postgresql://user:password@host/database_name
```

### 3. Initialize Database

Create the table using SQL:

```sql
CREATE TABLE bible_verses (
    id SERIAL PRIMARY KEY,
    language VARCHAR(10),
    book VARCHAR(50),
    chapter INT,
    verse INT,
    text TEXT
);

CREATE INDEX idx_book_chapter_verse ON bible_verses(book, chapter, verse);
CREATE INDEX idx_language ON bible_verses(language);
```

### 4. Run the Server

```bash
uvicorn app.main:app --reload
```

Server runs on `http://127.0.0.1:8000`

## API Endpoints

### Search Bible Verses

**Endpoint:** `GET /search?q=query`

**Supported Query Formats:**
- `John 3:16`
- `John 3`
- `john 3 16`

**Example Request:**

```bash
curl "http://127.0.0.1:8000/search?q=John+3:16"
```

**Example Response:**

```json
{
  "bookEnglish": "John",
  "bookTelugu": "యోహాను",
  "chapter": 3,
  "verses": [
    {
      "verse": 16,
      "textEnglish": "For God so loved the world...",
      "textTelugu": "దేవుడు ప్రపంచమును ఎంతగా ప్రేమించెను..."
    }
  ]
}
```

### Health Check

**Endpoint:** `GET /health`

**Response:** `{"status": "ok"}`

### Root/Info

**Endpoint:** `GET /`

Returns API information and available endpoints.

## Documentation

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Project Structure

```
bible_backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI app setup
│   ├── database.py       # Database connection
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── routes/
│   │   ├── __init__.py
│   │   └── search.py     # Search endpoint
│   └── utils/
│       ├── __init__.py
│       └── parser.py     # Bible reference parser
├── requirements.txt
├── .env.example
└── README.md
```

## Search Functionality

The search endpoint supports multiple Bible reference formats:

- **"John 3:16"** - Specific verse (Chapter:Verse)
- **"John 3"** - Full chapter
- **"john 3 16"** - Space-separated format

All searches are **case-insensitive** and return both English and Telugu translations.

## Database

Single table structure for simplicity:

```sql
CREATE TABLE bible_verses (
    id SERIAL PRIMARY KEY,
    language VARCHAR(10),      -- 'en' or 'te'
    book VARCHAR(50),          -- Book name
    chapter INT,               -- Chapter number
    verse INT,                 -- Verse number
    text TEXT                  -- Verse text
);
```

Recommended indexes:
- `(book, chapter, verse)` - Primary search index
- `(language)` - Language filtering

## Error Handling

- **400 Bad Request** - Invalid query format
- **404 Not Found** - No verses found
- **500 Internal Server Error** - Database connection error

## Production Deployment

For production:

1. Use environment-specific `.env` files
2. Set `debug=False` in FastAPI
3. Use a production ASGI server (Gunicorn + Uvicorn)
4. Enable HTTPS
5. Configure proper CORS origins

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## License

MIT

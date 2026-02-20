from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from app.database import get_db
from app.models import BibleVerse
from app.schemas import SearchResponse, VerseData
from app.utils.parser import BibleReferenceParser

router = APIRouter(tags=["search"])


@router.get("/search", response_model=SearchResponse)
def search_bible(
    q: str = Query(..., min_length=1, max_length=100),
    db: Session = Depends(get_db)
):
    """
    Search Bible verses by reference.
    
    Supported formats:
    - John 3:16
    - John 3
    - john 3 16
    """
    parser = BibleReferenceParser()
    parsed = parser.parse(q)
    
    if not parsed:
        raise HTTPException(
            status_code=400,
            detail="Invalid Bible reference format. Use 'John 3:16', 'John 3', or 'john 3 16'"
        )
    
    book, chapter, verse = parsed
    
    # Case-insensitive search
    query = db.query(BibleVerse).filter(
        func.lower(BibleVerse.book).like(func.lower(f"%{book}%")),

        BibleVerse.chapter == chapter
    )
    
    if verse is not None:
        query = query.filter(BibleVerse.verse == verse)
    
    results = query.all()
    
    if not results:
        raise HTTPException(
            status_code=404,
            detail="No verses found for the given reference"
        )
    
    # Group verses by language
    verses_dict = {}
    book_english = None
    book_telugu = None
    
    for result in results:
        if result.verse not in verses_dict:
            verses_dict[result.verse] = {}

        lang = result.language.lower()

        if lang in ["en", "english"]:
            verses_dict[result.verse]["en"] = result.text
            book_english = result.book

        elif lang in ["te", "telugu"]:
            verses_dict[result.verse]["te"] = result.text
            book_telugu = result.book

    
    # Build response
    verses_list = []
    for verse_num in sorted(verses_dict.keys()):
        verse_data = verses_dict[verse_num]
        verses_list.append(
            VerseData(
                verse=verse_num,
                textEnglish=verse_data.get("en"),
                textTelugu=verse_data.get("te")
            )
        )
    
    return SearchResponse(
        bookEnglish=book_english or book,
        bookTelugu=book_telugu,
        chapter=chapter,
        verses=verses_list
    )

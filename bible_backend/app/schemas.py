from pydantic import BaseModel
from typing import List, Optional


class VerseData(BaseModel):
    verse: int
    textEnglish: Optional[str] = None
    textTelugu: Optional[str] = None


class SearchResponse(BaseModel):
    bookEnglish: str
    bookTelugu: Optional[str] = None
    chapter: int
    verses: List[VerseData]


class BibleVerseBase(BaseModel):
    language: str
    book: str
    chapter: int
    verse: int
    text: str


class BibleVerseCreate(BibleVerseBase):
    pass


class BibleVerse(BibleVerseBase):
    id: int

    class Config:
        from_attributes = True

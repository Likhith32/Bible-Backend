from sqlalchemy import Column, Integer, String, Text, Index
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class BibleVerse(Base):
    __tablename__ = "verses"


    id = Column(Integer, primary_key=True, index=True)
    language = Column(String(10), nullable=False)
    book = Column(String(50), nullable=False)
    chapter = Column(Integer, nullable=False)
    verse = Column(Integer, nullable=False)
    text = Column(Text, nullable=False)

    __table_args__ = (
        Index("idx_book_chapter_verse", "book", "chapter", "verse"),
        Index("idx_language", "language"),
    )

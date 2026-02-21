import re
from typing import Tuple, Optional


class BibleReferenceParser:
    """
    Supports:
    - John 3:16
    - John 3
    - john 3 16
    - 1 John 2:3
    - 2 Peter 1:5
    - Telugu names
    """

    @staticmethod
    def parse(query: str) -> Optional[Tuple[str, int, Optional[int]]]:
        if not query:
            return None

        query = query.strip()

        # Allow:
        # - Letters
        # - Numbers (for 1 John, 2 Peter)
        # - Unicode (Telugu)
        # - Spaces
        pattern = r'^([\w\s\u0C00-\u0C7F]+?)\s+(\d+)(?::|\s)?(\d+)?$'

        match = re.match(pattern, query, re.IGNORECASE)

        if not match:
            return None

        book = match.group(1).strip()
        chapter = int(match.group(2))
        verse = match.group(3)

        return book, chapter, int(verse) if verse else None

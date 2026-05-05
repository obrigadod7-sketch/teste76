from fastapi import APIRouter
from typing import List

router = APIRouter()

CATEGORIES = [
    "Bricolage",
    "Jardinage",
    "Déménagement",
    "Ménage",
    "Mécanique",
    "Plomberie",
    "Électricité",
    "Cours particuliers",
    "Garde d'enfants",
    "Informatique",
    "Peinture",
    "Réparation"
]

@router.get("/", response_model=List[str])
async def get_categories():
    return CATEGORIES
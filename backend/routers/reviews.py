from fastapi import APIRouter, HTTPException, Depends
from models import ReviewCreate, ReviewResponse
from auth_utils import get_current_user
from typing import List
from bson import ObjectId
from datetime import datetime

router = APIRouter()

def get_db():
    from motor.motor_asyncio import AsyncIOMotorClient
    import os
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/", response_model=ReviewResponse)
async def create_review(
    review_data: ReviewCreate,
    user_id: str = Depends(get_current_user)
):
    db = get_db()
    # Check if user exists
    to_user = await db.users.find_one({"_id": ObjectId(review_data.toUserId)})
    if not to_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create review
    review_dict = {
        "fromUserId": user_id,
        "toUserId": review_data.toUserId,
        "rating": review_data.rating,
        "comment": review_data.comment,
        "createdAt": datetime.utcnow()
    }
    
    result = await db.reviews.insert_one(review_dict)
    review_dict["_id"] = result.inserted_id
    
    # Update user rating
    reviews = await db.reviews.find({"toUserId": review_data.toUserId}).to_list(length=1000)
    avg_rating = sum(r["rating"] for r in reviews) / len(reviews)
    
    await db.users.update_one(
        {"_id": ObjectId(review_data.toUserId)},
        {"$set": {"rating": round(avg_rating, 1), "reviewCount": len(reviews)}}
    )
    
    return ReviewResponse(
        id=str(review_dict["_id"]),
        fromUserId=review_dict["fromUserId"],
        toUserId=review_dict["toUserId"],
        rating=review_dict["rating"],
        comment=review_dict["comment"],
        createdAt=review_dict["createdAt"]
    )

@router.get("/user/{user_id}", response_model=List[ReviewResponse])
async def get_user_reviews(user_id: str):
    db = get_db()
    reviews_cursor = db.reviews.find({"toUserId": user_id}).sort("createdAt", -1)
    reviews = await reviews_cursor.to_list(length=100)
    
    return [
        ReviewResponse(
            id=str(review["_id"]),
            fromUserId=review["fromUserId"],
            toUserId=review["toUserId"],
            rating=review["rating"],
            comment=review["comment"],
            createdAt=review["createdAt"]
        )
        for review in reviews
    ]
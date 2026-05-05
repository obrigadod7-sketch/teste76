from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# User Models
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    location: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    email: EmailStr
    code: str
    new_password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    categories: Optional[List[str]] = None

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    avatar: Optional[str] = None
    location: str
    phone: Optional[str] = None
    isPremier: bool = False
    rating: float = 0.0
    reviewCount: int = 0
    categories: List[str] = []
    createdAt: datetime

# Demand Models
class DemandCreate(BaseModel):
    title: str
    description: str
    category: str
    budget: Optional[str] = None
    location: str
    photos: Optional[List[str]] = []
    isPro: bool = False

class DemandUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    budget: Optional[str] = None
    location: Optional[str] = None
    photos: Optional[List[str]] = None
    status: Optional[str] = None

class DemandResponse(BaseModel):
    id: str
    userId: str
    title: str
    description: str
    category: str
    budget: Optional[str] = None
    location: str
    photos: List[str] = []
    likes: int = 0
    recommends: int = 0
    responses: int = 0
    isPro: bool = False
    status: str = "active"
    createdAt: datetime

# Message Models
class MessageCreate(BaseModel):
    toUserId: str
    message: str
    demandId: Optional[str] = None

class MessageResponse(BaseModel):
    id: str
    conversationId: str
    fromUserId: str
    toUserId: str
    demandId: Optional[str] = None
    message: str
    read: bool = False
    createdAt: datetime

# Response Models
class DemandResponseCreate(BaseModel):
    demandId: str
    message: str

class DemandResponseModel(BaseModel):
    id: str
    demandId: str
    userId: str
    message: str
    createdAt: datetime

# Review Models
class ReviewCreate(BaseModel):
    toUserId: str
    rating: int = Field(ge=1, le=5)
    comment: str

class ReviewResponse(BaseModel):
    id: str
    fromUserId: str
    toUserId: str
    rating: int
    comment: str
    createdAt: datetime

# Auth Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
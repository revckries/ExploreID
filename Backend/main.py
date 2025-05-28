from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import random
from datetime import datetime, timedelta
import requests
import re
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_BASE_URL = "http://api.weatherapi.com/v1/current.json"

if not WEATHER_API_KEY:
    print("WARNING: WEATHER_API_KEY not found in .env file. Weather functionality might be limited.")

try:
    df_destinations = pd.read_json("backend/data/destinationBali.json")
    df_reviews_raw = pd.read_json("backend/data/destinationReview.json")
    df_hotels = pd.read_json("backend/data/hotelsBali.json")
except FileNotFoundError as e:
    print(f"ERROR: Data file not found: {e}. Ensure data files are in 'backend/data/' folder.")
    df_destinations = pd.DataFrame()
    df_reviews_raw = pd.DataFrame()
    df_hotels = pd.DataFrame()

place_reviews_map = {item['place']: item['reviews'] for item in df_reviews_raw.to_dict(orient='records')}

class WeatherRequest(BaseModel):
    city: str

class FilterRequest(BaseModel):
    experience: str | None = None
    activity: str | None = None
    crowd: str | None = None

class UserRegister(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class ItineraryInput(BaseModel):
    place: str
    days: int = 1

def get_weather_logic(city: str):
    if not WEATHER_API_KEY:
        raise HTTPException(status_code=503, detail="Weather API key is not configured on the server.")
    
    params = {
        "key": WEATHER_API_KEY,
        "q": city,
        "aqi": "no"
    }
    try:
        response = requests.get(WEATHER_BASE_URL, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
        return {
            "city": city,
            "temperature_c": data["current"]["temp_c"],
            "condition": data["current"]["condition"]["text"],
            "humidity": data["current"]["humidity"],
            "wind_kph": data["current"]["wind_kph"]
        }
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail=f"Weather API request timed out for {city}.")
    except requests.exceptions.RequestException as e:
        print(f"Weather API request failed for {city}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch weather data for {city}. Please try again later.")
    except KeyError:
        print(f"Weather data structure unexpected for {city}. Response: {response.json()}")
        raise HTTPException(status_code=404, detail=f"Weather data not found for {city}. Please check the city name.")

experience_map = {
    "culture": ["Ubud Monkey Forest", "Uluwatu Temple", "Besakih Temple (Pura Besakih)", "Tirta Empul Temple", "Goa Gajah", "Penglipuran Village", "Bajra Sandhi Monument", "Sukawati Art Market", "Taman Ujung"],
    "adventure": ["Mount Batur", "Tegenungan Waterfall", "Bali Swing", "West Bali National Park", "Campuhan Ridge Walk", "Bali Safari and Marine Park", "Waterboom Bali", "Banjar Hot Spring"],
    "beach": ["Seminyak Beach", "Nusa Dua Beach", "Kuta Beach", "Pantai Batu Bolong"],
    "nature": ["Jatiluwih Rice Terraces in Bali", "Tenggalang Rice Terrace", "Sidemen Valley", "Tirta Gangga", "Campuhan Ridge Walk", "West Bali National Park", "Tegenungan Waterfall", "Mount Batur", "Banjar Hot Spring", "Bali Pulina"],
    "family": ["Bali Zoo", "Bali Bird Park", "Waterboom Bali", "Garuda Wisnu Kencana Cultural Park", "Bali Safari and Marine Park"]
}
activity_map = {
    "trekking": ["Mount Batur", "Campuhan Ridge Walk", "Sidemen Valley", "Jatiluwih Rice Terraces in Bali", "Pura Penataran Agung Lempuyang"],
    "water sports": ["Seminyak Beach", "Nusa Dua Beach", "Kuta Beach", "Waterboom Bali", "Pantai Batu Bolong", "Tegenungan Waterfall", "Banjar Hot Spring"],
    "cultural exploration": ["Uluwatu Temple", "Besakih Temple (Pura Besakih)", "Tirta Empul Temple", "Goa Gajah", "Penglipuran Village", "Bajra Sandhi Monument", "Sukawati Art Market", "Taman Ujung", "Tirta Gangga", "Goa Lawah Temple"],
    "wildlife": ["Ubud Monkey Forest", "Bali Zoo", "Bali Bird Park", "West Bali National Park", "Bali Safari and Marine Park"],
    "photography": ["Tanah Lot", "Mount Batur", "Jatiluwih Rice Terraces in Bali", "Tenggalang Rice Terrace", "Pura Ulun Danu Bratan", "Tirta Gangga", "Tegenungan Waterfall", "Bali Swing", "Goa Lawah Temple", "Campuhan Ridge Walk", "Garuda Wisnu Kencana Cultural Park", "Sidemen Valley", "Pura Penataran Agung Lempuyang", "Pantai Batu Bolong", "Bali Pulina"]
}
crowd_map = {
    "low": ["Sidemen Valley", "Penglipuran Village", "Taman Ujung", "Banjar Hot Spring", "Bali Pulina"],
    "medium": ["Mount Batur", "Goa Gajah", "Tirta Empul Temple", "Bali Zoo", "Bali Bird Park", "Tirta Gangga", "Tegenungan Waterfall", "Goa Lawah Temple", "Campuhan Ridge Walk", "Bali Safari and Marine Park", "Bajra Sandhi Monument", "Sukawati Art Market", "Garuda Wisnu Kencana Cultural Park"],
    "high": ["Tanah Lot", "Uluwatu Temple", "Ubud Monkey Forest", "Jatiluwih Rice Terraces in Bali", "Tenggalang Rice Terrace", "Pura Ulun Danu Bratan", "Seminyak Beach", "Nusa Dua Beach", "Kuta Beach", "Besakih Temple (Pura Besakih)", "Bali Swing", "Waterboom Bali", "Pantai Batu Bolong"]
}

def filter_features_logic(experience, activity, crowd):
    filtered_places = set(df_destinations['Place'].dropna().unique())

    if experience and experience in experience_map:
        filtered_places = filtered_places.intersection(experience_map[experience])
    elif experience:
        return []

    if activity and activity in activity_map:
        if filtered_places:
            filtered_places = filtered_places.intersection(activity_map[activity])
        else:
            return []
    elif activity and not filtered_places:
        return []
    
    if crowd and crowd in crowd_map:
        if filtered_places:
            filtered_places = filtered_places.intersection(crowd_map[crowd])
        else:
            return []
    elif crowd and not filtered_places:
        return []

    if not experience and not activity and not crowd:
        return df_destinations.to_dict(orient="records")
    
    if not filtered_places:
        return []

    result_df = df_destinations[df_destinations['Place'].isin(filtered_places)]
    return result_df.reset_index(drop=True).to_dict(orient="records")

def generate_time_blocks_logic(start, end):
    block_duration = timedelta(hours=2)
    blocks = []
    current_time = start
    while current_time + block_duration <= end:
        blocks.append((current_time, current_time + block_duration))
        current_time += block_duration
    return blocks

def generate_itinerary_logic(place_name: str, num_days: int = 1):
    itinerary_output = []
    
    if place_name and place_name.lower() != "your destination":
        available_places_df = df_destinations[df_destinations['Place'] == place_name]
    else:
        available_places_df = df_destinations

    places_pool = available_places_df['Place'].dropna().unique().tolist()
    
    if not places_pool:
        places_pool = df_destinations['Place'].dropna().unique().tolist()

    day_start_time = datetime.strptime("08:00", "%H:%M")
    day_end_time = datetime.strptime("20:00", "%H:%M")
    
    for day_idx in range(num_days):
        daily_itinerary = []
        
        current_day_places_pool = list(places_pool)
        random.shuffle(current_day_places_pool)

        all_blocks_for_day = generate_time_blocks_logic(day_start_time, day_end_time)
        
        lunch_block_time = (datetime.strptime("12:00", "%H:%M"), datetime.strptime("13:00", "%H:%M"))
        dinner_block_time = (datetime.strptime("18:00", "%H:%M"), datetime.strptime("19:00", "%H:%M"))

        activity_slots = []
        for block_start, block_end in all_blocks_for_day:
            if not (
                (block_start < lunch_block_time[1] and block_end > lunch_block_time[0]) or
                (block_start < dinner_block_time[1] and block_end > dinner_block_time[0])
            ):
                activity_slots.append((block_start, block_end))
        
        daily_itinerary.append({
            "start": lunch_block_time[0].strftime("%H:%M"),
            "end": lunch_block_time[1].strftime("%H:%M"),
            "activity": "🍽️ Lunch Break"
        })
        daily_itinerary.append({
            "start": dinner_block_time[0].strftime("%H:%M"),
            "end": dinner_block_time[1].strftime("%H:%M"),
            "activity": "🍛 Dinner Break"
        })

        for slot_start, slot_end in activity_slots:
            if current_day_places_pool:
                place = current_day_places_pool.pop(0)
                daily_itinerary.append({
                    "start": slot_start.strftime("%H:%M"),
                    "end": slot_end.strftime("%H:%M"),
                    "activity": place
                })
            else:
                daily_itinerary.append({
                    "start": slot_start.strftime("%H:%M"),
                    "end": slot_end.strftime("%H:%M"),
                    "activity": "Relax / Free Time"
                })

        daily_itinerary.sort(key=lambda x: x["start"])
        itinerary_output.append({f"Day {day_idx + 1}": daily_itinerary})
    
    return itinerary_output

def is_valid_username_logic(username):
    if not isinstance(username, str):
        return False
    if len(username) < 5 or not username.isalnum():
        return False
    emoji_pattern = re.compile("["u"\U0001F600-\U0001F64F"
                               u"\U0001F300-\U0001F5FF"
                               u"\U0001F680-\U0001F6FF"
                               u"\U0001F1E0-\U0001F1FF"
                               "]+", flags=re.UNICODE)
    return not emoji_pattern.search(username)

def is_valid_password_logic(password):
    if not isinstance(password, str):
        return False
    return (
        len(password) >= 8 and
        any(char.isupper() for char in password) and
        any(char.isdigit() for char in password) and
        any(char in "!@#$%^&*()-_=+[]{}|;:',.<>?/~`" for char in password)
    )

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Bali Travel API!"}

@app.get("/api/weather")
async def get_weather_endpoint(city: str):
    weather_data = get_weather_logic(city)
    return weather_data

@app.post("/api/filter")
async def filter_features_endpoint(filters: FilterRequest):
    filtered_data = filter_features_logic(
        filters.experience,
        filters.activity,
        filters.crowd
    )
    return filtered_data

@app.post("/api/itinerary")
async def generate_itinerary_endpoint(itinerary_input: ItineraryInput):
    itinerary = generate_itinerary_logic(itinerary_input.place, itinerary_input.days)
    return itinerary

@app.post("/api/register")
async def register_user_endpoint(user: UserRegister):
    if is_valid_username_logic(user.username) and is_valid_password_logic(user.password):
        return {"status": "success", "message": "✅ Registration successful!"}
    raise HTTPException(status_code=400, detail="❌ Registration failed. Username must be alphanumeric and >= 5 chars; password must be >= 8 chars with uppercase, digit, and special char.")

@app.post("/api/login")
async def login_user_endpoint(user: UserLogin):
    if user.username == "test@example.com" and user.password == "Password@123":
         return {"status": "success", "message": "✅ Login successful!"}
    elif not is_valid_username_logic(user.username) or not is_valid_password_logic(user.password):
        raise HTTPException(status_code=400, detail="❌ Login failed. Invalid input format for username or password.")
    else:
        raise HTTPException(status_code=401, detail="❌ Login failed. Invalid credentials.")

@app.get("/api/destinations")
async def get_all_destinations():
    if df_destinations.empty:
        raise HTTPException(status_code=500, detail="Destination data not loaded.")
    return df_destinations.to_dict(orient="records")

@app.get("/api/reviews")
async def get_all_reviews():
    if df_reviews_raw.empty:
        raise HTTPException(status_code=500, detail="Review data not loaded.")
    return df_reviews_raw.to_dict(orient="records")

@app.get("/api/hotels")
async def get_all_hotels():
    if df_hotels.empty:
        raise HTTPException(status_code=500, detail="Hotel data not loaded.")
    return df_hotels.to_dict(orient="records")
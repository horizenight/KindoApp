import math
import requests
import json
from geopy.distance import geodesic
from collections import Counter

# Load places data
def get_places_data():
    url = "https://api.histourists-lhm.dpschool.app/api/place/all"
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        return data
    else:
        return []

# Haversine distance function
def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0  # Earth radius in kilometers

    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad

    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance

# get index number of place in array to send it back to frontend to improve mapping  and searching in  the frontend
def get_place_index_by_id(place_id):
    places_data = get_places_data()
    for index, place in enumerate(places_data):
        if place.get("id") == place_id:
            return index
    return None

# Function to calculate the recommendation score
def calculate_score(distance, visit_count):
    # Normalize the distance to a scale of 0 to 1
    normalized_distance = min(distance / 10, 1)  # Assuming maximum distance is 10 km

    # Normalize the visit count to a scale of 0 to 1
    normalized_visit_count = min(visit_count / 100, 1)  # Assuming average visit count is 100

    # Calculate the distance score on a scale of 0 to 10
    distance_score = 10 - (normalized_distance * 10)

    # Calculate the visit count score on a scale of 0 to 10
    visit_count_score = normalized_visit_count * 10

    # Calculate the overall score as a weighted average
    score = 0.8 * distance_score + 0.2 * visit_count_score  # change value here for balancing visit_count and distance
    return score

# Function to recommend a place to the user
def recommend_place(user_id, user_data, places_data):
    user_location = user_data["live_location"]
    user_categories = user_data["favorite_categories"]
    visited_places = user_data["visited_places"]

    places_within_radius = []
    recommendations = []

    # Get the categories from the visited places
    visited_categories = [place["category"] for place in visited_places]
    # Determine the most frequent category
    category_counter = Counter(visited_categories)
    most_frequent_category = category_counter.most_common(1)[0][0]
    # Add the categories of the most frequent places to the user_categories list
    user_categories.append(most_frequent_category)

    for place in places_data:
        place_id = place["id"]
        place_category = place["category"]
        place_location = (float(place["lat"]), float(place["lng"]))
        visit_count = place.get("visitCount", 0)

        # Calculate the distance between the user's location and the place
        distance = haversine_distance(user_location[0], user_location[1], place_location[0], place_location[1])
        #50 meters because live location has variance  of  30 meters
        if distance > 0.031 and distance < 1000: # Adjust the distance threshold as needed, API timeout  30 seconds !!!!!! so minimize distance for faster compiling
            places_within_radius.append({
                "id": place_id,
                "category": place_category,
                "visitCount": visit_count,
                "distance": distance
            })

            if place_category in user_categories:
                # Calculate the recommendation score
                score = calculate_score(distance, visit_count)
                recommendations.append((place_id, score))

    recommendations.sort(key=lambda x: x[1], reverse=True)

    if recommendations:
        best_place = recommendations[0][0]
        print("Recommended place for user", user_id, ":", best_place)

        # Print all recommendations with their scores
        print("All Recommendations:")
        for place_id, score in recommendations:
            print("Place ID:", place_id, "Score:", score)

        return best_place
    else:
        print("No recommendations found for user", user_id)
        return None

def lambda_handler(event, context):
    # Get lat and lng from the API as live location from user
    lat = event['queryStringParameters'].get('lat')
    lng = event['queryStringParameters'].get('lng')

    # Check if lat and lng are valid
    if lat is None or lng is None:
        response = {
            "statusCode": 400,
            "body": json.dumps({"message": "Invalid latitude or longitude values from the API."})
        }
        return response

    # Example user data with the live_location in the desired format
    user_data = {
        "id": 1,
        "favorite_categories": ["ART", "EVENT", "HISTORY", "SPORTS"],
        "live_location": (float(lat), float(lng)),
        "visited_places": [
            {"id": "bd06fe0e-9416-4a8a-b74b-eadea49627f6", "category": "ART"},
            {"id": "f114b7d8-c94e-4d0c-b090-9cefc7859baf", "category": "EVENT"},
            {"id": "4166d77f-f45b-43a2-97a8-741475fca919", "category": "HISTORY"},
            {"id": "6f2f8b19-3dbc-4d53-9649-e34e7851a514", "category": "SPORTS"}
        ],
    }

    # Get places data and user data
    places_data = get_places_data()
    # user_data = get_user_data() # activate when user endpoints are working

    if user_data and places_data:
        user_id = user_data["id"]
        recommended_place_id = recommend_place(user_id, user_data, places_data)
        if recommended_place_id:
            index = get_place_index_by_id(recommended_place_id)
            response = {
                "statusCode": 200,
                "body": json.dumps({
                    "id": recommended_place_id,
                    "index": index
                }),
                "headers": {
                    "Access-Control-Allow-Origin": "*",  # Hier kannst du spezifische Domains angeben, die erlaubt sein sollen, z.B. "https://example.com"
                    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Methods": "*"  # Hier kannst du die erlaubten HTTP-Methoden angeben
                }
            }
        else:
            response = {
                "statusCode": 200,
                "body": json.dumps({"message": "No recommended place found."}),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Methods": "*"
                }
            }
    else:
        response = {
            "statusCode": 500,
            "body": json.dumps({"message": "Failed to retrieve user data or places data."}),
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "*"
            }
        }

    print(response)
    return response

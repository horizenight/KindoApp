# AI: `Kindo AI models`

![AIModelsArchitecture.jpg](https://github.com/DigitalProductschool/batch19--lhm/blob/b48c7d309f6ad080c55bd52d4d609731ae7b8c3d/ai/AIModelsArchitecture.jpg)
# AI Architecture

## Components

### S3 Bucket

The S3 bucket serves as the central data storage for the architecture. It saves daily updates of new places in an object named `changed_data.json`. This file contains the latest data about places.

### Description Model

The Description Model Lambda function is responsible for processing places with empty descriptions. When a new place is added without a description, the Description Model generates a relevant and eloquent description for the place.

### Teaser Model

After the Description Model has added descriptions to new places, the Teaser Model Lambda function comes into play. It takes the description as input and generates teasers based on the description's content. These teasers are short and captivating pieces of information that provide users with a glimpse of what the place has to offer. 

### Image Scraper

The Image Scraper Lambda function is responsible for fetching images related to the newly described places. It uses the name of a place as search queries and retrieves relevant images from external sources. 

### Text-to-Speech (TTS) Model

The TTS Model Lambda function is used to create audio files for the descriptions of the places. It takes the text content and converts it into audio using a TTS engine.

### API Gateway

The API Gateway is a trigger for providing personalized recommendations to users. It is set to be triggered whenever a user is near a place (within 30 meters). The API Gateway uses user preferences, such as favourite_categories, visited_places and visit_count of places, to recommend the next best place to visit which appears when a user is at a place.

### AWS Secret Manager

AWS Secret Manager is linked to all Lambda functions that require external API keys or sensitive information. It securely stores the API keys used by the Description Model, Image Scraper, and other external services.

### This is the basic data needed to add a new place. When no description provided it will be generated as well as the audio, teaser and image.
````
{
    "name": "English Garden",
    "description": "",
    "lat": 40.123456, 
    "lng": 45.123456,
    "visitCount": 0,
    "category": "",
    "image_caption": "",
    "imageUrl": "",
    "short_description": "",
    "teaser": ""
}
````
### Example:
````
  {
        "category": "HISTORY",
        "description": "The Munich Olympic Park is a place where the world's famous personalities come and go. And this has been documented since 2003 by a walkway along the shore of the Olympic lake. More than 100 national and international legends from the worlds of sport, music and entertainment, who celebrated great successes in the arenas and on the stages of the park, have so far immortalised themselves in concrete with their hands, signatures and personal greetings and then found their place in the Munich Walk of Stars of the Olympic Park.",
        "id": "9e6e750c-7928-4813-b4e9-7a94cd91fd73",
        "imageCaption": "Legends Eternal: Munich Walk of Stars, Honoring World's Renowned Personalities",
        "imageUrl": "https://img0.oastatic.com/img2/44304836/max/walk-of-stars.jpg",
        "lat": "48.17393207668925",
        "lng": "11.554487746185773",
        "name": "Munich Walk of Stars",
        "shortDescription": "The Munich Olympic Park is a renowned destination for the world's most famous personalities, and since 2003, a walkway along the Olympic lake has documented the many stars who have left their mark in the park.",
        "teaser": "Come and explore the place where the world's most famous personalities have left their mark!",
        "visitCount": 0
    }
````

### The audio is saved in an extra postgresql table to save loading time in the frontend. This is detailed explained in the backend read.me.

# Data Version Lambda Function

This repository contains a Lambda function written in Python 3.10 that tracks changes in data obtained from an external API and stored in an AWS S3 bucket. The function compares the newly retrieved data with the previously stored data and identifies any new items. The changes are then saved back to the S3 bucket for reference.

## Requirements

1. External API: The Lambda function fetches data from an external API (https://api.histourists-lhm.dpschool.app/api/place/all) to track changes.

## Functions

### Function: `save_data_to_s3(bucket_name, file_name, data)`

This function saves data to an S3 bucket. The `bucket_name` parameter is the name of the S3 bucket, the `file_name` parameter is the name of the file to be saved, and the `data` parameter is the data to be stored in JSON format.

### Lambda Function: `lambda_handler(event, context)`

The main Lambda function that orchestrates the entire process. It performs the following steps:
1. Retrieves the latest data using the `get_new_data` function and saves it in the S3 bucket.
2. Retrieves the previously stored data using the `get_old_data` function.
3. Compares the new data with the old data using the `track_changed_data` function and obtains the list of newly added items (changed_data).
4. Updates the S3 bucket with the latest data using the `update_old_data` function.
5. Saves the changed data to the S3 bucket using the `update_new_data` function.
6. Returns the list of newly added items (changed_data) as the response.

## Deployment and Execution

1. The Lambda function will be triggered by an EventBrigde Cronjob daily at 22pm

# Description Generation Lambda Function with OpenAI

This repository contains a Lambda function written in Python to generate descriptions for places located in Munich using the OpenAI API. The Lambda function connects to an AWS S3 bucket to retrieve and update description data, and it interacts with an external API to insert the generated descriptions.

## Requirements

1. OpenAI API Key: To use the OpenAI API, you need an API key from OpenAI. The key is stored securely in AWS Secrets Manager.

2. External API: The Lambda function interacts with an external API (https://api.histourists-lhm.dpschool.app) to insert the generated descriptions.

3. 3. The description will be fetched from the internet if is was added empty. If you want to feed the model with histroical facts there´s in the moment a limitation of 50 tokens. For texts over 50 Tokens there will nothing happen. This barrier can be set different in the function paraphrase_description.

## Parameters and Functions

### Function: `save_data_to_s3(bucket_name, file_name, data)`

This function saves data to an S3 bucket. The `bucket_name` parameter is the name of the S3 bucket, the `file_name` parameter is the name of the file to be saved, and the `data` parameter is the data to be stored in JSON format.

### Function: `update_description_data(changed_data)`

This function updates the description data in the S3 bucket. The `changed_data` parameter is the updated data in JSON format.

### Function: `description_text_from_database()`

This function retrieves the description data from the database stored in an S3 bucket. It returns a list of objects, each containing an `id`, `name`, `description`, `imageUrl`, and `teaser`.

### Function: `generate_text(prompt)`

This function uses the OpenAI API to generate text based on the provided `prompt`. The function returns the generated text as a string. It uses parameters like `max_tokens`, `temperature`, `top_p`, `frequency_penalty`, and `presence_penalty` to control the output.

### Function: `fetch_description_from_internet(name)`

This function fetches a description for a given `name` from the internet using the OpenAI API. It generates a prompt and calls the `generate_text` function to get the description.

### Function: `paraphrase_description(name, description)`

This function paraphrases an existing `description` for a given `name`. It generates a prompt that instructs the OpenAI API to reuse or disregard the existing description while generating a new one.

### Function: `insert_description(id, generated_description)`

This function inserts the `generated_description` into the external API for a specific `id`. It uses the `requests` library to make a PUT request to the API endpoint.

### Lambda Function: `lambda_handler(event, context)`

The main Lambda function that orchestrates the entire process. It loads the description data from the database, generates descriptions for places without a description or with short descriptions, and updates the database with the new descriptions.

# Image Data Update Lambda Function

This repository contains a Lambda function written in Python 3.10 to update the image data of places stored in an S3 bucket. The function uses the Bing Image Search API to fetch relevant images for places that have an empty `imageUrl` field in the S3 data. The fetched images are then added to the respective places in the S3 bucket.

## Requirements

1. Bing Image Search API Key: To use the Bing Image Search API, you need to obtain an API key from the Microsoft Azure portal.

## Functions

### Function: `save_data_to_s3(bucket_name, file_name, data)`

This function saves data to an S3 bucket. The `bucket_name` parameter is the name of the S3 bucket, the `file_name` parameter is the name of the file to be saved, and the `data` parameter is the data to be stored in JSON format.

### Function: `update_image_data(changed_data)`

This function updates the image data for places in the S3 bucket. The `changed_data` parameter is the updated data in JSON format.

### Function: `get_name_from_database()`

This function retrieves the data containing place names from the S3 bucket. It returns a list of objects, each containing an `id`, `name`, and `imageUrl`.

### Function: `insert_image(id, imageUrl)`

This function inserts the `imageUrl` into the external API for a specific `id`. It uses the Bing Image Search API to add the fetched image URL to the corresponding place in the API database.

### Function: `get_image(name)`

This function uses the Bing Image Search API to fetch relevant images for a given `name`. It constructs the API endpoint with the search query, sends a request to the API, and parses the response to obtain image URLs.

### Lambda Function: `lambda_handler(event, context)`

The main Lambda function that orchestrates the entire process. It performs the following steps:
1. Retrieves the data containing place names from the S3 bucket using the `get_name_from_database` function.
2. Loops through each place in the data and checks if it has an empty `imageUrl`.
3. If the `imageUrl` is empty, it calls the `get_image` function to fetch a relevant image URL based on the place name.
4. If an image URL is obtained, it calls the `insert_image` function to add the fetched image URL to the corresponding place in the API database and updates the `imageUrl` field in the S3 data.
5. Finally, it updates the image data in the S3 bucket with the `update_image_data` function.

# Place Recommendation Lambda Function

This repository contains a Lambda function written in Python for providing personalized place recommendations to users based on their live location, favorite categories, and visited places. The function uses geodesic distance calculation and scoring mechanisms to determine the best recommendations for each user.

## Requirements

1. API Endpoint: The Lambda function expects latitude (`lat`) and longitude (`lng`) values as query parameters from an API endpoint.

## Functions

### Function: `get_places_data()`

This function fetches the data for all places from an external API endpoint. It sends an HTTP GET request to the API and parses the JSON response to obtain the places data. The function returns a list of place objects containing place IDs, categories, visit counts, and locations.

### Function: `haversine_distance(lat1, lon1, lat2, lon2)`

This function calculates the haversine distance between two sets of latitude (`lat1`, `lat2`) and longitude (`lon1`, `lon2`) coordinates. The haversine distance is the great-circle distance between two points on a sphere given their longitudes and latitudes. The function returns the distance in kilometers.

### Function: `get_place_index_by_id(place_id)`

This function finds the index number of a place in the places data array based on its place ID. It searches the places data for a matching place ID and returns the index number if found. If no matching place ID is found, the function returns `None`.

### Function: `calculate_score(distance, visit_count)`

This function calculates the recommendation score for a place based on its distance from the user's live location and visit count. The distance score is normalized to a scale of 0 to 10, with 10 being the closest distance. The visit count score is normalized to a scale of 0 to 10, with 10 being the highest visit count. The overall score is a weighted average of the distance score (80%) and visit count score (20%). You can adjust the weightage by changing the coefficients in the calculation.

### Function: `recommend_place(user_id, user_data, places_data)`

This function generates personalized place recommendations for a user based on their data and the places data. It takes the `user_id`, `user_data` (containing user location, favorite categories, and visited places), and `places_data` (containing information about all places) as inputs.

The function first determines the most frequently visited category based on the user's visited places and adds it to the user's favorite categories. It then calculates the distance between the user's live location and each place in the places data. If a place is within a specified radius (between 50 meters and 1000 kilometers), it calculates a recommendation score for that place. The places with the highest scores are considered as recommendations.

The function returns the ID of the recommended place with the highest score. If no suitable recommendations are found, it returns `None`. The index is used to reduce the loading time in the frontend at get the place´s data fast from the already loaded API.

# Example:

Input:
https://5pbg43t105.execute-api.eu-central-1.amazonaws.com/live/location?lat=40.18227296109886&lng=09.551585907297657

Output:
````{"id": "4166d77f-f45b-43a2-97a8-741475fca919", "index": 3} ````

### Lambda Function: `lambda_handler(event, context)`

The main Lambda function that orchestrates the place recommendation process. It is triggered by an API call containing latitude and longitude values (`lat`, `lng`) as query parameters. The `event` parameter contains the API request data, and the `context` parameter provides information about the execution context.

The function extracts the latitude and longitude from the API request and formats the user data. It then calls the `get_places_data` function to fetch all places' data and `recommend_place` function to obtain the best recommendation for the user.

The function responds with a JSON object containing the ID of the recommended place and its index number in the places data array. If no recommendation is found, it returns a message indicating the absence of recommendations.

### Currently there´s no functional User Management System. When this is developed the code should be updated to receive the current personal data of a user.

## Lambda Function for Teaser Generation with OpenAI

This AWS Lambda function is designed to generate creative teasers for a list of places' descriptions. The function utilizes the OpenAI API to create engaging teasers that provide a short and intriguing summary of each place.

### Function: description_text_from_database()
This function connects to an S3 bucket and retrieves data from the object named changed_data.json. The object contains place information in JSON format, including place IDs and their descriptions. The function returns a list of tuples, where each tuple contains the place ID and its description (or an empty string if the description is missing).

### Function: generate_teaser(description)
This function takes a description as input and uses the OpenAI API to generate a teaser for the place. The teaser is a creative and intriguing short statement about the place, without revealing its name. The function constructs a prompt based on the input description and sends it to the OpenAI API. The generated teaser is returned.

### Function: insert_teaser(id, teaser)
This function takes a place ID and a teaser as input and sends a PUT request to an API endpoint to update the teaser for the corresponding place. The function uses the API endpoint https://api.histourists-lhm.dpschool.app/editTeaser/ to insert the teaser into the place's field. The teaser is added to the "teaser" field for the specified place ID.

### Lambda Function: lambda_handler(event, context)
This is the main Lambda function that orchestrates the teaser generation process. It is triggered by an event (e.g., a scheduled event, API call, etc.) and starts generating teasers for the place descriptions.

The function first calls description_text_from_database() to retrieve the place descriptions from the S3 bucket. It then iterates through each place's description and generates a teaser using generate_teaser(). If a teaser is generated, it calls insert_teaser() to update the teaser for that place using the API endpoint.

The function logs the generated teasers along with their corresponding place IDs for monitoring purposes.

# Lambda Function for Audio Generation and Upload with Elevenlabs

This AWS Lambda function is designed to generate audio files from descriptions of places and upload them to a Histourists API https://api.histourists-lhm.dpschool.app/api/editAudio/{id} endpoint. The function uses the Eleven Labs Text-to-Speech API to generate audio in MP3 format and then converts it to WAV format for upload.

### Function: generate_audio(text, voice)
This function takes a text description and a voice name as input and uses the Eleven Labs Text-to-Speech API to generate an audio file in MP3 format. The function constructs a POST request with the text and voice settings and sends it to the API endpoint. The response from the API is converted into an AudioSegment object using PyDub and returned as the audio file.

### Function: get_description_from_database()
This function connects to an S3 bucket and retrieves data from the object named changed_data.json. The object contains place information in JSON format, including place IDs and their descriptions. The function generates audio for each description using generate_audio(). It returns a list of tuples, where each tuple contains the place ID, description, and corresponding audio as an AudioSegment object.

### Lambda Function: lambda_handler(event, context)
This is the main Lambda function that orchestrates the audio generation and upload process. It is triggered by an event (e.g., a scheduled event, API call, etc.) and starts generating audio for the place descriptions.

The function first sets the Eleven Labs API key using the environment variable API_KEY. It then calls get_description_from_database() to retrieve the place descriptions and generate audio for each description.

For each place, the function saves the audio as a WAV file with the place ID as the filename. It then converts the WAV file to hexadecimal format to prepare for uploading.

Next, the function constructs the payload for the PUT request with the audio data and sends the request to the Histourists API endpoint. The response from the API is checked for a successful upload.

The function logs the status of each audio upload along with the corresponding place ID and description for monitoring purposes.

### A good and free alternative is the  TTSespnet2 model. You can see an example in the google Colab notebook

[Google Colab Notebook](https://colab.research.google.com/drive/13W1ehydCYieXtTOf1a79d8QuxD0qLHIm?usp=sharing)

### Lambda Function for Text Summarization with OpenAI

This AWS Lambda function is written in Python and is designed to perform text summarization for a list of places' descriptions. It utilizes the OpenAI API for text summarization and interacts with a custom API to update the short descriptions for each place.

### Function: get_secret(secret_name)
This function retrieves the OpenAI API key from AWS Secrets Manager using the provided secret name.

### Function: summarize_text_from_database()
This function connects to an S3 bucket and fetches the data from the specified object. It then extracts the descriptions for each place and returns a list of tuples, where each tuple contains the place ID and its description (or an empty string if the description is missing).

### Function: summarize_text(text)
This function takes a text as input and uses the OpenAI API to generate a summarized version of the text. The prompt for the API call is constructed based on the input text. The summarized text is expected to be one or two sentences long and serves as a condensed version of the original text. The function returns the summarized text.

### Function: insert_short_description(id, text)
This function takes a place ID and a text (short description) as input and sends a PUT request to a custom API endpoint to update the short description for the corresponding place. The function returns the status code of the API response to indicate whether the update was successful.

###  Lambda Function: lambda_handler(event, context)
This is the main Lambda function that orchestrates the text summarization and teaser generation process. It is triggered by an event (e.g., a scheduled event, API call, etc.) and starts the summarization process.

The function first calls summarize_text_from_database() to retrieve the place descriptions from the S3 bucket. It then iterates through each place's description and generates a summarized version using summarize_text(). If the summary is not empty, it calls insert_short_description() to update the short description for that place using the custom API endpoint.

The function returns a JSON response containing the number of successful short description updates (num_short_descriptions).

### The function as well as the needed fields are implemented in the database but not used in the current App. This function could be helpful for future usage when the historical texts getting longer so that the user have a fast oversight over the topic.

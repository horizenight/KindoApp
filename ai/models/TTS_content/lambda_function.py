import requests
import json
from IPython.display import Audio
from requests.exceptions import ConnectionError
from pydub import AudioSegment
from elevenlabs import generate, play, set_api_key
import boto3  # Importiere das 'boto3'-Modul
import os
import io

CHUNK_SIZE = 1024

def generate_audio(text, voice):
    url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM"

    headers = {
      "Accept": "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": "4823728c7e163a9c9786e30cb98e11e4"
    }

    data = {
      "text": text,
      "model_id": "eleven_monolingual_v1",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
      }
    }

    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()

    # Wandele den bytes-Inhalt in ein AudioSegment-Objekt um
    audio = AudioSegment.from_file(io.BytesIO(response.content), format="mp3")

    return audio

def get_description_from_database():
    # Connect to S3
    s3 = boto3.client('s3')

    # Specify the S3 bucket and object name
    bucket_name = 'dataversionlambda'
    object_name = 'changed_data.json'

    # Retrieve the data from the S3 object
    response = s3.get_object(Bucket=bucket_name, Key=object_name)
    data = json.loads(response['Body'].read().decode('utf-8'))

    id_desc_audio = []

    for place in data:
        description = place.get("description", "")
        audio = generate_audio(text=description, voice="Rachel")

        # Check if 'id' key exists in 'place' dictionary
        if "id" in place and place["id"] is not None:
            id_desc_audio.append((place["id"], description, audio))

    return id_desc_audio

def lambda_handler(event, context):
    # Set your API key
    api_key = os.environ.get('API_KEY')   # Replace with your actual API key
    set_api_key(api_key)

    # Get the description from the database and generate audio
    id_desc_audio = get_description_from_database()

    for item in id_desc_audio:
        id, description, audio = item

        # Skip the audio generation and upload if ID is None
        if id is None:
            continue

        # Save the audio as a WAV file with the place ID as the filename
        wav_filename = f"/tmp/audio_{id}.wav"
        try:
            audio.export(wav_filename, format="wav")
        except IOError as e:
            print(f"Failed to save audio file for place ID {id}: {e}")
            continue

        # Convert WAV file to hex
        hex_data = ""
        try:
            with open(wav_filename, "rb") as wav_file:
                byte_data = wav_file.read()
            hex_data = byte_data.hex()
        except IOError as e:
            print(f"Failed to read WAV file for place ID {id}: {e}")
            continue

        # Create the payload for the PUT request
        payload = {
            "id": id,
            "audio": hex_data
        }
        headers = {
            'Content-Type': 'application/json'
        }

        # Send the PUT request to upload the audio file
        try:
            response = requests.put(f"https://api.histourists-lhm.dpschool.app/editAudio/{id}", headers=headers, data=json.dumps(payload))
            if response.status_code == 200:
                print(f"Audio for place ID {id} uploaded successfully!")
                print(f"Description: {description}")
            else:
                print(f"Failed to upload audio for place ID {id}")
        except ConnectionError:
            print(f"Failed to establish a connection while uploading audio for place ID {id}. Please check your internet connection or try again later.")
        except requests.exceptions.RequestException as e:
            print(f"An error occurred while uploading audio for place ID {id}: {e}")

    return "Processing completed successfully"

import requests
import json
from io import BytesIO
import boto3

# Function to get the OpenAI API key from AWS Secrets Manager
def get_secret(secret_name):
    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name='eu-central-1')

    try:
        response = client.get_secret_value(SecretId=secret_name)
        secret_data = json.loads(response['SecretString'])
        return secret_data
    except Exception as e:
        raise e

def save_data_to_s3(bucket_name, file_name, data):
    s3 = boto3.client('s3')
    s3.put_object(Body=json.dumps(data), Bucket=bucket_name, Key=file_name)

def update_image_data(changed_data):
    # S3 Bucket-Name and file name for the old data JSON
    bucket_name = 'dataversionlambda'
    file_name = 'changed_data.json'

    # Save updated data to S3
    save_data_to_s3(bucket_name, file_name, changed_data)

def get_name_from_database():
    # Connect to S3
    s3 = boto3.client('s3')

    # Specify the S3 bucket and object name
    bucket_name = 'dataversionlambda'
    object_name = 'changed_data.json'

    # Retrieve the data from the S3 object
    response = s3.get_object(Bucket=bucket_name, Key=object_name)
    new_data = json.loads(response['Body'].read().decode('utf-8'))

    loaded_data = []

    # Loop through each item in new_data
    for new_item in new_data:
        # Add the item to the loaded_data list
        loaded_data.append({
            "id": new_item["id"],
            "name": new_item["name"],
            "imageUrl": new_item["imageUrl"],
        })

    return loaded_data

def insert_image(id, imageUrl):
    url = f"https://api.histourists-lhm.dpschool.app/editImageUrl/" + str(id)
    payload = json.dumps({
            "image_url": imageUrl
    })
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.put(url, headers=headers, data=payload)
    print(response.text)

def get_image(name):
    # Set up API credentials
    secret_name = "apiDatabaseKeys"
    secrets = get_secret(secret_name)

    # Access the API key
    api_key = secrets['API_KEY_BING']

    # Define your Bing Image Search API key
    api_key = 'ef0f59aa3cec4252900f8b39ef74ffd3'

    # Define the search query
    query = f'{name} Munich'.replace(' ', '+')

    # Define the number of images to download
    num_images = 5

    # Define the list to store the image URLs and their titles
    image_urls = []

    license = "any"  # set "Public" for commercial usage

    # Construct the Bing Image Search API endpoint
    url = f'https://api.bing.microsoft.com/v7.0/images/search?q={query}'
    # Set the API key in the request headers
    headers = {
        'Ocp-Apim-Subscription-Key': api_key
    }

    # Send the API request
    response = requests.get(url, headers=headers)
    data = json.loads(response.content)  # Parse the JSON response

    for img in data['value']:  # Access the 'value' key in the parsed JSON data
        try:
            # Get the image URL
            url = img['contentUrl']

            # Send a HEAD request to check the Content-Type header
            head_response = requests.head(url)
            content_type = head_response.headers.get('Content-Type', '')

            # Check if the response is an image
            if not content_type.startswith('image'):
                continue

            # Add the image URL to the list
            image_urls.append(url)

        except:
            pass

    # Return the content URL of the first image in the list (if available)
    if image_urls:
        return image_urls[0]
    else:
        return None

def lambda_handler(event, context):
    # Example usage
    loaded_data = get_name_from_database()

    for index, item in enumerate(loaded_data):
        id = item["id"]
        name = item["name"]
        imageUrl = item["imageUrl"]

        if not imageUrl:
            generated_image = get_image(name)

            if generated_image:
                # Insert the fetched image URL into the imageUrl field for the corresponding id
                insert_image(id, generated_image)

                # Update the imageUrl field in loaded_data with the generated image URL
                loaded_data[index]["imageUrl"] = generated_image

    # Update the image data in S3
    update_image_data(loaded_data)

    return {
        "statusCode": 200,
        "body": json.dumps(loaded_data)
    }
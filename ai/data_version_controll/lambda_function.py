import boto3
import requests
import json

def save_data_to_s3(bucket_name, file_name, data):
    s3 = boto3.client('s3')
    s3.put_object(Body=json.dumps(data), Bucket=bucket_name, Key=file_name)

def get_new_data():
    # URL der API
    api_url = 'https://api.histourists-lhm.dpschool.app/api/place/all'

    # Daten abrufen
    response = requests.get(api_url)
    new_data = response.json()

    # S3 Bucket-Name und Dateiname für die neue Daten-JSON
    bucket_name = 'dataversionlambda'
    file_name = 'new_data.json'

    # Daten in S3 speichern
    save_data_to_s3(bucket_name, file_name, new_data)

    return new_data

def get_old_data():
    # S3 Bucket-Name und Dateiname für die alte Daten-JSON
    bucket_name = 'dataversionlambda'
    file_name = 'old_data.json'

    # Daten aus dem S3 Bucket laden
    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=bucket_name, Key=file_name)
    old_data = json.loads(response['Body'].read())

    return old_data

def update_old_data(new_data):
    # S3 Bucket-Name und Dateiname für die alte Daten-JSON
    bucket_name = 'dataversionlambda'
    file_name = 'old_data.json'

    # Aktualisierte Daten in S3 speichern
    save_data_to_s3(bucket_name, file_name, new_data)

def update_new_data(changed_data):
    # S3 Bucket-Name und Dateiname für die alte Daten-JSON
    bucket_name = 'dataversionlambda'
    file_name = 'new_data.json'

    # Aktualisierte Daten in S3 speichern
    save_data_to_s3(bucket_name, file_name, changed_data)

def track_changed_data(new_data, old_data):
    # Create an empty list to store the items in new_data that are not present in old_data
    changed_data = []

    # Loop through each item in new_data
    for new_item in new_data:
        # Check if the item's ID is not present in old_data
        if new_item["id"] not in [item["id"] for item in old_data]:
            # Add the item to the changed_data list
            changed_data.append({
                "id": new_item["id"],
                "name": new_item["name"],
                "description": new_item["description"],
                "imageUrl": new_item["imageUrl"],
                "teaser": new_item["teaser"]
            })

    return changed_data

def lambda_handler(event, context):
    # Aufruf der Funktion, um neue Daten zu erhalten und im S3-Bucket zu speichern
    new_data = get_new_data()

    # Aufruf der Funktion, um alte Daten aus dem S3-Bucket zu laden
    old_data = get_old_data()

    # Aufruf der Funktion, um die Änderungen zu verfolgen
    changed_data = track_changed_data(new_data, old_data)

    # Aufruf der Funktion, um old_data auf new_data zu setzen und im S3-Bucket zu speichern
    update_old_data(new_data)

    # Aufruf der Funktion, um changed_data auf new_data zu setzen und im S3-Bucket zu speichern
    update_new_data(changed_data)

    # Rückgabe der geänderten Daten als Response
    return {
        "statusCode": 200,
        "body": json.dumps(changed_data)
    }

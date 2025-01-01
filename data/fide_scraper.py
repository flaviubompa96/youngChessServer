import xmltodict
import json
from pymongo import MongoClient
import requests
import zipfile
import io

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "young_chess_database"
COLLECTION_NAME = "players"

FIDE_ZIP_URL = "https://ratings.fide.com/download/players_list_xml.zip"

def download_and_extract_zip(url):
    print("Downloading ZIP file...")
    response = requests.get(url)
    if response.status_code == 200:
        print("Download successful!")
        
        print("Extracting XML from ZIP...")
        zip_file = zipfile.ZipFile(io.BytesIO(response.content))
        for file_name in zip_file.namelist():
            if file_name.endswith(".xml"):
                print(f"Extracted XML file: {file_name}")
                return zip_file.read(file_name).decode("utf-8")
        
        print("No XML file found in the ZIP archive.")
        return None
    else:
        print(f"Failed to download ZIP. HTTP Status Code: {response.status_code}")
        return None

def parse_and_insert_to_mongo(xml_data, mongo_uri, db_name, collection_name):
    try:
        print("Parsing XML data...")
        xml_dict = xmltodict.parse(xml_data)
        players = xml_dict["playerslist"]["player"]

        client = MongoClient(mongo_uri)
        db = client[db_name]
        collection = db[collection_name]

        print("Clearing existing data in MongoDB...")
        collection.delete_many({})

        print("Inserting players into MongoDB...")
        result = collection.insert_many(players)
        print(f"Inserted {len(result.inserted_ids)} players into MongoDB.")

        client.close()
        print("MongoDB connection closed.")

    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    xml_data = download_and_extract_zip(FIDE_ZIP_URL)
    if xml_data:
        parse_and_insert_to_mongo(xml_data, MONGO_URI, DB_NAME, COLLECTION_NAME)

if __name__ == "__main__":
    main()
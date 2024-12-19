from flask import Flask, request, jsonify
import boto3
from aws_credentials import aws_access_key_id, aws_secret_access_key, aws_session_token

app = Flask(__name__)

# Initialize DynamoDB client
client = boto3.client(
    'dynamodb',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    aws_session_token=aws_session_token,
    region_name='us-east-1'
)

@app.route('/add-gift', methods=['POST'])
def add_gift():
    data = request.json
    try:
        # Insert item into DynamoDB
        client.put_item(
            TableName='SaveChristmas',
            Item={
                'ID': {'N': data['id']},  # ID est un nombre
                'Address': {'S': data['address']},
                'Cadeau': {'S': data['gift_name']},
                'Nom': {'S': data['last_name']},
                'Prenom': {'S': data['first_name']}
            }
        )
        return jsonify({"message": "Cadeau ajouté avec succès !"}), 200
    except Exception as e:
        print("Error inserting item:", e)
        return jsonify({"error": "Erreur lors de l'ajout du cadeau."}), 500

@app.route('/list-gifts', methods=['GET'])
def list_gifts():
    try:
        response = client.scan(TableName='SaveChristmas')
        items = response.get('Items', [])
        return jsonify(items), 200
    except Exception as e:
        print("Error scanning table:", e)
        return jsonify({"error": "Erreur lors de la récupération des cadeaux."}), 500

if __name__ == '__main__':
    app.run(debug=True)

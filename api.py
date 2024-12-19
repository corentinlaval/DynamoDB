from flask import Flask, request, jsonify
import boto3
import aws_credentials

app = Flask(__name__)

<<<<<<< HEAD
# Initialisation du client DynamoDB avec les identifiants AWS
client = boto3.client(
    'dynamodb',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    aws_session_token=aws_session_token,  # Utiliser uniquement si ce jeton existe
    region_name='us-east-1'
)
=======
# Configuration DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
TABLE_NAME = 'SaveCloudmas'
table = dynamodb.Table(TABLE_NAME)
>>>>>>> 296cd790a4ad724b0bf40a81d83e76507954693a

TABLE_NAME = "SaveCloudmas"

# Fonction pour créer un élément
@app.route('/api', methods=['POST'])
def api():
    try:
        data = request.get_json()
        if not data or 'action' not in data:
            return jsonify({"error": "Invalid request. 'action' field is required."}), 400

        action = data['action']

        if action == 'create':
            return create_item(data)
        elif action == 'read':
            return read_item(data)
        elif action == 'update':
            return update_item(data)
        elif action == 'delete':
            return delete_item(data)
        else:
            return jsonify({"error": "Invalid action specified."}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fonction pour créer un élément
def create_item(data):
    try:
        if 'item' not in data:
            return jsonify({"error": "Missing 'item' field in request."}), 400
        
        # Préparation de l'élément à insérer dans DynamoDB
        item = data['item']
        
        # Ajout de l'élément dans DynamoDB
        response = client.put_item(
            TableName=TABLE_NAME,
            Item=item
        )
        
        return jsonify({"message": "Item created successfully.", "response": response}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fonction pour lire un élément
def read_item(data):
    try:
        if 'key' not in data:
            return jsonify({"error": "Missing 'key' field in request."}), 400

        # Récupération de l'élément avec la clé spécifiée
        key = data['key']
        
        response = client.get_item(
            TableName=TABLE_NAME,
            Key=key
        )
        
        if 'Item' in response:
            return jsonify(response['Item']), 200
        else:
            return jsonify({"error": "Item not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fonction pour mettre à jour un élément
def update_item(data):
    try:
        if 'key' not in data or 'updates' not in data:
            return jsonify({"error": "Missing 'key' or 'updates' field in request."}), 400
        
        key = data['key']
        updates = data['updates']
        
        # Création de l'expression de mise à jour
        update_expression = "SET " + ", ".join(f"{k} = :{k}" for k in updates.keys())
        expression_values = {f":{k}": v for k, v in updates.items()}
        
        # Mise à jour de l'élément dans DynamoDB
        response = client.update_item(
            TableName=TABLE_NAME,
            Key=key,
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values
        )
        
        return jsonify({"message": "Item updated successfully.", "response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Fonction pour supprimer un élément
def delete_item(data):
    try:
        if 'key' not in data:
            return jsonify({"error": "Missing 'key' field in request."}), 400
        
        key = data['key']
        
        # Suppression de l'élément dans DynamoDB
        response = client.delete_item(
            TableName=TABLE_NAME,
            Key=key
        )
        
        return jsonify({"message": "Item deleted successfully.", "response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Point de terminaison pour obtenir tous les éléments de la table
@app.route('/api/items', methods=['GET'])
def get_all_items():
    try:
        # Récupération de tous les éléments dans la table
        response = client.scan(TableName=TABLE_NAME)
        items = response.get('Items', [])
        
        return jsonify({"items": items}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

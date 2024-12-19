from flask import Flask, request, jsonify
import boto3
from botocore.exceptions import ClientError

app = Flask(__name__)

# Configuration DynamoDB
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
TABLE_NAME = 'SaveCloudmas'
table = dynamodb.Table(TABLE_NAME)

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

def create_item(data):
    try:
        if 'item' not in data:
            return jsonify({"error": "Missing 'item' field in request."}), 400

        table.put_item(Item=data['item'])
        return jsonify({"message": "Item created successfully."}), 201
    except ClientError as e:
        return jsonify({"error": e.response['Error']['Message']}), 500

def read_item(data):
    try:
        if 'key' not in data:
            return jsonify({"error": "Missing 'key' field in request."}), 400

        response = table.get_item(Key=data['key'])
        if 'Item' in response:
            return jsonify(response['Item']), 200
        else:
            return jsonify({"error": "Item not found."}), 404
    except ClientError as e:
        return jsonify({"error": e.response['Error']['Message']}), 500

def update_item(data):
    try:
        if 'key' not in data or 'updates' not in data:
            return jsonify({"error": "Missing 'key' or 'updates' field in request."}), 400

        update_expression = "SET " + ", ".join(f"{k} = :{k}" for k in data['updates'].keys())
        expression_values = {f":{k}": v for k, v in data['updates'].items()}

        table.update_item(
            Key=data['key'],
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values
        )

        return jsonify({"message": "Item updated successfully."}), 200
    except ClientError as e:
        return jsonify({"error": e.response['Error']['Message']}), 500

def delete_item(data):
    try:
        if 'key' not in data:
            return jsonify({"error": "Missing 'key' field in request."}), 400

        table.delete_item(Key=data['key'])
        return jsonify({"message": "Item deleted successfully."}), 200
    except ClientError as e:
        return jsonify({"error": e.response['Error']['Message']}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
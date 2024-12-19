import boto3
from aws_credentials import aws_access_key_id, aws_secret_access_key, aws_session_token

client = boto3.client(
    'dynamodb',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    aws_session_token=aws_session_token,
    region_name='us-east-1'
)

address_to_search = '1 rue de la Pomme Pourrie'

response = client.query(
    TableName='SaveCloudmas',
    KeyConditionExpression='Address = :address',
    ExpressionAttributeValues={
        ':address': {'S': address_to_search}
    }
)

for item in response['Items']:
    print(f"ID: {item['ID']['N']}, Cadeau: {item['Cadeau']['S']}, Nom: {item['Nom']['S']}, Prenom: {item['Prenom']['S']}")
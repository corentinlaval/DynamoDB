import boto3
from aws_credentials import aws_access_key_id, aws_secret_access_key, aws_session_token

client = boto3.client(
    'dynamodb',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    aws_session_token=aws_session_token,
    region_name='us-east-1'
)

try:
    response = client.scan(
        TableName="SaveCloudmas"
    )
    items = response.get('Items', [])
    print("All items in the table:")
    for item in items:
        print(item)
except Exception as e:
    print("Error scanning table:")
    print(e)

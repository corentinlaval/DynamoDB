import boto3

# Initialize a DynamoDB client
client = boto3.client(  'dynamodb')

try:
    # Scan the entire table
    response = client.scan(
        TableName="SaveChristmas"
    )
    # Print the retrieved items
    items = response.get('Items', [])
    print("All items in the table:")
    for item in items:
        print(item)
except Exception as e:
    print("Error scanning table:")
    print(e)

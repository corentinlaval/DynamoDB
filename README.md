# Cloud Computing
School Project

## Install AWS Node.js SDK
npm install @aws-sdk/client-dynamodb

## Install AWS Pyhthon SDK

```bash
python -m venv env
#Windows:
./env/Scripts/activate
pip install boto3
```

## Send data

aws dynamodb batch-execute-statement --statements file://partiqlbatch.json
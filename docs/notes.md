# Project Notes

## Project Name
AWS Serverless Web Application

## Purpose
Build a portfolio-ready AWS serverless web application that combines API development, cloud storage, search, and frontend interaction into one unified project.

## Core Modules

### 1. Num2Words API
Goal:
- Accept an integer input
- Convert the number into English words
- Return the output through API Gateway + Lambda
- Extend with DynamoDB history storage

### 2. Search Movies
Goal:
- Search movie data by keyword
- Use OpenSearch as the backend search engine
- Return movie results through Lambda + API Gateway
- Provide a React frontend for interactive search

---

## AWS Services Used

- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Amazon OpenSearch Service
- Amazon CloudWatch
- AWS IAM

---

## Search Movies Progress Log

### OpenSearch Domain
Completed:
- Created OpenSearch domain `movies`
- Region: `us-east-2`
- Instance type: `t3.small.search`
- Storage: `gp3`, 10 GiB
- Public access enabled
- Fine-grained access control enabled

### Dataset Import
Completed:
- Downloaded and extracted `sample-movies.bulk`
- Imported data into the `movies` index using OpenSearch Dev Tools
- Verified successful import with `match_all`

### Query Validation
Completed:
- Verified `match` query on `title`
- Verified `multi_match` query on:
  - `title`
  - `plot`

### Search Lambda
Completed:
- Created Lambda function `search-movies-python`
- Implemented OpenSearch query logic using:
  - `boto3`
  - `requests`
  - `requests-aws4auth`
- Packaged dependencies into a zip file and uploaded to Lambda
- Verified Lambda test query success with `q=star`

### OpenSearch Authorization
Completed:
- Diagnosed 403 security exception
- Mapped Lambda execution role to OpenSearch `all_access`
- Re-tested Lambda successfully after permission fix

### API Gateway
Completed:
- Added `GET /search`
- Connected API Gateway to `search-movies-python`
- Verified browser request:
  - `/prod/search?q=star`

### React Frontend
Completed:
- Created React frontend under:
  - `frontend/movie-search-react/`
- Built a minimum working search page
- Connected frontend to the search API
- Verified successful searches such as:
  - `star`
  - `iron man`

---

## Important Debugging Notes

### Lambda Dependency Issue
Error:
- `No module named 'requests'`

Fix:
- Installed dependencies locally
- Packaged them with `lambda_function.py`
- Uploaded the zip file to Lambda

### OpenSearch Authorization Issue
Error:
- `403 security_exception`
- `no permissions for [indices:data/read/search]`

Fix:
- Opened OpenSearch Dashboards security settings
- Mapped Lambda backend role to `all_access`

### API Gateway Query Parameter Issue
Problem:
- Browser request reached Lambda, but `queryStringParameters` was empty

Fix:
- Verified API Gateway integration setup
- Re-tested after configuration/deployment update

---

## Screenshot Checklist

### Search Movies
- OpenSearch create domain review
- OpenSearch domain created
- OpenSearch Dashboards opened
- OpenSearch match query success
- Search Lambda created
- Search Lambda CloudWatch initial test
- OpenSearch role mapping after fix
- Search API CloudWatch success
- React search initial page
- React search success page

---

## Current Project State

Completed:
- Hello World API minimum version
- Num2Words API minimum version
- Search Movies backend minimum version
- Search Movies frontend minimum version

In progress:
- DynamoDB history for Num2Words
- Project documentation cleanup
- Resume bullet point packaging
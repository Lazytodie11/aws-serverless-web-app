
---

# Project Notes

## 1. Project Overview

Project name:
- AWS Serverless Web App

Project type:
- AWS-based serverless web application portfolio project

Main modules:
1. Num2Words API + DynamoDB history
2. Movie Search API + OpenSearch

Development style:
- Follow course recordings
- Mainly use AWS Console
- Build incrementally from Homework 1 to Homework 4
- Keep project reusable for GitHub and resume

---

## 2. Homework Mapping

### Homework 1
Topic:
- AWS Serverless Hello World

Project role:
- Serverless foundation
- API Gateway + Lambda basic connection

Status:
- Not started

---

### Homework 2
Topic:
- GET API: integer to English words

Project role:
- Num2Words API core logic

Status:
- Not started

---

### Homework 3
Topic:
- DynamoDB hands-on
- Schema design
- Save num2words input/output to DynamoDB
- Button alert
- React + JSX frontend

Project role:
- Persistence layer for Num2Words
- Frontend UI for Num2Words

Status:
- Not started

---

### Homework 4
Topic:
- HTML → API Gateway → Lambda → OpenSearch
- Movie search
- movies index
- bulk import
- search query
- CORS
- AWS4Auth

Project role:
- Movie Search module

Status:
- Not started

---

## 3. AWS Resource Inventory

### Lambda
Planned functions:
- hello
- num2words
- search
- history (optional)

Current status:
- None created yet

---

### API Gateway
Planned routes:
- GET /hello
- GET /num2words?n=...
- GET /search?q=...
- GET /history (optional)

Current status:
- Not started

---

### DynamoDB
Planned usage:
- Store num2words request history

Current status:
- Not started

---

### OpenSearch
Planned usage:
- Store/search movie data

Known details from Homework 4:
- region: us-west-2
- index: movies
- query: multi_match / match
- GET / OPTIONS / CORS needed
- cost-sensitive resource

Current status:
- Not started

---

### CloudWatch
Planned usage:
- Lambda logs
- API debugging
- evidence collection

Current status:
- Not started

---

### IAM
Planned usage:
- Lambda access to DynamoDB
- Lambda access to OpenSearch
- OpenSearch role mapping

Current status:
- Not started

---

## 4. Repo / Local Structure

Planned structure:

```text
aws-serverless-web-app/
  README.md
  docs/
    notes.md
    screenshots/
  backend/
  frontend/
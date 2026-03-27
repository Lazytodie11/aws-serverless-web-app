import json
import boto3
import requests
from requests_aws4auth import AWS4Auth

region = "us-east-2"
host = "search-movies-7hg2hg6q4p6yy274tyfkgk5tqm.us-east-2.es.amazonaws.com"
index = "movies"
url = f"https://{host}/{index}/_search"

service = "es"
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    region,
    service,
    session_token=credentials.token
)

def lambda_handler(event, context):
    print("Received event:", json.dumps(event))

    query_params = event.get("queryStringParameters") or {}
    q = query_params.get("q")

    if q is None or q.strip() == "":
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Missing required query parameter: q"
            })
        }

    search_body = {
        "query": {
            "multi_match": {
                "query": q,
                "fields": ["title", "plot"]
            }
        },
        "size": 5
    }

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.get(
            url,
            auth=awsauth,
            headers=headers,
            data=json.dumps(search_body)
        )

        print("OpenSearch status code:", response.status_code)
        print("OpenSearch response:", response.text)

        if response.status_code != 200:
            return {
                "statusCode": response.status_code,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "error": "OpenSearch query failed",
                    "details": response.text
                })
            }

        data = response.json()
        hits = data.get("hits", {}).get("hits", [])

        results = []
        for hit in hits:
            source = hit.get("_source", {})
            results.append({
                "id": source.get("id"),
                "title": source.get("title"),
                "year": source.get("year"),
                "rating": source.get("rating"),
                "genres": source.get("genres"),
                "plot": source.get("plot"),
                "directors": source.get("directors"),
                "actors": source.get("actors"),
                "image_url": source.get("image_url"),
                "score": hit.get("_score")
            })

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "query": q,
                "count": len(results),
                "results": results
            })
        }

    except Exception as e:
        print("Lambda exception:", str(e))
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Internal server error",
                "details": str(e)
            })
        }
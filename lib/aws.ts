// lib/aws.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = "ap-southeast-2"; // ✅ your AWS region

const ddbClient = new DynamoDBClient({ region: REGION });

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

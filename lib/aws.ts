// lib/aws.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

export const dynamoDBClient = new DynamoDBClient({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

#!/bin/bash

API_URL="http://localhost:8080"

echo ""
echo "🔹 Test GET /reports"
curl -s $API_URL/reports | jq
echo ""


echo ""
echo "🔹 Test POST /reports (JSON complet)"
curl -s -X POST $API_URL/reports \
  -H "Content-Type: application/json" \
  -d '{
    "chantierId": 2,
    "agentId": "1",
    "timestamp": "2025-09-15T12:00:00Z",
    "latitude": 14.71,
    "longitude": -17.48,
    "imageUrl": "https://via.placeholder.com/400.png"
  }' | jq
echo ""


echo ""
echo "🔹 Test POST /reports (sans agentId ni timestamp)"
curl -s -X POST $API_URL/reports \
  -H "Content-Type: application/json" \
  -d '{
    "chantierId": 2,
    "latitude": 14.72,
    "longitude": -17.49,
    "imageUrl": "https://via.placeholder.com/450.png"
  }' | jq
echo ""


echo ""
echo "🔹 Test POST /reports (form-data avec fichier upload)"
curl -s -X POST $API_URL/reports \
  -F "chantierId=2" \
  -F "latitude=14.73" \
  -F "longitude=-17.50" \
  -F "file=@/etc/hosts" | jq
echo ""


echo "✅ Tests des rapports terminés."

#!/bin/bash
API_URL="http://localhost:8080"

echo "🔹 Test /ping"
curl -s $API_URL/ping | jq .
echo -e "\n"

echo "🔹 Test /dashboard-stats"
curl -s $API_URL/dashboard-stats | jq .
echo -e "\n"

echo "🔹 Test GET /features"
curl -s $API_URL/features | jq .
echo -e "\n"

echo "🔹 Test POST /features"
curl -s -X POST $API_URL/features \
  -H "Content-Type: application/json" \
  -d '{"title":"Nouvelle feature","description":"Description de la feature"}' | jq .
echo -e "\n"

echo "🔹 Test GET /testimonials"
curl -s $API_URL/testimonials | jq .
echo -e "\n"

echo "🔹 Test POST /testimonials"
curl -s -X POST $API_URL/testimonials \
  -H "Content-Type: application/json" \
  -d '{"name":"Utilisateur Test","message":"Super appli !"}' | jq .
echo -e "\n"

echo "🔹 Test GET /reports"
curl -s $API_URL/reports | jq .
echo -e "\n"

echo "🔹 Test POST /reports (JSON sans fichier)"
curl -s -X POST $API_URL/reports \
  -H "Content-Type: application/json" \
  -d '{"title":"Rapport test","content":"Contenu du rapport"}' | jq .
echo -e "\n"

echo "🔹 Test POST /reports (avec upload fichier)"
curl -s -X POST $API_URL/reports \
  -F "title=Rapport avec fichier" \
  -F "content=Contenu du rapport avec fichier" \
  -F "file=@test.txt" | jq .
echo -e "\n"

echo "🔹 Test GET /admin/messages"
curl -s $API_URL/admin/messages | jq .
echo -e "\n"

echo "🔹 Test POST /contact"
curl -s -X POST $API_URL/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Bonjour, test message"}' | jq .
echo -e "\n"


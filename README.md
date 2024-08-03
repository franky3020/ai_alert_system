# ai_alert_system
node: 20.16.0

pnpm i

rm -rf ./dist
pnpm run build
cp ./src/.env ./dist/
node ./dist/index.js



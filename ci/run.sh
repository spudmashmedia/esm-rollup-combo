#!/bin/sh

if [ ! -d "node_modules" ]
then
    echo ""
    echo "[ GET PRODUCTION MODULES (will only happen the first time - promise! 🤞)]..."
    echo ""
    npm install --production
fi

echo ""
echo "[ START APP ]..."
echo ""
node ./app/app.bundle.js
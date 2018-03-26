# init
```
npm install
npm install -g hubot hubot-slack yo generator-hubot

node_modules/typescript/bin/tsc resource/*.ts --outDir bot/scripts/
```

# data
```
touch bot/data/birthday.json
```
```json
[{
  "name": "nbs-bot",
  "date": "0301"
}]
```

# exec
```
mkdir bot
cd bot
yo hubot --adapter slack

export HUBOT_SLACK_TOKEN={TOKEN}
./bin/hubot --adapter slack
```
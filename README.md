```
npm install
npm install -g hubot hubot-slack yo generator-hubot

mkdir bot
cd bot
yo hubot --adapter slack

export HUBOT_SLACK_TOKEN={TOKEN}
./bin/hubot --adapter slack
```
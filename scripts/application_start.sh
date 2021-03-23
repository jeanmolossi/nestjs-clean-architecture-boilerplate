echo "Start aplication..."
pm2 stop all
pm2 kill
cd /home/ubuntu/my-app1/app
sudo rm ./.env.development
sudo npm run build
sudo npm run typeorm migration:run
pm2 start npm --name "main" -- start
echo "Start finished..."
echo "After install..."
mkdir -p /home/ubuntu/my-app1
sudo chown -R "ubuntu:ubuntu" /home/ubuntu/my-app1 
cd /home/ubuntu/my-app1/app
sudo npm install
echo "After install finished"
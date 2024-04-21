# Acore Mini Shop
This app was built for Azeroth Core and allows you to send items via in game mail to characters.

## Requirements
Docker and docker-compose.
SOAP needs to be enabled in your Azeroth Core server. You can enable it by adding the following to your worldserver.conf file.
```ini
SOAP.Enabled = 1
SOAP.Port = 7878
SOAP.IP = Your IP Address **Note** If you are running in docker, this should be 0.0.0.0
```
A character with GM level 3 or higher is required to send items to other characters.

## Installation
- Clone the repository
- Open docker-compose.yml and change the environment variables to the ones for your server.
```docker
    - SOAP_IP=127.0.0.1 (replace with IP of the server)
    - SOAP_PORT=7878 (replace with SOAP port of the server)
    - SOAP_USER=admin (replace with character with GM level 3 or higher)
    - SOAP_PASSWORD=password (replace with character password)
```
- run `docker-compose up -d` to start the server
- Open http://localhost:3032

## Local or Remote Database
- If your database is remote, use the public IP address of the server.
- If your database is local and not in a docker container, use the local IP address of the server.
- If your database is local and in a docker container:
    - Use the container name of the database container and uncomment the networks line(s) in the docker-compose.yml file.
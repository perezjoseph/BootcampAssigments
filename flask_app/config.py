from dotenv import load_dotenv
import os
import redis

load_dotenv()
db_username = os.getenv('DB_USERNAME', 'postgres')  
db_password = os.getenv('DB_PASSWORD', 'halorenacido') 
db_hostname = os.getenv('DB_HOSTNAME', 'bootcamp.cyz5iexfko6q.us-east-1.rds.amazonaws.com')
db_name= 'parrots'
class ApplicationConfig:
    SECRET_KEY = '1096db65910b48cba385a721eba22c09'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = f'postgresql://{db_username}:{db_password}@{db_hostname}/{db_name}' 
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
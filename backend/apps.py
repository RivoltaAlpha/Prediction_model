from django.apps import AppConfig
import os
import joblib
import pickle
from django.apps import AppConfig
from django.conf import settings

class BackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

# class ApiConfig(AppConfig):
#     name = 'api'
#     MODEL_FILE = os.path.join(settings.MODELS, "model.pkl")
#     model = joblib.load(MODEL_FILE)
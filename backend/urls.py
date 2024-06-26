from django.urls import path
from .views import PredictCreditScore

urlpatterns = [
    # path('', index_page, name='index_page'),
    path('predict/', PredictCreditScore.as_view(), name='predict_credit_score'),
]
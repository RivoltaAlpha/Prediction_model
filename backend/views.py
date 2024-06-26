import os
import numpy as np
import logging
import tensorflow as tf
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

# Assuming BASE_DIR is defined somewhere in your settings or globally
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Set up logging
logger = logging.getLogger(__name__)

class PredictCreditScore(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)

            # Extract and map categorical features
            try:
                credit_mix_mapping = {'Yes': 1, 'No': 2, 'NM': 3}
                payment_of_min_amount_mapping = {'_': 1, 'Good': 2, 'Standard': 3, 'Bad': 4}
                payment_behaviour_mapping = {
                    'Low_spent_Small_value_payments': 1,
                    'High_spent_Medium_value_payments': 2,
                    'Low_spent_Medium_value_payments': 3,
                    'High_spent_Large_value_payments': 4,
                    'High_spent_Small_value_payments': 5,
                    'Low_spent_Large_value_payments': 6,
                    'Other': 7
                }

                input_features = [
                    data['age'],
                    data['annual_income'],
                    data['monthly_inhand_salary'],
                    data['interest_rate'],
                    data['num_of_loan'],
                    data['credit_utilization_ratio'],
                    data['total_emi_per_month'],
                    data['changed_credit_limit'],
                    data['num_credit_inquiries'],
                    data['outstanding_debt'],
                    data['delay_from_due_date'],
                    credit_mix_mapping[data['credit_mix']],
                    payment_of_min_amount_mapping[data['payment_of_min_amount']],
                    payment_behaviour_mapping[data['payment_behaviour']]
                ]
            except KeyError as e:
                logger.error(f"Missing or invalid field in request data: {e}")
                return Response({"error": f"Missing or invalid field: {e}"}, status=status.HTTP_400_BAD_REQUEST)


            # Load the model
            model_path = os.path.join(BASE_DIR, 'ml', 'model.h5')
            if not os.path.exists(model_path):
                logger.error("Model file not found")
                return Response({"error": "Model file not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            try:
                model = tf.keras.models.load_model(model_path)
            except Exception as e:
                logger.error(f"Error loading model: {e}", exc_info=True)
                return Response({"error": "Error loading model. Please check the model file."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Ensure the model has a predict method
            if not hasattr(model, 'predict'):
                logger.error("Loaded object is not a model with a predict method")
                return Response({"error": "Loaded object is not a model with a predict method"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

           # Preprocess the input data as needed
            input_array = np.array([input_features])
            input_array = input_array.reshape((input_array.shape[0], input_array.shape[1], 1))  # Reshape for LSTM input
            
            # Make a prediction
            prediction = model.predict(input_array)
            predicted_class = np.argmax(prediction[0])  # Get the predicted class index
        
            return Response({"prediction": int(predicted_class)})
        except Exception as e:
            logger.error(f"Error during prediction: {e}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

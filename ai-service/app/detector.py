import joblib
from app.feature_engineering import encode_request

model = joblib.load("app/model.pkl")


def detect_anomaly(data):

    features = encode_request(data)

    prediction = int(model.predict(features)[0])

    anomaly = prediction == -1

    return anomaly
import joblib
import pandas as pd

from sklearn.ensemble import IsolationForest

from app.feature_engineering import encode_dataframe


def train():

    df = pd.read_csv("data/synthetic_logs.csv")

    X = encode_dataframe(df)

    model = IsolationForest(
        contamination=0.05,
        random_state=42,
        n_estimators=200
    )

    model.fit(X)

    joblib.dump(model, "app/model.pkl")

    print("Model trained successfully.")


if __name__ == "__main__":
    train()
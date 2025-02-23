from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
analyzer = SentimentIntensityAnalyzer()

@app.route('/analyze-sentiment', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text or not str(text):
        return jsonify({"error": "need a sutaible text"}), 400

    sentiment_score = analyzer.polarity_scores(text)['compound']
    if sentiment_score >= 0.05:
            sentiment = "positive"
    elif sentiment_score <= -0.05:
            sentiment = "negative"
    else:
        sentiment = "neutral"
    return jsonify({"sentiment": sentiment})

if __name__ == '__main__':
    app.run(debug=True)

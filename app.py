from flask import Flask, render_template, request, jsonify, redirect, url_for
from forex_python.converter import CurrencyRates

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('currencyconv2.html')


@app.route('/aboutus')
def about_us():
    return render_template('aboutus3.html')

@app.route('/contact')
def contact_us():
    return render_template('bc.html')

@app.route('/feedback')
def feedback():
    return render_template('g.html')

@app.route('/rateus')
def rate_us():
    return render_template('rateus.html')

@app.route('/shopping')
def shopping():
    return render_template('cart.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')
    
@app.route('/pay')
def pay():
    return render_template('payment.html')

@app.route('/ccard')
def creditcard():
    return render_template('credit-card-form.html')

@app.route('/dcard')
def debitcard():
    return render_template('debit-card-form.html')

@app.route('/netb')
def netbank():
    return render_template('net-banking-form.html')

@app.route('/upi')
def upipay():
    return render_template('upi-form.html')

@app.route('/convert', methods=['POST'])
def convert_currency():
    try:
        amount = float(request.form['amount'])
        from_currency = request.form['from_currency']
        to_currency = request.form['to_currency']

        currency_rates = CurrencyRates()
        exchange_rate = currency_rates.get_rate(from_currency, to_currency)
        converted_amount = amount * exchange_rate

        return jsonify({'success': True, 'converted_amount': converted_amount})
    
    except Exception as e:
        return jsonify({'success': False, 'error_message': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)



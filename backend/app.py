from flask import Flask, send_from_directory, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import pathlib
import mysql.connector
from mysql.connector import Error
import requests
import json
from datetime import datetime , timezone , timedelta

from utils import query_executer as qe

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)

# Enable CORS for all routes
CORS(app)

frontend_path = "../ui/dist"

def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='py_app',
            user='root',
            password=''
        )
        if connection.is_connected():
            print("Connected to MySQL database")
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

@app.route('/')
def serve_react_app():
    return send_from_directory(frontend_path, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    if (pathlib.Path(frontend_path) / path).exists():
        return send_from_directory(frontend_path, path)
    else:
        return send_from_directory(frontend_path, 'index.html')

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    print(username , password)

    connection = create_connection()
    if connection:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT employee.emp_code,employee.full_name,employee.email,employee.clinic_uid,master_clinic.clinic_code FROM employee INNER JOIN master_clinic ON employee.clinic_uid = master_clinic.uid WHERE mobile = %s AND BINARY password = %s", (username, password))
        user = cursor.fetchone()
        cursor.close()
        connection.close()
        
        if user:
            access_token = create_access_token(identity=json.dumps(user))
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Invalid credentials"}), 401
    else:
        return jsonify({"msg": "Database connection failed"}), 500

@app.route('/user/get_details', methods=["POST"])
@jwt_required()
def get_user_details():
    user = get_jwt_identity()
    return user , 200

@app.route("/api/get_chart_data",methods=["POST"])
@jwt_required()
def get_chart_data():
    clinic_id = request.get_json().get("clinic_id")
    api_url = "https://ncerp.in/api/swapi/dsr_list.php?from_date=01-12-2024&to_date=31-12-2024&clinic_uid=" + clinic_id
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        return jsonify(data), 200
    else:
        return jsonify({"msg": "Failed to fetch data from external API"}), 500

@app.route("/api/get_clinics" , methods=["POST"])
@jwt_required()
def get_clinics():
    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT uid , clinic_code FROM MASTER_CLINIC")
    res = cursor.fetchall()
    cursor.close()
    return jsonify(res) , 200

def fetch_sum_data(from_date:str , to_date:str,clinic_id:int):
    connection = create_connection()
    ret = []
    if connection:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM `master_misc_hims` WHERE `tag` = 100")
        data = cursor.fetchall()

        for d in data:
            cursor.execute("SELECT `voucher_date`, sum(net_amount) as sum_net FROM `bill_receipt` `r` WHERE r.billmast_uid in (select distinct(billmast_uid) from billing b where service_uid=%s and b.bill_date between %s AND %s AND b.cancel_flag=0 AND b.clinic_uid=%s)",(d["uid"] , from_date , to_date , clinic_id))
            sum_data = cursor.fetchall()
            if sum_data[0]["sum_net"] != None:
                ret.append({"service_id":d["uid"], "service_name":d["misc_name"] , "sum_net":sum_data[0]["sum_net"]})
            # print(ret)
        cursor.close()
        connection.close()
        # print(ret)
    return ret

@app.route("/api/get_chart_d" , methods=["POST"])
@jwt_required()
def get_data():
    req = request.get_json()
    return jsonify(fetch_sum_data(req.get("from_date") ,req.get("to_date"), req.get("clinic_id"))) , 200

def get_billing_breakdown(from_date:str , to_date:str , service_id:int , clinic_id:int ):
    query = "SELECT patient.full_name, billing.patient_uid, billing.service_amount, billing.discount_amount, billing_master.invoice_no, billing_master.bill_prefix FROM `billing` INNER JOIN patient ON billing.patient_uid = patient.uid INNER JOIN billing_master ON billing.billmast_uid = billing_master.uid WHERE billing.service_uid = %s and billing.bill_date BETWEEN %s AND %s AND billing.cancel_flag = 0 AND billing.clinic_uid = %s"
    connection = create_connection()
    ret = []
    if connection:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query , (service_id , from_date , to_date , clinic_id))
        ret = cursor.fetchall()
        cursor.close()
        connection.close()
    return ret

@app.route("/api/get_bill_breakdown",methods=["POST"])
@jwt_required()
def get_breakdown():
    req = request.get_json()
    return jsonify(get_billing_breakdown(req.get("from_date"),req.get("to_date"),req.get("service_id"),req.get("clinic_id")))

@app.route("/api/get_revenue_by_employee",methods=["POST"])
@jwt_required()
def get_func():
    connection = create_connection()
    ret = []
    if connection:
        cursor = connection.cursor(dictionary=True)
        req = request.get_json()
        cursor.execute(qe.QUERY_GET_REVENUE_BY_EMPLOYEE, (req.get("from_date"), req.get("to_date"), req.get("clinic_id")))
        ret = cursor.fetchall()
        cursor.close()
        connection.close()
    return jsonify(ret), 200

@app.route("/api/get_revenue_by_payment_mode",methods=["POST"])
@jwt_required()
def get_func2():
    connection = create_connection()
    ret = []
    if connection:
        cursor = connection.cursor(dictionary=True)
        req = request.get_json()
        cursor.execute(qe.QUERY_GET_REVENUE_BY_PAYMENT_MODE, (req.get("from_date"), req.get("to_date"), req.get("clinic_id")))
        ret = cursor.fetchall()
        cursor.close()
        connection.close()
    return jsonify(ret) , 200

@app.route("/api/get_bill_breakdown_by_payment_mode",methods=["POST"])
@jwt_required()
def get_func3():
    connection = create_connection()
    ret = []
    if connection:
        cursor = connection.cursor(dictionary=True)
        req = request.get_json()
        cursor.execute(qe.QUERY_GET_BILL_BREAKDOWN_BY_PAYMENT_MODE, (req.get("payment_mode"), req.get("from_date"), req.get("to_date"), req.get("clinic_id")))
        ret = cursor.fetchall()
        cursor.close()
        connection.close()
        for row in ret:
            if 'entry_date_time' in row and isinstance(row['entry_date_time'], datetime):
                row['entry_date_time'] = row['entry_date_time'].strftime('%Y-%m-%d %H:%M:%S')
    return jsonify(ret) , 200

@app.route("/api/get_revenue_by_doctor",methods=["POST"])
@jwt_required()
def get_func4():
    connection = create_connection()
    ret = []
    if connection:
        cursor = connection.cursor(dictionary=True)
        req = request.get_json()
        cursor.execute(qe.QUERY_GET_REVENUE_BY_DOCTOR, (req.get("from_date"), req.get("to_date"), req.get("clinic_id")))
        ret = cursor.fetchall()
        cursor.close()
        connection.close()
    return jsonify(ret) , 200

@app.route("/api/get_total_patient_by_type",methods=["POST"])
@jwt_required()
def get_func5():
    connection = create_connection()
    ret = []
    if connection:
        cursor = connection.cursor(dictionary=True)
        req = request.get_json()
        cursor.execute(qe.QUERY_GET_TOTAL_PATIENT_ADMISSION_BY_TYPE, (req.get("from_date"), req.get("to_date"), req.get("clinic_id")))
        ret = cursor.fetchall()
        cursor.close()
        connection.close()
    return jsonify(ret) , 200
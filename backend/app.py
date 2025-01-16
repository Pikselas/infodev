from flask import Flask, send_from_directory, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import pathlib
import mysql.connector
from mysql.connector import Error
import requests

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
        cursor.execute("SELECT * FROM users WHERE username = %s AND BINARY password = %s", (username, password))
        user = cursor.fetchone()
        cursor.close()
        connection.close()
        
        if user:
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"msg": "Invalid credentials"}), 401
    else:
        return jsonify({"msg": "Database connection failed"}), 500


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
    cursor.execute("SELECT uid , clinic_name FROM MASTER_CLINIC")
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
    return jsonify(fetch_sum_data("2024-12-01" , "2024-12-31", request.get_json().get("clinic_id"))) , 200

# print(get_data("2024-12-01" , "2024-12-31" , 101))

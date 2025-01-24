# #################### TOTAL REVENUE #####################
QUERY_GET_REVENUE_BY_EMPLOYEE = """
    SELECT 
        employee.full_name,
        bill_receipt.entry_by as id,
        SUM(bill_receipt.net_amount) as revenue 
    FROM 
        bill_receipt 
    INNER JOIN 
        employee 
        ON employee.uid = bill_receipt.entry_by 
    WHERE 
        bill_receipt.voucher_date BETWEEN %s AND %s 
    AND 
        bill_receipt.clinic_uid = %s 
    GROUP BY
        bill_receipt.entry_by
"""

QUERY_GET_REVENUE_BY_DOCTOR = """
    SELECT  
        employee.full_name,
        billing.doctor_id as id,
        SUM(billing.service_amount) as revenue 
    FROM 
        billing 
    INNER JOIN 
        employee 
        ON employee.uid = billing.doctor_id 
    WHERE 
        billing.bill_date BETWEEN %s AND %s 
    AND 
        billing.clinic_uid = %s 
    GROUP BY 
        billing.doctor_id
"""

QUERY_GET_REVENUE_BY_PAYMENT_MODE = """
    SELECT 
        bill_receipt.payment_mode as uid, 
        master_misc_hims.misc_name as mode_name, 
        SUM(bill_receipt.net_amount) as revenue
    FROM 
        bill_receipt 
    INNER JOIN 
        master_misc_hims 
        ON master_misc_hims.uid = bill_receipt.payment_mode 
    WHERE 
        bill_receipt.voucher_date BETWEEN %s AND %s 
    AND 
        bill_receipt.clinic_uid = %s 
    GROUP BY 
        bill_receipt.payment_mode
"""

QUERY_GET_BILL_BREAKDOWN_BY_PAYMENT_MODE = """
    SELECT 
        receipt_prefix, 
        receipt_no, 
        net_amount,
        entry_date_time
    FROM 
        bill_receipt 
    WHERE 
        payment_mode = %s
    AND 
        voucher_date BETWEEN %s AND %s
    AND
        clinic_uid = %s
"""

# ######################## PATIENT REGISTRATION ####################

QUERY_GET_TOTAL_PATIENT_ADMISSION_BY_TYPE = """
    SELECT 
        COUNT(appointment_register.patient_uid) as total_patient, 
        CASE
            WHEN appointment_register.app_type = 1 THEN 'New Patients'
            WHEN appointment_register.app_type = 2 THEN 'Old Patients'
        END AS patient_status 
    FROM 
        appointment_register 
    WHERE 
        DATE(appointment_register.entry_date_time) BETWEEN %s AND %s 
    AND 
        appointment_register.clinic_id = %s 
    GROUP BY 
        appointment_register.app_type
"""
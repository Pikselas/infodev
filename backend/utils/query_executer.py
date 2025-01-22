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
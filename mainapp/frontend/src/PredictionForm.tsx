import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        age: 0,
        annual_income: 0,
        monthly_inhand_salary: 0,
        interest_rate: 0,
        num_of_loan: 0,
        credit_utilization_ratio: 0,
        total_emi_per_month: 0,
        changed_credit_limit: 0,
        num_credit_inquiries: 0,
        outstanding_debt: 0,
        delay_from_due_date: 0,
        credit_mix: 'Yes', // Default values
        payment_of_min_amount: '_',
        payment_behaviour: 'Low_spent_Small_value_payments'
    });

    const [prediction, setPrediction] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: ['age', 'annual_income', 'monthly_inhand_salary', 'interest_rate', 'num_of_loan', 'credit_utilization_ratio', 'total_emi_per_month', 'changed_credit_limit', 'num_credit_inquiries', 'outstanding_debt', 'delay_from_due_date'].includes(name) ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/predict/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setPrediction(response.data.prediction);
            setError(null);
        } catch (error) {
            setError('There was an error processing your request');
            setPrediction(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
            <input type="number" name="annual_income" value={formData.annual_income} onChange={handleChange} />
            <input type="number" name="monthly_inhand_salary" value={formData.monthly_inhand_salary} onChange={handleChange} />
            <input type="number" name="interest_rate" value={formData.interest_rate} onChange={handleChange} />
            <input type="number" name="num_of_loan" value={formData.num_of_loan} onChange={handleChange} />
            <input type="number" name="credit_utilization_ratio" value={formData.credit_utilization_ratio} onChange={handleChange} />
            <input type="number" name="total_emi_per_month" value={formData.total_emi_per_month} onChange={handleChange} />
            <input type="number" name="changed_credit_limit" value={formData.changed_credit_limit} onChange={handleChange} />
            <input type="number" name="num_credit_inquiries" value={formData.num_credit_inquiries} onChange={handleChange} />
            <input type="number" name="outstanding_debt" value={formData.outstanding_debt} onChange={handleChange} />
            <input type="number" name="delay_from_due_date" value={formData.delay_from_due_date} onChange={handleChange} />
            <select name="credit_mix" value={formData.credit_mix} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NM">NM</option>
            </select>
            <select name="payment_of_min_amount" value={formData.payment_of_min_amount} onChange={handleChange}>
                <option value="_">_</option>
                <option value="Good">Good</option>
                <option value="Standard">Standard</option>
                <option value="Bad">Bad</option>
            </select>
            <select name="payment_behaviour" value={formData.payment_behaviour} onChange={handleChange}>
                <option value="Low_spent_Small_value_payments">Low spent Small value payments</option>
                <option value="High_spent_Medium_value_payments">High spent Medium value payments</option>
                <option value="Low_spent_Medium_value_payments">Low spent Medium value payments</option>
                <option value="High_spent_Large_value_payments">High spent Large value payments</option>
                <option value="High_spent_Small_value_payments">High spent Small value payments</option>
                <option value="Low_spent_Large_value_payments">Low spent Large value payments</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit">Predict</button>
            {prediction && <p>Prediction: {prediction}</p>}
            {error && <p>{error}</p>}
        </form>
    );
};

export default PredictionForm;





// return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Age:
//                 <input name="age" type="number" value={formData.age} onChange={handleChange} />
//             </label>
//             <label>
//                 Annual Income:
//                 <input name="annual_income" type="number" value={formData.annual_income} onChange={handleChange} />
//             </label>
//             <label>
//                 Monthly Inhand Salary:
//                 <input name="monthly_inhand_salary" type="number" value={formData.monthly_inhand_salary} onChange={handleChange} />
//             </label>
//             <label>
//                 Interest Rate:
//                 <input name="interest_rate" type="number" value={formData.interest_rate} onChange={handleChange} />
//             </label>
//             <label>
//                 Number of Loans:
//                 <input name="num_of_loan" type="number" value={formData.num_of_loan} onChange={handleChange} />
//             </label>
//             <label>
//                 Credit Utilization Ratio:
//                 <input name="credit_utilization_ratio" type="number" value={formData.credit_utilization_ratio} onChange={handleChange} />
//             </label>
//             <label>
//                 Total EMI per Month:
//                 <input name="total_emi_per_month" type="number" value={formData.total_emi_per_month} onChange={handleChange} />
//             </label>
//             <label>
//                 Changed Credit Limit:
//                 <input name="changed_credit_limit" type="number" value={formData.changed_credit_limit} onChange={handleChange} />
//             </label>
//             <label>
//                 Number of Credit Inquiries:
//                 <input name="num_credit_inquiries" type="number" value={formData.num_credit_inquiries} onChange={handleChange} />
//             </label>
//             <label>
//                 Outstanding Debt:
//                 <input name="outstanding_debt" type="number" value={formData.outstanding_debt} onChange={handleChange} />
//             </label>
//             <label>
//                 Delay from Due Date:
//                 <input name="delay_from_due_date" type="number" value={formData.delay_from_due_date} onChange={handleChange} />
//             </label>
//             <label>
//                 Credit Mix:
//                 <select name="credit_mix" value={formData.credit_mix} onChange={handleChange}>
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                     <option value="NM">NM</option>
//                 </select>
//             </label>
//             <label>
//                 Payment of Minimum Amount:
//                 <select name="payment_of_min_amount" value={formData.payment_of_min_amount} onChange={handleChange}>
//                     <option value="">Select</option>
//                     <option value="Good">Good</option>
//                     <option value="Standard">Standard</option>
//                     <option value="Bad">Bad</option>
//                 </select>
//             </label>
//             <label>
//                 Payment Behaviour:
//                 <select name="payment_behaviour" value={formData.payment_behaviour} onChange={handleChange}>
//                     <option value="">Select</option>
//                     <option value="Low_spent_Small_value_payments">Low spent Small value payments</option>
//                     <option value="High_spent_Medium_value_payments">High spent Medium value payments</option>
//                     <option value="Low_spent_Medium_value_payments">Low spent Medium value payments</option>
//                     <option value="High_spent_Large_value_payments">High spent Large value payments</option>
//                     <option value="High_spent_Small_value_payments">High spent Small value payments</option>
//                     <option value="Low_spent_Large_value_payments">Low spent Large value payments</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </label>
//             <button type="submit">Predict</button>
//         </form>
//         {prediction && <div>Prediction: {prediction}</div>}
//         {error && <div>Error: {error}</div>}
//     </div>
// );
// };

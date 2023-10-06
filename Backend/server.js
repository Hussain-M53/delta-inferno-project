require('dotenv/config');
const express = require('express');
const cors = require('cors');
const Excel = require('exceljs');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }))

server.use(cors({
    origin: ['https://www.expertassignmentnation.com'],
    credentials: true,
}))

server.use(express.json())

server.get('/', (req, res) => {
    res.json({
        status_code: 200,
        message: 'Greetings from Expert Assignment Nation Server'
    })
})

server.use("/create-payment-session", async (req, res) => {
    const { Order_Details } = req.body;

    const line_items = {
        currency: 'usd',
        product_data: 'Order_Details',
        unit_amount: Order_Details.fee * 100,
        quantity: 1,
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_type: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: 'localhost:3000/Orders',
        cancel_url: 'localhost:3000/Orders/error',
    });

    res.redirect(303, session.url);
});

server.use("/get-quote", async (req, res, next) => {
    try {
        let workbook = new Excel.Workbook();
        const filePath = path.join(__dirname, 'Pricing.xlsx');
        await workbook.xlsx.readFile(filePath);
        let worksheet = workbook.getWorksheet(1);
        const prompt = req.query;
        console.log(prompt)
        let price;
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                let serviceType = row.getCell(1).value;
                let paperType = row.getCell(2).value;
                let subject = row.getCell(3).value;

                if (serviceType.toString().trim() == prompt['Type of Service'].toString().trim() &&
                    paperType.toString().trim() == prompt['Type of Paper'].toString().trim() &&
                    subject.toString().trim() == prompt['Subject'].toString().trim()) {
                    let academicLevel = prompt['Academic Level'];
                    let deadline = prompt['Deadline'];
                    let columnName;
                    console.log('row found')

                    if (deadline == '15-30 days') {
                        columnName = academicLevel === 'Undergrad' ? 4 :
                            academicLevel == 'Masters' ? 5 :
                                academicLevel == 'PHD' ? 6 : null;
                    } else if (deadline == '5-7 days') {
                        columnName = academicLevel == 'Undergrad' ? 7 :
                            academicLevel == 'Masters' ? 8 :
                                academicLevel === 'PHD' ? 9 : null;
                    } else if (deadline == '1-3 days') {
                        columnName = academicLevel == 'Undergrad' ? 10 :
                            academicLevel == 'Masters' ? 11 :
                                academicLevel == 'PHD' ? 12 : null;
                    }

                    if (columnName) {
                        let cellValue = row.getCell(columnName).value;
                        if (cellValue && typeof cellValue === 'object' && 'result' in cellValue) {
                            // Handle case where cellValue is an object with a result key
                            price = cellValue.result * Number(prompt['Word Limit']);
                        } else if (cellValue != null) {
                            // Handle case where cellValue is a direct value
                            price = cellValue * Number(prompt['Word Limit']);
                        } else {
                            // Handle case where cellValue is undefined or null
                            console.log('Value is undefined or null for columnName:', columnName);
                        }
                    }

                }
            }
        });

        if (price) {
            price = parseFloat(price.toFixed(2));
            console.log(`Total price is $${price}`);
            res.json({ total_price: price });
        } else {
            console.log('No matching row found');
            res.status(404).json({ error: 'No matching row found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})


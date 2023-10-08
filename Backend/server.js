require('dotenv/config');
const express = require('express');
const cors = require('cors');
const Excel = require('exceljs');
const path = require('path');
const server = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    console.log(Order_Details)

    const { Fee, ...productData } = Order_Details;

    const line_items = [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: productData['First Name'],
                metadata: productData
            },
            unit_amount: Order_Details.Fee * 100,
        },
        quantity: 1,
    }];


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: 'https://www.expertassignmentnation.com/Signup',
        cancel_url: 'https://www.expertassignmentnation.com/Orders/new',
    });

    res.json({ sessionId: session.id });
});

server.use("/get-quote", async (req, res) => {
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
                            price = cellValue.result * Number(prompt['Word Limit']);
                        } else if (cellValue != null) {
                            price = cellValue * Number(prompt['Word Limit']);
                        } else {
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

server.use("/get-fields", async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'Pricing.xlsx');
        let workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filePath);
        let worksheet = workbook.getWorksheet(1);

        const paperOptions = {};
        const serviceOptions = {};

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                let serviceType = row.getCell(1).value && row.getCell(1).value.toString().trim();
                let paperType = row.getCell(2).value && row.getCell(2).value.toString().trim();
                let subject = row.getCell(3).value && row.getCell(3).value.toString().trim();

                if (paperType && subject) {
                    if (!paperOptions[paperType]) {
                        paperOptions[paperType] = [];
                    }
                    if (!paperOptions[paperType].includes(subject)) {
                        paperOptions[paperType].push(subject);
                    }
                }

                if (serviceType && paperType) {
                    if (!serviceOptions[serviceType]) {
                        serviceOptions[serviceType] = [];
                    }
                    if (!serviceOptions[serviceType].includes(paperType)) {
                        serviceOptions[serviceType].push(paperType);
                    }
                }
            }
        });

        res.json({
            paperOptions: paperOptions,
            serviceOptions: serviceOptions
        });

    } catch (error) {
        console.error('Error in extracting options:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})


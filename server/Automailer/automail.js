// Import necessary libraries
import cron from 'node-cron';
import ExcelJS from 'exceljs';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import jobs from '../db/Jobs.js';
import dotenv from 'dotenv';
dotenv.config();


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create transporter for sending email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});

// Function to generate Excel file and send email
async function generateExcelAndSendEmail() {
  try {
    // Fetch data from MongoDB
    const jobsData = await jobs.find().lean();

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Jobs');

    // Add data to worksheet
    worksheet.columns = [
      { header: 'Job Title', key: 'jobTitle', width: 30 },
      { header: 'Company Logo', key: 'companyLogo', width: 50 },
      { header: 'Job Location', key: 'jobLocation', width: 30 },
      { header: 'Description', key: 'description', width: 100 },
      { header: 'Date of Posting', key: 'dateOfPosting', width: 20 },
      { header: 'Deadline', key: 'deadline', width: 20 },
      { header: 'Skillsets', key: 'skillsets', width: 50 },
      { header: 'Job Type', key: 'jobType', width: 20 },
      { header: 'Duration', key: 'duration', width: 20 },
      { header: 'Salary', key: 'salary', width: 20 }
    ];


    jobsData.forEach(job => {
      worksheet.addRow({
        'Job Title': job.jobTitle,
        'Company Logo': job.companyLogo,
        'Job Location': job.jobLocation,
        'Description': job.description,
        'Date of Posting': job.dateOfPosting,
        'Deadline': job.deadline,
        'Skillsets': job.skillsets.join(', '), // Convert array to comma-separated string
        'Job Type': job.jobType,
        'Duration': job.duration,
        'Salary': job.salary
      });
    });


    // Generate Excel file
    const excelBuffer = await workbook.xlsx.writeBuffer();

    // Send email with Excel file attachment
    await transporter.sendMail({
      from: 'darshankumar7213@gmail.com',
      to: 'darshanpatel2923@gmail.com',
      subject: 'Jobs Report - April 12, 2024',
      text: 'Please find attached the jobs report for April 12, 2024.',
      attachments: [{
        filename: 'jobs_report.xlsx',
        content: excelBuffer,
      }],
    });

    console.log('Excel file sent successfully.');
  } catch (error) {
    console.error('Error generating Excel file and sending email:', error);
  }
}

// Schedule the job to run only once on April 12, 2024, at 10:30 PM
cron.schedule('15 17 * * *', generateExcelAndSendEmail, {
  timezone: 'Asia/Kolkata' // India's timezone (IST)
});

